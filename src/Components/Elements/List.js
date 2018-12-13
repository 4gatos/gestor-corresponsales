import React, { PureComponent } from 'react';
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

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  
  deleteItem(event) {
    const { url, deleteItemFromList } = this.props;
    const { value } = event.currentTarget;

    fetch(`${url}/${value}`, { method: 'delete', credentials: 'include' })
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