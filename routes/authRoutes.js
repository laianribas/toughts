import express, { Router } from 'express'
const authRoutes = Router()
import AuthController from '../controllers/AuthController.js'

authRoutes.get('/login', AuthController.login)
authRoutes.post('/login', AuthController.loginPost)
authRoutes.get('/logout', AuthController.logout)
authRoutes.get('/register', AuthController.register)
authRoutes.post('/register', AuthController.registerPost)

export default authRoutes