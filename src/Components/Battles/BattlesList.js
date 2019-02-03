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
    this.handleApprove = this.handleApprove.bind(this);
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

  handleApprove(value, approve) {
    this.setState(prevState => {
      const prevBattles = [...prevState.battles];
      const battleToChange = prevBattles.find(battle => battle.slug === value);
      battleToChange.approved = approve;

      return prevBattles;
    });
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
            handleApprove={this.handleApprove}
          />
         ) : <Loader />}
      </React.Fragment>
    );
  }
}

export default BattlesList;