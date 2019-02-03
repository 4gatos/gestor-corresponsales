import React, { Component } from 'react';
import List from '../Elements/List';
import Loader from '../Basics/Loader';
import { apiUrl } from '../../config/constants';

class CorrespondantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correspondants: [],
      loading: true,
    }
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
  }

  componentDidMount() {
    fetch(`${apiUrl}/correspondants`)
      .then(response => response.json())
      .then(correspondants => this.setState({ correspondants, loading: false }));
  }

  deleteItemFromList(value) {
    this.setState(prevState => ({ correspondants: prevState.correspondants.filter(correspondant => correspondant.slug !== value) }))
  }

  handleApprove(value, approve) {
    this.setState(prevState => {
      const prevCorrespondants = [...prevState.correspondants];
      const correspondantToChange = prevCorrespondants.find(correspondant => correspondant.slug === value);
      correspondantToChange.approved = approve;

      return prevCorrespondants;
    });
  }

  render() {
    const { loading, correspondants } = this.state;
    return (
      <React.Fragment>
        <h2>Lista de corresponsales</h2>
        {!loading ? (
          <List
            items={correspondants}
            url={`${apiUrl}/correspondants`}
            appUrl="/gestor/corresponsales"
            noItemsMsg="No hay corresponsales"
            deleteItemFromList={this.deleteItemFromList}
            handleApprove={this.handleApprove}
          />
         ) : <Loader />}
      </React.Fragment>
    );
  }
}

export default CorrespondantsList;