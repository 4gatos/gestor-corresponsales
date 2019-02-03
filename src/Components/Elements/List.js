import React, { Component } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import Icon from '../Basics/Icon';
import { Link } from 'react-router-dom';

function getRole(role) {
  if (role === 'admin') {
    return 'Administrador';
  } else if (role === 'user') {
    return 'Usuario';
  }
  return 'Usuario';
}

class List extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.approveItem = this.approveItem.bind(this);
    this.disapproveItem = this.disapproveItem.bind(this);
  }
  
  deleteItem(event) {
    const { url, deleteItemFromList } = this.props;
    const { value } = event.currentTarget;

    fetch(`${url}/${value}`, { method: 'delete', credentials: 'include' })
      .then(response => response.status === 204 && deleteItemFromList(value));
  }

  approveItem(event) {
    const { url, handleApprove } = this.props;
    const { value } = event.currentTarget;

    fetch(`${url}/${value}/approve`, { method: 'put', credentials: 'include' })
      .then(response => response.status === 201 && handleApprove(value, true));
  }

  disapproveItem(event) {
    const { url, handleApprove } = this.props;
    const { value } = event.currentTarget;

    fetch(`${url}/${value}/disapprove`, { method: 'put', credentials: 'include' })
      .then(response => response.status === 201 && handleApprove(value, false));
  }

  render() {
    const { items, noItemsMsg, appUrl, noImg, noActions, users } = this.props;
    return (
      <ul className="list">
        {
          items && items.length > 0
            ? items.map(item => (
              <li
                className="list-item"
                key={item.slug || item.id}
              >
                <div className="item-info">
                  {!noImg && item.mainImg && (
                    <CloudinaryContext cloudName="plasocloudinary">
                      <div className="item-img">
                        <Image publicId={item.mainImg} />
                      </div>
                    </CloudinaryContext>
                  )}
                  {item.name}{' '}{item.surname && item.surname}{item.email ? ` - ${item.email}` : ''}{item.role ? ` - ${getRole(item.role)}` : ''}
                </div>
                {!noActions && (
                  <div className="item-actions">
                    { !users && (
                      item.approved && !users ? (
                        <button value={item.slug} onClick={this.disapproveItem}>Despublicar</button>
                      ) : (
                        <button value={item.slug} onClick={this.approveItem}>Publicar</button>
                      )
                    )}
                    <Link to={`${appUrl}/${item.slug || item.id}`}>
                      <Icon icon="icon-edit" />
                    </Link>
                    <button value={item.slug || item.id} onClick={this.deleteItem}>
                      <Icon icon="icon-trash" />
                    </button>
                  </div>
                )}
              </li>
            ))
            : <p>{noItemsMsg}</p>
        }
      </ul>
    );
  }
}

export default List;