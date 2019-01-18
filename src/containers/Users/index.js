import React, { Component } from 'react'
import { Container, Header, SearchBar, UsersContainer } from './styles'
import UserCard from './components/UserCard'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const QUERY_USERS = gql`
  query users ($substr: String) {
    users(substr: $substr){
      name
      email
    }
  }
`

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  handleChange = e => {
    this.setState({ searchText: e.target.value })
  }

  render() {
    return (
      <Container>
        <Header>
          <SearchBar
            classname="searchbar"
            placeholder="Search"
            onChange={this.handleChange}
          />
        </Header>
        <Query query={QUERY_USERS} variables={{ substr: this.state.searchText }}>
          {({ loading, error, data }) => (
              <div>
                <UsersContainer> { JSON.stringify(data.users) } </UsersContainer>
              </div>
          )}
        </Query>
      </Container>
    )
  }
}

export default Users
