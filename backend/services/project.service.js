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
    const allUserProjects = await projectModel.find({ users: userId });
    return allUserProjects;

  } catch(err){
    console.log(err);
    throw new Error(err.message)
  }
}