import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'



//@desc     Login user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //1 Find user by email
    const user = await User.findOne({email});
    //2 Validate user
    if(!user){
        res.status(400)
        throw new Error("Utilisateur inconu");

    };
    //Check if user and password match
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(401)
        throw new Error("Email ou mot de passe invalide")
    }

});


//@desc     Register new user
//@route    POST /api/users/register
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    // 1 Validate all fields
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Tous les champs sont requis')
    }

    // 2 Find user by email
    const userExist = await User.findOne({email});

    // 3 Check if user exist
    if(userExist){
        res.status(400)
        throw new Error("L'utilisateur existe déjà")
    }

    // 4 To create new user
    const user = await User.create({
        name,
        email,
        password
    })

    // 5 Once user created, then set it into db
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('Invalide user data')
    }
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    //check if not user
    if(!user){
        res.status(404)
        throw new Error("L'utilisateur est intouvable ");
    };

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    //const {name, occupation, imageFile, mobile, address} = req.body;

    //Check if user
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.occupation = req.body.occupation || user.occupation
        user.imageFile = req.body.imageFile || user.imageFile
        user.mobile = req.body.mobile || user.mobile
        user.address = req.body.address || user.address
        //Let's check if a password was sent
        if(req.body.password){
            user.password = req.body.password
        }

        //Let's save the updated changes 
        const upadatedUser = await user.save();

        res.status(200).json({
            _id: upadatedUser._id,
            name: upadatedUser.name,
            email: upadatedUser.email,
            occupation: upadatedUser.occupation,
            imageFile: upadatedUser.imageFile,
            mobile: upadatedUser.mobile,
            address: upadatedUser.address,
            token : generateToken(upadatedUser._id)
        });
    }else{
        res.status(404)
        throw new Error("L'utilisateur est intouvable");
    }
});

// TO GENERATE THE TOKEN
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};


export {
    loginUser,
    registerUser,
    getUserProfile,
    updateProfile
}
