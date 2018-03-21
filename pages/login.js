import Header from '../components/Header'
import Footer from '../components/Footer'
import Auth from '../lib/AuthService.js'
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: `${process.env.GRAPHQL_ENDPOINT}`
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('auth0IdToken');
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

const CONTAINER_ID = 'drawdown-lock'

class Login extends React.Component {
  componentDidMount () {
    var auth = new Auth()
    auth.show(CONTAINER_ID)
  }

  render () {
    return <div id={CONTAINER_ID} />
  }
}

export default () => (
  <ApolloProvider client={client}>
    <div>
      {{ client }}
    </div>
    <Header />
    <h2>login</h2>
    <Login />

    <Footer />
  </ApolloProvider>
)
