import React, { useState } from 'react'
// import AddIcon from '@mui/icons-material/Add';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const App = () => {
  const [inputItems, setInputItems] = useState('');
  const [addedItems, setAddedItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editId, setEditId] = useState();

  // Items Add button
  const AddItems = () => {
    if (!inputItems) {
      alert('Enter somethings...');
    }
    else if (inputItems && !toggle) {
      setAddedItems(
        addedItems.map((upValue) => {
          if (upValue.id === editId) {
            return { ...addedItems, name: inputItems }
          }
          return (upValue);
        })
      )
      setToggle(true);
      setInputItems('');
      setEditId();
    }
    else {
      const items = { id: new Date().getTime().toString(), name: inputItems }
      setAddedItems([...addedItems, items]);
    }
    setInputItems('');
  }

  // Edit Btn
  const EditBtn = (ediId) => {
    const edit = addedItems.find((ediVal) => {
      return (ediId === ediVal.id);
    })
    setInputItems(edit.name);
    setToggle(false);
    setEditId(ediId);
  }

  // Items Delete Button
  const DeleteBtn = (delId) => {
    const deleteItems = addedItems.filter((value) => {
      return (value.id !== delId);
    })
    setAddedItems(deleteItems);
    setInputItems('');
  }
  // Clear All Btn
  const ClearAll = () => {
    setAddedItems([]);
  }
  return (
    <div className=' bg-black h-screen w-screen overflow-x-hidden'>
      <div className='flex justify-center pt-20'>
        <div className=' shadow-2xl rounded-lg'>
          <div className='bg-gray-800 rounded-xl my-10 py-10 px-8'>
            <div className='text-5xl text-center'>📝</div>
            <h1 className='text-center text-white my-5 shadow-white text-shadow-lg'>Add Your List Here..</h1>
            <div className='flex items-center'>
              <input className='pl-2 pr-8 py-1 w-60 rounded-md' onChange={(event) => setInputItems(event.target.value)} value={inputItems} type="text" placeholder='Enter items to add....' />
              <button className='text-black text-xl font-bold -ml-8' onClick={AddItems}>{toggle ? <IoMdAdd className='w-5 h-5' /> : <FaRegEdit className='w-5 h-5 text-green-700' />}</button>
            </div>
            {
              addedItems.map((value) => {
                return (
                  <div className='text-white bg-blue-600 group hover:bg-white font-medium hover:text-blue-700  flex mt-2 py-1 justify-between px-2 w-60 rounded-sm' key={value.id}>
                    <div>
                      <h1 className=''>{value.name}</h1>
                    </div>
                    <div className='flex items-center'>
                      <button className='mr-2 text-base' onClick={() => EditBtn(value.id)}>
                        <FaRegEdit className='w-5 h-5 group-hover:text-green-500' />
                      </button>
                      <button onClick={() => DeleteBtn(value.id)}>
                        <MdDeleteForever className='w-6 h-6 group-hover:text-red-500' />
                      </button>
                    </div>
                  </div>)
              })
            }
            <div className='text-center'>
              <button className='text-black hover:bg-blue-500 hover:text-white bg-blue-100 border-2 my-3 px-5 py-1 font-semibold rounded-md' onClick={ClearAll}>Clear All</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App