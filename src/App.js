import React from 'react';
import { useEffect, useState } from 'react';
import { MdOutlineClear } from 'react-icons/md';
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
  const [deadline, setDeadline] = useState('');
  const [color, setColor] = useState('#123456');
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
    setName(itemToEdit.title.name);
    setDeadline(itemToEdit.title.deadline);
    setColor(itemToEdit.title.color);
  };

  const clearHandler = () => {
    setList([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (name.trim()) {
      if (isEditing) {
        const updatedList = list.map((item) => {
          console.log(item);
          if (item.id === editID) {
            return {
              id: editID,
              title: { name: name, deadline: deadline, color: color },
            };
          } else {
            return item;
          }
        });
        console.log('hiii');
        setList(updatedList);
        setIsEditing(false);
        setEditID('');
        console.log(updatedList);
      } else {
        const newItems = { name: name, deadline: deadline, color: color };
        const newItem = {
          id: new Date().getTime().toString(),
          title: newItems,
        };
        setList([...list, newItem]);
      }
      setName('');
      setDeadline('');
      setColor('#123456');
    } else {
      alert('All Fields are mandatory');
    }
  };

  return (
    <section className='container'>
      <form className='todo-form' onSubmit={submitHandler}>
        <h1 className='title-1'>To Do List</h1>
        <div className='todo-form-control'>
          <label htmlFor='add-item'>Add Item</label>
          <input
            type='text'
            className='input-area'
            name='input-area'
            placeholder='Item'
            value={name}
            onChange={(e) => setName(e.target.value)}
            id='add-item'
          />
        </div>
        <div className='todo-form-control'>
          <label htmlFor='add-deadline'>Add Deadline</label>
          <input
            type='date'
            className='input-area'
            name='input-area'
            placeholder='Date'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            id='add-deadline'
          />
        </div>
        <div className='todo-form-control'>
          <label htmlFor='add-color'>Add Color</label>
          <input
            type='color'
            className='input-area'
            name='input-area'
            placeholder='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            id='add-color'
          />
        </div>
        <button type='submit' className='submit-button'>
          {isEditing ? 'Edit' : 'Add'}
        </button>
        {list.length > 0 && (
          <div className='todo-form-container'>
            <div className='todo-list'>
              <ListItems
                list={list}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            </div>
            <button className='clear-button' onClick={clearHandler}>
              Clear Items <MdOutlineClear />
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default App;
