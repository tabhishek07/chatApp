import { compare } from 'bcrypt';
import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';



// user controller vaditade user through express validator 
export const createUserController = async (req, res) => {

    console.log("Request Body:", req.body); //debug

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await userService.createUser(req.body);
        const token =  await user.generateJWT( )

        delete user._doc.password

        res.status(201).json({ user, token });
    } catch(err){
        res.status(400).send(err.message)
    }

}

// login controller

export const loginController = async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{

        const {email, password} = req.body;

        const user =  await userModel.findOne({email}).select('+password');

        if(!user){
           return res.status(401).json({
                errors: 'Invalid Credentials'
            })
        }

        const isMatch =  await user.isValidPassword(password)

        if(!isMatch){
           return res.status(401).json({
                errors: 'Invalid Password'
            })
        }

        const token = await user.generateJWT();

        delete user._doc.password;

        res.status(200).json({user, token})

    }catch(err){
        res.status(400).send(err.message)
    }
}

// profile controller : it let only loggedIn user to access further else throw unauthorized user 
  // to achieve this only authorized access functionallity we create middleware 

export const profileController =  async (req, res) => {
    console.log(req.user);
    res.status(201).json({
        user: req.user
    })
}

// controller for logout 

export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

        redisClient.set(token, 'logout', 'EX', 60*60*24);

        res.status(200).json({
            message: 'Logged out succesfully'
        });
        
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
}

// get all users controller

export const getAllUsersController = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })
        const allUsers = await userService.getAllUsers({userId: loggedInUser._id});
        console.log('allUsers:', allUsers); // check
        return res.status(200).json({
            users: allUsers
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({error: err.message})
    }
}