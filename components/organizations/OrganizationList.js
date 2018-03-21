import Header from '../Header'
import { createStore } from "redux"
import withRedux from "next-redux-wrapper"
import { Button, Table, TableRow, TableHeader } from 'grommet'
import client from '../Apollo';
import {
  graphql,
  ApolloProvider
} from 'react-apollo';
import gql from 'graphql-tag';
import React from "react";

import List from 'react-virtualized/List';
import AutoSizer from 'react-virtualized/AutoSizer';

const organizationsQuery = gql`
query {
  allOrganizations {
    id
    name
    description
    url
  }
}
`

class Index extends React.Component {
  render() {
    var data = this.props.data;
    if (data.loading) return this.renderLoading();
    if (data.error)   return this.renderError();

    return <AutoSizer>
    </AutoSizer>
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
    return ""
  }

  renderError() {
    return this.props.data.error;
  }
}

Index = graphql(organizationsQuery)(Index);

export default Index
