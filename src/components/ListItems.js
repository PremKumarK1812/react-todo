const ListItems = ({ list, deleteItem, editItem }) => {
  return (
    <div className='form-list'>
      {list.map(({ id, title }) => {
        return (
          <article className='form-item' key={id}>
            <p className='title'>{title}</p>
            <button
              type='button'
              className='edit-button'
              onClick={() => editItem(id)}
            >
              Edit
            </button>
            <button
              type='button'
              className='delete-button'
              onClick={() => deleteItem(id)}
            >
              Delete
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default ListItems;
