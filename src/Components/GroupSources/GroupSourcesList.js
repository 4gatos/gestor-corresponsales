import React, { Component } from 'react';
import List from '../Elements/List';
import Loader from '../Basics/Loader';
import { apiUrl } from '../../config/constants';

class GroupSourcesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      loading: true,
    }
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
  }

  componentDidMount() {
    fetch(`${apiUrl}/group-sources`)
      .then(response => response.json())
      .then(sources => this.setState({ sources, loading: false }));
  }

  deleteItemFromList(value) {
    this.setState(prevState => ({ sources: prevState.sources.filter(source => source.slug !== value) }))
  }

  handleApprove(value, approve) {
    this.setState(prevState => {
      const prevSources = [...prevState.sources];
      const sourceToChange = prevSources.find(source => source.slug === value);
      sourceToChange.approved = approve;

      return prevSources;
    });
  }

  render() {
    const { loading, sources } = this.state;
    return (
      <React.Fragment>
        <h2>Lista de grupos de fuentes</h2>
        {!loading ? (
          <List
            items={sources}
            url={`${apiUrl}/group-sources`}
            appUrl="/gestor/grupo-fuentes"
            noItemsMsg="No hay grupos"
            deleteItemFromList={this.deleteItemFromList}
            handleApprove={this.handleApprove}
          />
         ) : <Loader />}
      </React.Fragment>
    );
  }
}

export default GroupSourcesList;