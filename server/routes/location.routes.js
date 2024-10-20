import {Router} from 'express'
import LocationController from '../controllers/location.controller.js'
import authenticate from '../config/jwt.config.js'

const locationRouter = Router()

locationRouter.post('/add', LocationController.createLocation)

locationRouter.get('/', LocationController.getAllLocations)

locationRouter.route('/:id')
    .get(LocationController.getOneLocation)
    .put(LocationController.updateLocation)
    .delete(LocationController.deleteLocation)

export default locationRouter;