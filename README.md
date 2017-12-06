portal.drawdown.pro
=============================

UI for the authenticated portal of the website. Supports users as job seekers and/or organizational representatives. Also contains admin functions to manage workflow, etc.

initial scope
-----------------------------

1. Create a database of drawdown solutions
2. Professional registration by importing linkedin profiles and adding ability to select solutions of interest
3. Allow companies/orgs to register for any number of solutions - pending approval
4. Professionals can favorite companies/orgs and attach notes


portal pages
-----------------------------

* home
* solutions
  * search
  * submit new organization (no login required)
* member profile
* organization profile
* express interest/apply for a position


technology
-----------------------------

* next.js
* react
* [grommet](https://grommet.github.io/)
* fastify - REST API
* apollo
  * graph.cool
* auth0
* jest

develop
-----------------------------

    $ npm run dev

test
-----------------------------


deploy
-----------------------------

Deployed via now. (TBD..)


project folders
-----------------------------

* /portal
  * /components
  * /lib
  * /pages
  * /static
