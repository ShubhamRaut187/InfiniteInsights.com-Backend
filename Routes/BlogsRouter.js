const {Router} = require('express');
const {Blogmodel} = require('../DataModels/Blogs.model');

// Middlewares
const {Authenticate} = require('../Middlewares/Authenticate');
const {Authorise} = require('../Middlewares/Authorise')

const BlogRouter = Router();

BlogRouter.post('/v1/create',Authenticate,async(req,res)=>{
    const {Title,SubTitle,Author,AuthorAvatar,AuthorID,Date,Day,ContentOne,ContentTwo,Category,Likes,Images} = req.body;

    try {
        const New_Blog = new Blogmodel({
            Title,
            SubTitle,
            Author,
            AuthorAvatar,
            AuthorID,
            Date,
            Day,
            ContentOne,
            ContentTwo,
            Category,
            Likes,
            Images
        })
        await New_Blog.save();
        res.status(201).send({'Message':'Blog published successfully...!','Bleg':New_Blog});
    } catch (error) {
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})
    }
})

// Get Blogs

BlogRouter.get('/v1/',Authenticate,async(req,res)=>{
    try {
        const Blogs = await Blogmodel.find({});
        res.status(200).send({'Message':'Here are all blogs.','Blogs':Blogs});
    } catch (error) {
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})
    }
})

BlogRouter.get('/v1/all/:id',Authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const blogs = await Blogmodel.find({AuthorID:id});
        res.status(200).send({'Message':'Here are your blogs.','Blogs':blogs});
    } catch (error) {
        console.log(error);
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})   
    }
})

BlogRouter.get('/v1/:id',Authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Blog = await Blogmodel.findOne({_id:id});
        res.status(200).send({'Message':'Here is your blog.','Blog':Blog});
    } catch (error) {
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error}) 
    }
})


// Update BLogs.

BlogRouter.patch('/v1/update/:id',Authenticate,Authorise,async(req,res)=>{
    const {id} = req.params;
    const Data = req.body;
    try {
        const UpdatedBlog = await Blogmodel.findOneAndUpdate({_id:id},Data,{new:true});
        res.status(200).send({'Message':'Blog updated successfully...!','Blog':UpdatedBlog});
    } catch (error) {
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error}) 
    }
})

// Delete Blog

BlogRouter.delete('/v1/delete/:id',Authenticate,Authorise,async(req,res)=>{
    const {id} = req.params;
    try {
        const Deleted = await Blogmodel.findOneAndDelete({_id:id});
        res.status(200).send({'Message':'Blog Deleted Successfully...!','Blog':Deleted});
    } catch (error) {
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error}) 
    }
})

module.exports = {
    BlogRouter
}