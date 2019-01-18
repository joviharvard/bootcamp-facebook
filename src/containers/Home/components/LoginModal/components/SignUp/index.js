import React, { Component } from 'react'
import { Title, LineInput, SubmitButton, SecondaryOptionText } from './styles'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const REGISTER_USER = gql`
  mutation createUser ($input: CreateUserInput!){
    createUser (input: $input) {
      user{
        name
        email
      }
    }
  }
`

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }

  onChange = (key, e) => {
    this.setState({ [key]: e.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <Title>Nice to meet you!</Title>
        <LineInput
          placeholder="Name"
          onChange={e => this.onChange('name', e)}
        />
        <LineInput
          placeholder="Email"
          onChange={e => this.onChange('email', e)}
        />
        <LineInput
          placeholder="Password"
          onChange={e => this.onChange('password', e)}
          type="password"
        />
        <Mutation mutation = {REGISTER_USER} variables = {{input: this.state}} >
          {(createUser, {loading, error, data}) => (
            <SubmitButton onClick={createUser}> Get Started </SubmitButton>
          )}
        </Mutation>
        <SecondaryOptionText onClick={this.props.changeMode}>
          Or Login
        </SecondaryOptionText>
      </React.Fragment>
    )
  }
}

export default SignUp
