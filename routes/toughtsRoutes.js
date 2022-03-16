import express, { Router } from 'express'
const toughtsRoutes = Router()
import ToughtsController from '../controllers/ToughtsController.js'

toughtsRoutes.get('/', ToughtsController.showToughts)

export default toughtsRoutes