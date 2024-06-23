const express = require('express')
const User_route = express.Router()
const userController = require('../controllers/userController')

User_route.get('/', userController.loadHome)

module.exports = User_route;