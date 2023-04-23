import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


const protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //1 Let's get the token from header
            token = req.headers.authorization.split(' ')[1];
            //2 Let's verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //3 Let's user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log("Non authorisé");
            res.status(401)
            throw new Error('Non authorisé')
        }
    };
    //Let's check if there is no token
    if(!token){
        res.status(401)
        throw new Error('Non authorizé');
    }
});


export {
    protect
}