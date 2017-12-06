import AuthService from '../lib/AuthService'
import { Menu } from 'grommet'

class LoginStatus extends React.Component {
  // static propTypes = {
  //   url: PropTypes.object.isRequired
  // }

  static getInitialProps({store, isServer, pathname, query}) {
    return {custom: 'custom'};
  }


  constructor(props) {
    super(props)
    this.state = { loggedIn: false, userProfile: null }
  }

  componentDidMount () {
    this.auth = new AuthService((profile) => {
      this.setState({
        loggedIn: (profile != null),
        userProfile: profile
      })
    });
    this.setState({
      loggedIn: this.auth.loggedIn(),
      userProfile: this.auth.getProfile()

    })
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    this.state = { loggedIn: false, userProfile: null }
  }

  render () {
    if (this.state.userProfile) {
      let logout = this.logout.bind(this);
      return <Menu label="Hello {this.state.userProfile.given_name}"
          items={[
              {
                label: 'Logout',
                onClick: logout
              },
              {
                label: 'About',
                href: '/about',
              },
          ]}
        />;
    } else {
      let login = this.login.bind(this);
      return <Menu label="Hello"
          items={[
              {
                label: 'Login',
                onClick: login
              },
              {
                label: 'About',
                href: '/about',
              },
          ]}
        />;
    }
  }
}

export default LoginStatus
