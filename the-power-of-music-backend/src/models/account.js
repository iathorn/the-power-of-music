const mongoose = require('mongoose');
const { Schema } = mongoose;
const { 
    SECRET_KEY: secretKey
} = process.env;
const { generateToken } = require('lib/token');
const crypto = require('crypto');

function hash(password) {
    return crypto.createHmac('sha256', secretKey).update(password).digest('hex');
}

const Account = new Schema({
    email: String,
    username: String,
    password: String,
    joinDate: {
        type: Date,
        default: new Date()
    }
});

Account.statics.findByUsername = function(username) {
    return this.findOne({'username': username}).exec();
}

Account.statics.findByEmail = function(email) {
    return this.findOne({'email': email}).exec();
}

Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        $or: [
            {username},
            {email}
        ]
    }).exec();
}

Account.statics.localRegister = function({username, email, password}) {
    const account = new this({
        email,
        username,
        password: hash(password)
    });
    return account.save()
}

Account.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
}

Account.methods.generateToken = function() {
    const payload = {
        _id: this._id,
        username: this.username
    };

    return generateToken(payload, 'account');


}

module.exports = mongoose.model('Account', Account);