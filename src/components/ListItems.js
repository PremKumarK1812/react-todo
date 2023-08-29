import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
const ListItems = ({ list, deleteItem, editItem }) => {
  return (
    <div className='form-list'>
      <h3 className='title-2'>Items</h3>
      {list.map(({ id, title }) => {
        return (
          <article className='form-item' key={id}>
            <div className='todo-list-container'>
              <div className='name-deadline' style={{ color: title.color }}>
                <span>{title.name}</span>
                <span>{title.deadline}</span>
              </div>
              <button
                type='button'
                className='edit-button'
                onClick={() => editItem(id)}
              >
                Edit <MdOutlineEdit />
              </button>
              <button
                type='button'
                className='delete-button'
                onClick={() => deleteItem(id)}
              >
                Delete <MdOutlineDelete />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ListItems;
