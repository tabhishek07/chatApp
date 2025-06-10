import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";


export const authUser = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

        if(!token) {
            res.status(401).send({ error : 'Unauthorized user'})
        }

        const isBlackListed = await redisClient.get(token)

        if(isBlackListed){
            res.cookie('token', ' ')
            return res.status(401).send({
                error: 'Session Expired login again!'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err) {
        console.log(err);
        res.status(401).send( { error : 'Please authenticate'});
    }

}