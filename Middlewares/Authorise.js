const jwt = require('jsonwebtoken')
const {Blogmodel} = require('../DataModels/Blogs.model')

const Authorise = async(req,res,next)=>{
    const {id} = req.params;
    const Token = req.headers.authorization.split(' ')[1];
    try {
        const Blog = await Blogmodel.findOne({_id:id});
        const AuthorID = Blog.AuthorID;
        jwt.verify(Token,'UserToken',async(error,decoded)=>{
            const {UserID} = decoded;
            if(UserID === AuthorID){
                // console.log(UserID,AuthorID);
                next();
            }
            else{
                res.status(401).send({'Message':'You are not authorized to update and delete this blog.'});
            }
        })
    } catch (error) {
        req.status(401).send({'Message':'Invalid token or blog. Please login again.'});
    }
}

module.exports = {
    Authorise
}