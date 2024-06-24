const express = require('express')
const User_route = express.Router()
const userController = require('../controllers/userController')

User_route.post('/verifyLogin' , userController.verifyLogin)

module.exports = User_route;