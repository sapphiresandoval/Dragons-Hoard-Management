import {Router} from 'express'
import PlayerController from '../controllers/player.controller.js'
import authenticate from '../config/jwt.config.js'

const playerRouter = Router()

playerRouter.post('/add', PlayerController.createPlayer)

playerRouter.get('/', PlayerController.getAllPlayers)

playerRouter.route('/:id')
    .get(PlayerController.getOnePlayer)
    .put(PlayerController.updatePlayer)
    .delete(PlayerController.deletePlayer)

export default playerRouter;