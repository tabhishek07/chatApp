import mongoose from 'mongoose';
import projectModel from '../models/project.models.js';

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error('Name is required');
  }

  if (!userId) {
    throw new Error('User ID is required');
  }

  // Check if project with the same name already exists
  const existingProject = await projectModel.findOne({ name: name.toLowerCase().trim() });
  if (existingProject) {
    throw new Error('Project with this name already exists');
  }

  try {
    const project = await projectModel.create({
      name: name.toLowerCase().trim(),
      users: [userId],
    });

    return project;
  } catch (err) {
    throw err;
  }
};

export const getAllProjectByUserId = async(userId) => {
  if(!userId){
    throw new Error('User ID is required');
  }
  try{
    const allUserProjects = await projectModel.find({ users: userId});
    return allUserProjects;

  } catch(err){
    console.log(err);
    throw new Error(err.message)
  }
}

export const addUsersToProject = async(projectId, users, userId) =>{

  if(!projectId){
    throw new Error('Project ID is required');
  }

  if(! mongoose.Types.ObjectId.isValid(projectId)){
    throw new Error('Invalid Project ID');
  }

  if(!users){
    throw new Error('Users are required');
  }

  

  if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
    throw new Error('Users must be an array of valid user IDs');
  }

  if(!userId){
    throw new Error('User ID is required');
  }

  if(!mongoose.Types.ObjectId.isValid(userId)){
    throw new Error('Invalid User ID');
  }

  const project = await projectModel.findOne({
    _id: projectId,
    users: userId // Ensure the user adding is part of the project
  })

  if(! project){
    throw new Error('User not belong to the project or project does not exist');
  }

  const updatedProject = await projectModel.findOneAndUpdate({
    _id: projectId,
  },{
    $addToSet: {
      users: {
        $each: users
      }
    }
  }, {
    new: true
  })

  return updatedProject;

}

export const getProjectById = async (projectId) => {

  if(!projectId){
    throw new Error ('ProjectId is required')
  }

  if(!mongoose.Types.ObjectId.isValid(projectId)){
    throw new Error('invalid Project ID');
  }

  const project = await projectModel.findOne({
    _id: projectId
  }).populate('users')

  return project;
}