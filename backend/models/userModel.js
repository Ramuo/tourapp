import mongoose from  'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    id: {
        type: String
    },

}, {timestamps: true});

//TO CREAPT PSW WHEN REGISTERING NEW USER
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    };

  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});




const User =  mongoose.model('User', userSchema);
export default User;