import { hash } from 'bcrypt';
import userModel from '../models/user.model.js';


export const createUser = async ({
    email, password
}) => {
    if (!email || ! password) {
        throw error("Email and password are required")
    }
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password: hashedPassword,
    });

    return user;
}
