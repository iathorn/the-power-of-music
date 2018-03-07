const Post = require('models/post');
const Joi = require('joi');

const {ObjectId} = require('mongoose').Types;

exports.checkObjectId = (req, res, next) => {
    const { id } = req.params;

    if(!ObjectId.isValid(id)) {
        return res.status(400);
    }

    return next();
}


// exports.checkLogin = (req, res, next) => {
//     if(!req.session.)
// }
exports.list = async (req, res) => {
    const page = parseInt(req.query.page || 1, 10);
    const { tag } = req.query;

    const query = tag ? {
        tags: tag
    } : {};

    if(page < 1) {
        return res.status(400);
    }

    try{
        const posts = await Post.find(query)
                                .sort({_id: -1})
                                .limit(10)
                                .skip((page - 1) * 10)
                                .lean()
                                .exec();
        const postCount = await Post.count(query).exec();
        const limitBodyLength = post => ({
            ...post,
            body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
        });

        res.set('Last-Page', Math.ceil(postCount / 10));
        res.json(posts.map(limitBodyLength));
    } catch(e){
        console.error(e);
        return res.status(500);
    }
}

exports.read = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const post = await Post.findById(id).exec();
        if(!post) {
            return res.status(404);
        }
        res.json(post);
    } catch(e){
        console.error(e);
        return res.status(500);
    }

}

exports.write = async (req, res) => {

    try {
        await Joi.validate(req.body.title, Joi.string().required());
        await Joi.validate(req.body.body, Joi.string().required());
        await Joi.validate(req.body.cover, Joi.string().required());
        await Joi.validate(req.body.list, Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            track: Joi.string().required()
            })).required());
        await Joi.array().items(Joi.string()).required();
    } catch(e){
        return res.status(400).json({
            error: e
        });
    }

    const { title, body, cover, list, tags } = req.body;


    const post = new Post({
        title,
        body,
        cover,
        list,
        tags
    });


    try {
        await post.save();
        res.json(post);
    } catch(e){
        console.error(e);
        return res.status(500);
    }
    
}

exports.update = async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
            new: true
        }).exec();
        if(!post) {
            return res.status(404);
        }
        res.json(post);
    } catch(e){
        console.error(e);
        return res.status(500);
    }
    
}

exports.remove = async (req, res) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndRemove(id).exec();
        res.status(204);
    } catch(e){
        console.error(e);
        return res.status(500);
    }
}