const Account = require('models/account');
const Joi = require('joi');
const {
    ADMIN_PASS: adminPass
} = process.env;
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    
    let existing = null;

    try { 
        existing = await Account.findByEmailOrUsername(req.body);
    } catch(e){
        console.error(e);
        return res.status(500);
    }

    if(existing) {
        return res.status(409).json({
            key: existing.email === req.body.email ? 'email' : 'username'
        });
    }

    let account = null;

    try {
        account = await Account.localRegister(req.body);
    } catch(e){
        console.error(e);
        return res.status(500);
    }

    let token = null;

    try {
        token = await account.generateToken();
    } catch(e){
        return res.status(500);
    }

    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    res.json(account);
   
}

exports.login = async (req, res) => {
    
    try {
        await Joi.validate(req.body.email, Joi.string().email().required());
        await Joi.validate(req.body.password, Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required());
    } catch(e){
        return res.status(400).json({
            error: e
        });
    }

    const { email, password } = req.body;
    let account = null;

    try {
        account = await Account.findByEmail(email);
    } catch(e){
        console.error(e);
        return res.status(500);
    }

    if(!account || !account.validatePassword(password)) {
        return res.status(403);
    }

    let token = null;

    try {
        token = await account.generateToken();
    } catch(e){
        console.error(e);
        return res.status(500);
    }

    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    res.json(account.email);
} 

exports.adminLogin = (req, res) => {
    const { password } = req.body;
    if(adminPass === password) {
        res.json({
            success: true
        });
        req.session.logged = true;

    } else {
        res.json({
            success: false
        });
        return res.status(401);
    }
}

exports.logout = (req, res) => {
    res.cookie('access_token', null, {
        maxAge: 0,
        httpOnly: true
    });
    res.status(204);
}

exports.adminLogout = (req, res) => {
    req.session = null;
    res.status(204);
}

exports.checkLogin = (req, res) => {
    const { user } = req;

    if(!user) {
        return res.status(403);
    }

    res.json(user.username);

}

exports.checkLoginAdmin = (req, res) => {
    res.json({
        logged: !!req.session.logged
    });
}