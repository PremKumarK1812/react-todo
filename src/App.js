import React from 'react';
import { useEffect, useState } from 'react';
import ListItems from './components/ListItems';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState('');

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const deleteItem = (id) => {
    const updatedItems = list.filter((item) => item.id !== id);
    setList(updatedItems);
    setIsEditing(false);
    setName('');
  };

  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(itemToEdit.title);
  };

  const clearHandler = () => {
    setList([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (name.trim()) {
      if (isEditing) {
        const updatedList = list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          } else {
            return item;
          }
        });
        setList(updatedList);
        setIsEditing(false);
        setEditID('');
      } 
      else {
        const newItem = { id: new Date().getTime().toString(), title: name };
        setList([...list, newItem]);
      }
      setName('');
    } 
  };

  return (
    <section className='container'>
      <form className='todo-form' onSubmit={submitHandler}>
        <h1>To Do List</h1>
        <div>
          <input
            type='text'
            className='input-area'
            name='input-area'
            placeholder='Ex.Buy Fruits'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-button'>
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='todo-form-container'>
          <ListItems list={list} deleteItem={deleteItem} editItem={editItem} />
          <button className='clear-button' onClick={clearHandler}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
