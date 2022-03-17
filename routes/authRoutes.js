import express, { Router } from 'express'
const authRoutes = Router()
import AuthController from '../controllers/AuthController.js'

authRoutes.get('/login', AuthController.login)
authRoutes.get('/register', AuthController.register)

export default authRoutes