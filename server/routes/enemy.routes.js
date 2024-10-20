import {Router} from 'express'
import EnemyController from '../controllers/enemy.controller.js'
import authenticate from '../config/jwt.config.js'

const enemyRouter = Router()

enemyRouter.post('/add', EnemyController.createEnemy)

enemyRouter.get('/', EnemyController.getAllEnemys)

enemyRouter.route('/:id')
    .get(EnemyController.getOneEnemy)
    .put(EnemyController.updateEnemy)
    .delete(EnemyController.deleteEnemy)

export default enemyRouter;