import React, { Component } from 'react';
import List from '../Elements/List';
import Loader from '../Basics/Loader';
import { apiUrl } from '../../config/constants';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    }
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
  }

  componentDidMount() {
    fetch(`${apiUrl}/users`, { method: 'get', credentials: 'include' })
      .then(response => response.json())
      .then(users => this.setState({ users, loading: false }));
  }

  deleteItemFromList(value) {
    this.setState(prevState => ({ users: prevState.users.filter(user => user.id !== value) }))
  }
  
  render() {
    const { loading, users } = this.state;
    return (
      <React.Fragment>
        <h2>Lista de usuarios</h2>
        {!loading ? (
          <List
            items={users}
            url={`${apiUrl}/users`}
            noImg
            noActions
            appUrl="/gestor/usuarios"
            noItemsMsg="No hay usuarios"
            deleteItemFromList={this.deleteItemFromList}
          />
         ) : <Loader />}
      </React.Fragment>
    );
  }
}

export default UserList;