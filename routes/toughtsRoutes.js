import express, { Router } from 'express'
const toughtsRoutes = Router()
import ToughtsController from '../controllers/ToughtsController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

toughtsRoutes.get('/add', authMiddleware, ToughtsController.createTought)
toughtsRoutes.post('/add', authMiddleware, ToughtsController.createToughtPost)
toughtsRoutes.get('/dashboard', authMiddleware, ToughtsController.dashboard)
toughtsRoutes.get('/', ToughtsController.showToughts)

export default toughtsRoutes