import Header from '../components/Header'
import { createStore } from "redux"
import withRedux from "next-redux-wrapper"
import { Box, Button, Grid, Grommet } from 'grommet'
import { hpe } from 'grommet/themes';

const reducer = (state = {foo: ''}, action) => {
    switch (action.type) {
        case 'FOO':
            return {...state, foo: action.payload}
        default:
            return state
    }
};

const makeStore = (initialState, options) => {
    return createStore(reducer, initialState);
};


class Index extends React.Component {
  static getInitialProps({store, isServer, pathname, query}) {
    // component will read it from store's state when rendered
    store.dispatch({type: 'FOO', payload: 'foo'});
    // pass some custom props to component
    return {custom: 'custom'};
  }

  render() {
  return <Grommet name='portal' theme={ hpe }>
    <Grid
      rows={['small', 'medium', 'xsmall']}
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

        <div>
          <Button onClick={Header.loginClick}>Login</Button>
          <div>Prop from Redux {this.props.foo}</div>
          <div>Prop from getInitialProps {this.props.custom}</div>
          <p>Two situations here: logged in or not. Need to make a decision if it makes sense to try to make this page work for both cases. This is not intended to be the website, but a portal that is linked and similar in look/feel/design. It may make sense to drive solution information from this portal however.</p>
          <p>portal pages in mind:</p>
          <ul>
          <li>home</li>
          <li>solutions</li>
          <ul>
            <li>search</li>
            <li>submit new organization (no login required)</li>
          </ul>
          <li>member profile</li>
          <li>organization profile</li>
          <li>express interest/apply for a position</li>
          </ul>
        </div>

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

Index = withRedux(makeStore, (state) => ({foo: state.foo}))(Index);

export default Index
