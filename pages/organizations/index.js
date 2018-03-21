import { createStore, compose } from "redux"
import withRedux from "next-redux-wrapper"
import { Box, Grommet, Grid, Anchor, Paragraph, Heading, Button } from 'grommet'
import { hpe } from 'grommet/themes';
import { Home, Group, Configure } from 'grommet-icons';
import withLayout from '../../components/Layout';
import gql from 'graphql-tag';
import {
  graphql,
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from 'react-apollo';
// import List from 'react-virtualized/List';
// import AutoSizer from 'react-virtualized/AutoSizer';
import { InfiniteLoader, AutoSizer, List, WindowScroller } from 'react-virtualized';
import { ContentBox, ContentHeader, ContentDetails, ContentFooter } from '../../components/ContentBox';
import _ from "underscore";

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

const queryOptions = {
  options: (props) => ({
    variables: {
      searchTerm: props.searchTerm
    }
  })
}

const organizationsQuery = gql`
query(searchTerm: String) {
  allOrganizations(filter: {  }) {
    id
    name
    description
    url
    members: _membersMeta {
      count
    }
    implementations: _implementationsMeta {
      count
    }
  }
}
`

const itemSize = 160;

class Index extends React.Component {
  static getInitialProps({store, isServer, pathname, query}) {
    // component will read it from store's state when rendered
    store.dispatch({type: 'FOO', payload: 'foo'});
    // pass some custom props to component
    return {custom: 'custom'};
  }

  renderRow = ({index, key, style}) => {
    var org = this.props.data.allOrganizations[index];
    console.log(org);
    return <ContentBox key={key} height={itemSize}>
      <ContentHeader>
        <Heading size="small" margin="none" level={1} >{org.name}</Heading>
      </ContentHeader>
      <ContentDetails>
        <Paragraph margin="none">{org.description}</Paragraph>
        <Button className="ddp-details-button" active={true} plain={true} icon={<Group/>} label={`Members (${org.members.count})`}></Button>
        <Button className="ddp-details-button" active={true} plain={true} icon={<Configure/>} label={`Implementations (${org.implementations.count})`}></Button>
      </ContentDetails>
      <ContentFooter>
        <Anchor href={org.url} label={org.url} icon={<Home color="white"/>} primary={true}></Anchor>
      </ContentFooter>
    </ContentBox>;
  }

  render() {
    var data = this.props.data;
    if (data.loading) return this.renderLoading();
    if (data.error)   return this.renderError();

    return <WindowScroller
      scrollElement={window}>
      {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              autoHeight
              height={height}
              rowHeight={itemSize}
              rowRenderer={this.renderRow}
              rowCount={data.allOrganizations.length}
              width={width}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              overscanRowCount={2}
              scrollTop={scrollTop}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>

// rowRenderer={({ index, key, style }) => <div key={key} style={style}>...</div>}

    // return data.allOrganizations.map((o) => 
    //   <div>{JSON.stringify(o)}</div>
    // )
    // return <Table>
    //   <TableHeader labels={['Name', 'Description', 'Website']} />
    //   <tbody>
    //     { data.allOrganizations.map(org =>
    //       <TableRow>
    //         <td> {org.name} </td>
    //         <td> {org.description} </td>
    //         <td> {org.url} </td>
    //       </TableRow>
    //     )}
    //   </tbody>
    // </Table>;
  }

  renderLoading() {
    //TODO: Make this an actual spinner
    return <div>Loading...</div>;
  }

  renderError() {
    return this.props.data.error;
  }
}

// Index = withLayout(withRedux(makeStore, (state) => ({foo: state.foo}))(Index));
Index = compose(withLayout, graphql(organizationsQuery))(Index);

export default Index
