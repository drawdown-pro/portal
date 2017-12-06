import React from 'react'
const Auth0Lock = require('auth0-lock').default

export default class AuthService {
  constructor(onAuthentication) {
    this.config = require('../config.json')

    // Configure Auth0
    this.clientId = this.config.AUTH0_CLIENT_ID
    this.domain = this.config.AUTH0_CLIENT_DOMAIN

    this.lock = new Auth0Lock(this.clientId, this.domain, {
      theme: {
        logo: 'https://www.drawdown.pro/img/logo-only-red.svg',
        primaryColor: '#bd1a41' //'#db1443'
      },
      languageDictionary: {
        title: "Drawdown.PRO"
      },
      auth: {
        params: {
          scope: 'profile email linkedin'
          // state: secret
        }
      }
    })
    // Add callback for lock `authenticated` event
    this.onAuthentication = onAuthentication;
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    // this.login = this.login.bind(this)
    // this.logout = this.logout.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    localStorage.setItem('accessToken', authResult.accessToken)
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        console.error(error)
        return
      }
      localStorage.setItem('profile', JSON.stringify(profile))
      if (this.onAuthentication) {
        this.onAuthentication(profile)
      }
    })
  }

  getLock() {
    // An instance of Lock
    return new Auth0Lock(this.clientId, this.domain, {});
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('accessToken')
  }

  getProfile(){
    return JSON.parse(localStorage.getItem('profile'))
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
  }
}