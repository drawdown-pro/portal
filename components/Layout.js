import { Box, Grommet, Grid } from 'grommet'
import { hpe } from 'grommet/themes';
import Header from './Header'
import {
  graphql,
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

const withLayout = (Content) => {
  class LayoutWrapper extends React.PureComponent {
    render() {
      return <Grommet theme={hpe} name='portal'>
          <link rel="stylesheet" href="/static/css/style.css" />
          <Grid
            rows={['small', 'flex', 'xsmall']}
            columns={['3/4', '1/4']}
            areas={[
              { name: 'header', start: [0, 0], end: [1, 0] },
              { name: 'main', start: [0, 1], end: [0, 1] },
              { name: 'sidebar', start: [1, 1], end: [1, 1] },
              { name: 'footer', start: [0, 2], end: [1, 2] },
            ]}
            gap='none'
          >
            <Box
              align='stretch'
              justify='stretch'
              pad='medium'
              background='brand'
              gridArea='header'
            >
              <Header />
            </Box>
            <Box
              align='stretch'
              justify='start'
              pad='medium'
              background='light-1'
              gridArea='main'
            >
              <ApolloProvider client={client}>
                <Content {...this.props} />
              </ApolloProvider>
            </Box>
            <Box
              align='stretch'
              justify='center'
              pad='medium'
              background='light-2'
              gridArea='sidebar'
            >
              Sidebar
            </Box>
            <Box
              align='stretch'
              justify='center'
              pad='medium'
              background='neutral-1'
              gridArea='footer'
            >
              Footer
            </Box>
          </Grid>
        </Grommet>
    }
  }
  return LayoutWrapper;
}

export default withLayout;