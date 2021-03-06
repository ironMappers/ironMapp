const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const generateToken = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Missing Username'],
        unique: [true, 'Username already in use, please try a different one'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Missing Email'],
        unique: [true, 'This email is already in use, please try a different one'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Missing Password'],
        //minlength: [8, 'Password must be longer than 8 characters'],
        trim: true
    },
    avatar: {
        type: String,
        default: 'https://64.media.tumblr.com/371214b4b09be648d557658058c32eb9/tumblr_mz743bFtIW1s58mxao1_540.jpg'
    },
    status: {
        active: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            default: generateToken()
        }
    },
    social: {
        slack: String,
        google: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then((hash) => {
                this.password = hash;
                next();
            });
    }else{
        next();
    }
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;