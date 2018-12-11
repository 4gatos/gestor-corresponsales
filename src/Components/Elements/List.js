import React, { PureComponent } from 'react';
import Icon from '../Basics/Icon';
import { Link } from 'react-router-dom';

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  
  deleteItem(event) {
    const { url, deleteItemFromList } = this.props;
    const { value } = event.currentTarget;

    fetch(`${url}/${value}`, { method: 'delete' })
      .then(response => response.status === 204 && deleteItemFromList(value));
  }

  render() {
    const { items, noItemsMsg, appUrl, noImg, noActions} = this.props;
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
                  {!noImg && (
                    <div className="item-img">
                      <img src="https://via.placeholder.com/50" alt={item.name} />
                    </div>
                  )}
                  {item.name}{' '}{item.surname && item.surname}{item.role ? ` - Rol: ${item.role}` : ''}
                </div>
                {!noActions && (
                  <div className="item-actions">
                    <Link to={`${appUrl}/${item.slug}`}>
                      <Icon icon="icon-edit" />
                    </Link>
                    <button value={item.slug} onClick={this.deleteItem}>
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