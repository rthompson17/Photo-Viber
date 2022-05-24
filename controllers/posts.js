const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3();

module.exports = {
    create,
    index
}

function create(req, res){
    console.log(req.file, req.body, 'here is the create method!', req.user, '<-- this is req.user')
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
            console.log(err, ' this is from aws')
            console.log(data, ' this is from aws')
            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});
            console.log(post)

            await post.populate('user');

            res.status(201).json({post: post})
        })

    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function index(req, res) {
	try {
	  // this populates the user when you find the posts
	  // so you'll have access to the users information
	  // when you fetch teh posts
	  const posts = await Post.find({}).populate("user").exec();
	  res.status(200).json({ posts: posts });
	} catch (err) {
	  res.status(400).json({ err });
	}
  }