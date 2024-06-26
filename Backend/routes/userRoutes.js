const express = require('express')
const User_route = express.Router()
const userController = require('../controllers/userController')
const upload=require('../utils/multer')

User_route
        .post('/verifyLogin' , userController.verifyLogin)
        .post('/register', userController.registerPost)
        .post('/addImg',upload.single('file'),userController.addImage)
        .post('/profileEdit',userController.profileEdit)


module.exports = User_route;