import express, { Router } from 'express'
const toughtsRoutes = Router()
import ToughtsController from '../controllers/ToughtsController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

toughtsRoutes.get('/add', authMiddleware, ToughtsController.createTought)
toughtsRoutes.post('/add', authMiddleware, ToughtsController.createToughtPost)
toughtsRoutes.get('/edit/:id', authMiddleware, ToughtsController.updateTought)
toughtsRoutes.post('/edit/', authMiddleware, ToughtsController.updateToughtSave)
toughtsRoutes.get('/dashboard', authMiddleware, ToughtsController.dashboard)
toughtsRoutes.post('/remove', authMiddleware, ToughtsController.removeTought)
toughtsRoutes.get('/', ToughtsController.showToughts)

export default toughtsRoutes