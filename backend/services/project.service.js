import projectModel from '../models/project.models';

export const createProject = async({
    name, userId
}) => {
    if(!name) {
        throw new Error('Name is required');
    }
    if(!userId) {
        throw new Error('Userid is Required');
    }

    const project  = await projectModel.create( {
        name,
        users: [ userId ]
    })

    return project;
};