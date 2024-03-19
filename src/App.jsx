import React, { useState } from 'react';
import './App.css'; // File CSS yang akan digunakan untuk menambahkan gaya kustom
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { MdDeleteSweep } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { IoMdAddCircle } from 'react-icons/io';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingDescription, setEditingDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [showTitlePopup, setShowTitlePopup] = useState(false);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [editedTodoIndex, setEditedTodoIndex] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [editedTodoDescription, setEditedTodoDescription] = useState('');
  const [showDescriptionRequiredPopup, setShowDescriptionRequiredPopup] =
    useState(false); // State baru untuk pop-up validasi deskripsi kosong
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletedTodoIndex, setDeletedTodoIndex] = useState(null);

  const addTodo = (e) => {
    e.preventDefault(); // Prevent form default behavior
    if (newTodo === '') {
      setShowTitlePopup(true); // Menampilkan pop-up jika judul kosong
      return;
    } else if (newDescription === '') {
      setShowDescriptionRequiredPopup(true); // Menampilkan pop-up jika deskripsi kosong
      return;
    }
    setShowTitlePopup(false); // Menutup pop-up jika judul diisi
    setShowDescriptionRequiredPopup(false); // Menutup pop-up jika deskripsi diisi
    const newTodos = [
      ...todos,
      { text: newTodo, description: newDescription, completed: false },
    ];
    setTodos(newTodos);
    setNewTodo('');
    setNewDescription('');
  };

  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setShowDeleteConfirmation(false); // Menutup pop-up konfirmasi penghapusan setelah item dihapus
  };

  const handleEdit = (index) => {
    setEditingTodo(index);
    setEditedTodoIndex(index);
    setEditedTodoText(todos[index].text);
    setEditedTodoDescription(todos[index].description); // Menyimpan deskripsi yang akan diedit
    setEditingDescription(todos[index].description); // Mengatur deskripsi yang akan ditampilkan pada input edit deskripsi
  };

  const handleSaveEdit = (index, newText, newDescription) => {
    if (newText === '' || newDescription === '') return;
    setShowEditConfirmation(true);
    setEditedTodoText(newText);
    setEditedTodoDescription(newDescription);
  };

  const confirmEdit = () => {
    const newTodos = [...todos];
    newTodos[editedTodoIndex].text = editedTodoText;
    newTodos[editedTodoIndex].description = editedTodoDescription;
    setTodos(newTodos);
    setShowEditConfirmation(false);
    setEditingTodo(null);
    setEditedTodoIndex(null);
    setEditedTodoText('');
    setEditedTodoDescription('');
  };

  const cancelEdit = () => {
    setShowEditConfirmation(false);
    setEditingTodo(null);
    setEditedTodoIndex(null);
    setEditedTodoText('');
    setEditedTodoDescription('');
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredTodos = todos.filter((todo) => {
    const lowerCaseText = todo.text.toLowerCase();
    return (
      (searchText === '' || lowerCaseText.includes(searchText)) &&
      (filter === 'all' ||
        (filter === 'completed' ? todo.completed : !todo.completed))
    );
  });

  const handleShowDeleteConfirmation = (index) => {
    setDeletedTodoIndex(index);
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="w-screen min-h-screen flex items-center bg-gradient-to-r from-purple-700 to-teal-900 justify-center p-4 ">
      <div className="bg-none p-6 rounded shadow-md w-full max-w-lg lg:w-1/4  ">
        <h1 className="text-5xl font-bold text-center mb-8">Notes List</h1>

        <div className="search flex justify-between my-4">
          <input
            type="text"
            placeholder="Cari Judul Catatan"
            value={searchText}
            onChange={handleSearch}
            className="w-50 h-7 py-2 px-4 text-gray-400 border1 rounded w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div>
            <select
              onChange={handleFilter}
              value={filter}
              className=" ml-1 h-7 bg-white text-black  border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option className="bg-gray-200 text-black" value="all">
                Semua
              </option>
              <option value="completed">Selesai</option>
              <option className=" bg-gray-200 text-black" value="uncompleted">
                Belum Selesai
              </option>
            </select>
          </div>
        </div>

        <form className="add flex item-center my-4" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Tambahkan Judul baru"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-25 mr-1 px-4 border1 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300 text-gray-400"
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-30 px-4 border1 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300 text-gray-400"
          />
          <button
            className="rounded-full  ml-1 overflow-hidden flex items-center justify-center bg-none  hover:text-cyan-700 text-white"
            type="submit"
          >
            <IoMdAddCircle size={25} />
          </button>
        </form>
        <div className="search flex justify-around my-4">
          <button
            onClick={handleDeleteCompleted}
            className="rounded-full w-10 h-10 ml-1 overflow-hidden flex items-center justify-center bg-none  hover:text-red-900 text-cyan-700"
          >
            <MdDelete size={25} />
          </button>
          <button
            onClick={handleDeleteAll}
            className="rounded-full w-10 h-10 ml-1 overflow-hidden flex items-center justify-center bg-none  hover:text-red-900 text-cyan-700"
          >
            <MdDeleteSweep size={25} />
          </button>
        </div>

        {/* Popup untuk validasi judul kosong */}
        {showTitlePopup && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> Isi dulu judulnya Buoss!.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => setShowTitlePopup(false)}
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  fillRule="evenodd"
                  d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 0 0-.708.708L9.293 10l-3.64 3.64a.5.5 0 1 0 .708.708L10 10.707l3.64 3.64a.5.5 0 0 0 .708-.708L10.707 10l3.64-3.64a.5.5 0 0 0 0-.708z"
                />
              </svg>
            </span>
          </div>
        )}

        {/* Popup untuk validasi deskripsi kosong */}
        {showDescriptionRequiredPopup && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">
              {' '}
              Deskripsinya jangan lupa diisi Woiiii.
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => setShowDescriptionRequiredPopup(false)}
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  fillRule="evenodd"
                  d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 0 0-.708.708L9.293 10l-3.64 3.64a.5.5 0 1 0 .708.708L10 10.707l3.64 3.64a.5.5 0 0 0 .708-.708L10.707 10l3.64-3.64a.5.5 0 0 0 0-.708z"
                />
              </svg>
            </span>
          </div>
        )}

        {/* Popup untuk konfirmasi edit */}
        {showEditConfirmation && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Konfirmasi Edit
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Labil Banget pake diedit segala.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={confirmEdit}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-700 text-base font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Bodo Amat
                  </button>
                  <button
                    onClick={cancelEdit}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Ya Maap
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popup untuk konfirmasi penghapusan */}
        {showDeleteConfirmation && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Konfirmasi Penghapusan
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Yakin nih mau hapus aku?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => handleDelete(deletedTodoIndex)}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Mau bangetzz
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Gajadi deh
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <ul>
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 border-b border-gray-300 ${
                todo.completed ? 'text-gray-400 line-through text-sm' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleComplete(index)}
                className="mr-2 "
              />
              {editingTodo === index ? (
                <div>
                  <input
                    type="text"
                    placeholder="Edit judul"
                    defaultValue={todo.text}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSaveEdit(
                          index,
                          editedTodoText,
                          editedTodoDescription // Menggunakan deskripsi yang sudah diubah
                        );
                      }
                    }}
                    className="mr-1 bg-white text-gray-400 p-1 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Edit deskripsi" // Menampilkan input untuk mengedit deskripsi
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSaveEdit(
                          index,
                          editedTodoText,
                          e.target.value // Menggunakan deskripsi yang diubah
                        );
                      }
                    }}
                    className="mr-1 bg-white text-gray-400 p-1 border border-gray-300 rounded"
                  />
                </div>
              ) : (
                <div>
                  <span className="font-semibold">{todo.text}</span>
                  <br />
                  <span className="text-sm text-gray-400">
                    {todo.description}
                  </span>
                </div>
              )}

              <div className="flex flex-row">
                <button
                  onClick={() => handleEdit(index)}
                  className="rounded-full w-10 h-10 ml-1 overflow-hidden flex items-center justify-center bg-none  hover:text-yellow-500 text-cyan-700"
                >
                  <MdEdit size={25} />
                </button>
                <button
                  onClick={() => handleShowDeleteConfirmation(index)}
                  className="rounded-full w-10 h-10 ml-1 overflow-hidden flex items-center justify-center bg-none  hover:text-red-900 text-red-700"
                >
                  <TiDeleteOutline size={25} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // return (
  //   <div className="">
  //     <h1 className="text-center font-bold mb-4">Today Activity</h1>

  //     <div className="todo-list">
  // <input
  //   type="text"
  //   placeholder="Cari Aktivitas"
  //   value={searchText}
  //   onChange={handleSearch}
  //   className="my-3 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
  // />;
  // <form className="add flex items-center mb-4" onSubmit={addTodo}>
  //   <input
  //     type="text"
  //     placeholder="Tambahkan aktivitas baru"
  //     value={newTodo}
  //     onChange={(e) => setNewTodo(e.target.value)}
  //     className="mr-2 p-2 border border-gray-300 rounded"
  //   />
  //   <button
  //     className="tambah w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-blue-400 hover:text-red-700 text-white"
  //     type="submit"
  //   >
  //     <IoIosAddCircle />
  //   </button>
  // </form>;
  // <div className="filter-bar mb-4">
  //   <select
  //     onChange={handleFilter}
  //     value={filter}
  //     className="p-2 border border-gray-300 rounded"
  //   >
  //     <option value="all">Semua</option>
  //     <option value="completed">Selesai</option>
  //     <option value="uncompleted">Belum Selesai</option>
  //   </select>
  // </div>;

  // <button
  //   onClick={handleDeleteCompleted}
  //   className="mb-2 px-4 py-2 bg-red-500 text-white rounded mr-2"
  // >
  //   Hapus Selesai
  // </button>
  // <button
  //   onClick={handleDeleteAll}
  //   className="mb-2 px-4 py-2 bg-red-500 text-white rounded"
  // >
  //   Hapus Semua
  // </button>
  // <ul>
  //   {filteredTodos.map((todo, index) => (
  //     <li
  //       key={index}
  //       className={`flex items-center justify-between p-2 border-b border-gray-300 ${
  //         todo.completed ? 'text-gray-400' : ''
  //       }`}
  //     >
  //       <input
  //         type="checkbox"
  //         checked={todo.completed}
  //         onChange={() => handleComplete(index)}
  //         className="mr-2"
  //       />
  //       {editingTodo === index ? (
  //         <input
  //           type="text"
  //           defaultValue={todo.text}
  //           onBlur={(e) => handleSaveEdit(index, e.target.value)}
  //           className="p-1 border border-gray-300 rounded"
  //         />
  //       ) : (
  //         <span>{todo.text}</span>
  //       )}
  //       <div>
  //         <button
  //           onClick={() => handleEdit(index)}
  //           className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
  //         >
  //           Edit
  //         </button>
  //         <button
  //           onClick={() => handleDelete(index)}
  //           className="px-2 py-1 bg-red-500 text-white rounded"
  //         >
  //           Hapus
  //         </button>
  //       </div>
  //     </li>
  //   ))}
  // </ul>
  //     </div>
  //   </div>
  // );
}

export default App;
