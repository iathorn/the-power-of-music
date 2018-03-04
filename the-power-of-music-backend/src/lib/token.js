const { 
    JWT_SECRET: jwtSecret
} = process.env;

const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                jwtSecret,
                {
                    expiresIn: '7d'
                }, (error, token) => {
                    if(error) reject(error);
                    resolve(token);
                }
            );
        }
    );
}

exports.generateToken = generateToken;

function decodeToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (error, decoded) => {
                if(error) reject(error);
                resolve(decoded);
            });
        }
    );
};

exports.jwtMiddleware = async(req, res, next) => {
    const token = req.cookies["access_token"];
    if(!token) return next();

    try {
        const decoded = await decodeToken(token);
        if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24){
            const { _id, username } = decoded;
            const freshToken = await generateToken({_id, username}, 'account');
            res.cookie('access_token', freshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true
            });
        }

        req.user = decoded;
    } catch(e){
        req.user = null;
    }

    return next();
}