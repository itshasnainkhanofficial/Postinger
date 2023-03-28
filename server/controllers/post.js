import Post from '../model/Post.js'
import User from '../model/User.js'

// desc     Get All Posts
// route    GET /api/post
// access   public
export const getAllPosts = async (req, res, next) => {
    try {
        const post = await Post.find()

        res.status(200).json(post)

    } catch (error) {
        return next(error)
    }
}


// desc     Get All Posts of a specific user
// route    GET /api/post/postBySpecificUser
// access   Private
export const getSpecificUserPosts = async (req, res, next) => {

    try {

        const posts = await Post.find({user: req.user.id })

        res.status(200).json(posts)

    } catch (error) {
        return next(error)
    }
}


// desc     Add Post
// route    POST /api/post
// access   Private - Loggedin Users
export const addPost = async (req, res, next) => {
  try {
    const {id} = req.user

    if (!req.body.PostTitle) { // additional custom condition
        res.status(400)
        throw new Error('Please add a Post Title')
      }
    
      const post = await Post.create({
        user: id,
        PostTitle: req.body.PostTitle,
        PostContent: req.body.PostContent,
      })
    
      res.status(200).json(post)

  } catch (error) {
    return next(error)
  }
}

// desc     Update Post
// route    PATCH /api/post
// access   Private - Loggedin Users
export const updatePost = async (req, res, next) => {
    try {

        const {id} = req.params;
        const post = await Post.findById(id)
        if(!post){
            res.status(400)
            throw new Error('Post not found')
        }

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(400)
            throw new Error("User not found")
        }

        if(post.user.toString() !== user.id){
            res.status(401)
            throw new Error("User not authorized")
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new : true})

        res.status(200).json(updatedPost)


    } catch (error) {
      return next(error)
    }
}


// desc     Delete Post
// route    DELETE /api/post
// access   Private - Loggedin Users
export const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id)

        if(!post){
            res.status(400)
            throw new Error('Post not found')
        }

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(400)
            throw new Error("User not found")
        }

        if(post.user.toString() !== user.id){
            res.status(401)
            throw new Error("User not authorized")
        }
        
        await Post.findByIdAndRemove(id)
        res.status(200).json(`The post having id ${id} has been deleted`) 

    } catch (error) {
        return next(error)
    }
}








// simplified controllers

// // desc     Get All Posts
// // route    GET /api/post
// // access   public
// export const getAllPosts = (req, res) => {
//     res.status(200).json({Message: "getAllPosts working fine"})
// }


// // desc     Add Post
// // route    POST /api/post
// // access   Private - Loggedin Users
// export const addPost = (req, res) => {
//     res.status(200).json({Message: "addPost working fine"})
// }

// // desc     Update Post
// // route    PATCH /api/post
// // access   Private - Loggedin Users
// export const updatePost = (req, res) => {
//     console.log(`req ${req.params}`)
//     res.status(200).json({Message: "updatePost working fine", id : req.params.id})
// }


// // desc     Delete Post
// // route    DELETE /api/post
// // access   Private - Loggedin Users
// export const deletePost = (req, res) => {
//     res.status(200).json({Message: "deletePost working fine", id : req.params.id})
// }