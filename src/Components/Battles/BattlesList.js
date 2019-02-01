import React, { Component } from 'react';
import List from '../Elements/List';
import Loader from '../Basics/Loader';
import { apiUrl } from '../../config/constants';

class BattlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battles: [],
      loading: true,
    }
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
  }

  componentDidMount() {
    fetch(`${apiUrl}/battles`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(battles => this.setState({ battles, loading: false }));
  }

  deleteItemFromList(value) {
    this.setState(prevState => ({ battles: prevState.battles.filter(battles => battles.slug !== value) }))
  }
  
  render() {
    const { loading, battles } = this.state;
    return (
      <React.Fragment>
        <h2>Lista de hitos</h2>
        {!loading ? (
          <List
            items={battles}
            url={`${apiUrl}/battles`}
            appUrl="/gestor/hitos"
            noItemsMsg="No hay hitos"
            deleteItemFromList={this.deleteItemFromList}
          />
         ) : <Loader />}
      </React.Fragment>
    );
  }
}

export default BattlesList;