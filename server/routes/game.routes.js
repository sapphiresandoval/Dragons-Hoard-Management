import {Router} from 'express'
import GameController from '../controllers/game.controller.js'
import authenticate from '../config/jwt.config.js'

const gameRouter = Router()

gameRouter.post('/add', authenticate, GameController.createGame)

gameRouter.get('/', authenticate, GameController.getAllGames)

gameRouter.route('/:id', authenticate)
    .get(GameController.getOneGame)
    .put(GameController.updateGame)
    .delete(GameController.deleteGame)

export default gameRouter;