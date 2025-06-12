import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context.jsx";
import axios from "../config/axios.js";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  function createProject(e) {
  e.preventDefault();
  console.log({ projectName });

  axios.post('/projects/create', { name: projectName })
    .then((res) => {
      console.log("Project created successfully:", res.data);
      setisModalOpen(false);
      setProjectName(""); // Reset input
    })
    .catch((error) => {
      console.error("Error creating project:", error);
    });
}
  return (
    <main className="p-4">
      <div className="projects">
        <button
          onClick={() => setisModalOpen(true)}
          className="project p-4 border border-gray-300 rounded-md"
        >
          New Project
          <i className="ri-link m-2"></i>
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Create New Project
            </h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  htmlFor="projectName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., My Awesome Project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setisModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
