import React, { Component } from 'react';
import List from '../Elements/List';
import Loader from '../Basics/Loader';
import { apiUrl } from '../../config/constants';

class NewspapersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newspapers: [],
      loading: true,
    }
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
  }

  componentDidMount() {
    fetch(`${apiUrl}/newspapers`)
      .then(response => response.json())
      .then(newspapers => this.setState({ newspapers, loading: false }));
  }

  deleteItemFromList(value) {
    this.setState(prevState => ({ newspapers: prevState.newspapers.filter(newspaper => newspaper.slug !== value) }))
  }

  handleApprove(value, approve) {
    this.setState(prevState => {
      const prevNewspapers = [...prevState.correspondants];
      const newspaperToChange = prevNewspapers.find(newspaper => newspaper.slug === value);
      newspaperToChange.approved = approve;

      return prevNewspapers;
    });
  }

  render() {
    const { loading, newspapers } = this.state;
    return (
      <React.Fragment>
        <h2>Lista de periódicos</h2>
        {!loading ? (
          <List
            items={newspapers}
            url={`${apiUrl}/newspapers`}
            appUrl="/gestor/periodicos"
            noItemsMsg="No hay periódicos"
            deleteItemFromList={this.deleteItemFromList}
            handleApprove={this.handleApprove}
          />
         ) : <Loader />}
      </React.Fragment>
    );
  }
}

export default NewspapersList;