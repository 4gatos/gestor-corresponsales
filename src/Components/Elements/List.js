import React, { PureComponent } from 'react';
import Icon from '../Basics/Icon';

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
    const { items, noItemsMsg} = this.props;
    return (
      <ul className="list">
        {
          items && items.length > 0
            ? items.map(item => (
              <li
                className="list-item"
                key={item.slug}
              >
                <div className="item-info">
                  <div className="item-img">
                    <img src="https://via.placeholder.com/50" alt={item.name} />
                  </div>
                  {item.name}
                </div>
                <div className="item-actions">
                  <button value={item.slug} onClick={this.deleteItem}>
                    <Icon icon="icon-trash" />
                  </button>
                </div>
              </li>
            ))
            : <p>{noItemsMsg}</p>
        }
      </ul>
    );
  }
}

export default List;