import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Project = () => {
  const location = useLocation();
  console.log(location.state);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const Users = [
    { id: 1, name: "Alice Sharma" },
    { id: 2, name: "Rohit Mehta" },
    { id: 3, name: "Priya Verma" },
    { id: 4, name: "Aman Khan" },
    { id: 5, name: "Sneha Das" },
    { id: 6, name: "Vikram Singh" },
    { id: 7, name: "Neha Gupta" },
    { id: 8, name: "Rajesh Kumar" },
    { id: 9, name: "Sita Patel" },
    { id: 10, name: "Karan Yadav" },
  ];

  return (
    <main className="h-screen w-screen flex ">
      <section className="left h-full min-w-72 bg-slate-300 flex flex-col relative ">
        <header className="flex justify-end p-2 w-full bg-slate-500 rounded-b-sm">
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="p-2 px-4 cursor-pointer"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area  flex-grow flex flex-col pt-1 ">
          <div className="message-box  flex-grow flex flex-col gap-1 p-1">
            <div className="message max-w-56 flex flex-col p-1 bg-slate-100 rounded-md">
              <samll className="text-xs opacity-65">abc@gmail.com</samll>
              <p className="text-sm">
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                consectetur.
              </p>
            </div>

            <div className="ml-auto message max-w-56 flex flex-col p-1 bg-slate-100 rounded-md">
              <small className="text-xs opacity-65">abc@gmail.com</small>
              <p className="text-sm">
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                consectetur.
              </p>
            </div>
          </div>
          <div className="input-field w-full flex">
            <input
              type="text"
              placeholder="Enter message"
              className=" border-none outline-none p-2 px-4 flex-grow"
            />
            <button className=" px-3 bg-slate-600 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        {/* side pannel to add users in a project  */}

        <div
          className={`sidePanel absolute top-0 bottom-0 left-0 right-0 bg-slate-100  transition-all duration-300 ${
            isPanelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="p-2 px-4 flex justify-between  rounded-b-sm bg-slate-500">
            <button
              onClick={() => {
                setUsers(Users);
                setisModalOpen(!isModalOpen);
              }}
              className="flex items-center gap-1 "
            >
              <i className="ri-user-add-fill"></i>
              <p className="text-sm font-semibold">Add collaborator</p>
            </button>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="p-2 px-4 cursor-pointer"
            >
              <i className="ri-close-fill rounded-full border border-slate-600"></i>
            </button>
          </header>

          <div className="users flex items-center gap-2 p-2">
            <div className="user bg-slate-500 h-10 w-10 rounded-full flex items-center justify-center">
              <i className="ri-user-3-line"></i>
            </div>
            <h2 className="font-semibold hover:bg-slate-200 w-full p-2 rounded-md cursor-pointer">
              Username
            </h2>
          </div>
        </div>
      </section>

      {/* creating a user modal to add users */}

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-md w-96 max-w-90 max-h-[80vh] flex flex-col pt-0 px-4 pb-4 shadow-lg animate-fade-in-up">
      
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white z-10 p-2 shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Select User</h2>
          <button
            onClick={() => setisModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200"
          >
            <i className="ri-close-fill"></i>
          </button>
        </div>
      </header>

      {/* Scrollable User List */}
      <div className="flex flex-col gap-2 overflow-y-auto flex-grow pr-1 mt-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="user flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              <i className="ri-user-fill text-xl"></i>
            </div>
            <h1 className="font-semibold text-lg">{user.name}</h1>
          </div>
        ))}
      </div>

      {/* Add User Button - Always at bottom */}
      <button className="bg-blue-600 text-white py-2 mt-3 rounded hover:bg-blue-700 transition">
        Add User
      </button>
    </div>
  </div>
)}

    </main>
  );
};

export default Project;
