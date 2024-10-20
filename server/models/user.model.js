import {Schema, model} from 'mongoose'
import validator from 'validator'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const {isEmail} = validator

const UserSchema = new Schema (
    {
        username : {
            type : String,
            required : [true, 'Username is reqired'],
            unique : [true, 'Username already exists']
        },
        email: {
            type : String,
            required : [true, 'Email is required'],
            unique : [true, 'Email already exists'],
            validate : [isEmail, 'Invalid Email']
        },
        password : {
            type : String, 
            required : [true, 'Password is required'],
            minLength : [8, 'Password must be a minimum of 8 characters']
        }
    },
    {timestamps : true}
)

UserSchema.plugin(mongooseUniqueValidator);

//Middleware

//Set Confirm password field
UserSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword
    })
    .set(function(value) {
        this._confirmPassword = value
    })

//Check that passwords match
UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords dont match')
    }
    next()
})

//save password and hash
UserSchema.pre('save', function(next) {
    //what to hash and how many rounds to send it through
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

const User = model('User', UserSchema);
export default User;