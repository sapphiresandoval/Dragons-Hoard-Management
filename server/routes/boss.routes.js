import {Router} from 'express'
import BossController from '../controllers/boss.controller.js'
import authenticate from '../config/jwt.config.js'

const bossRouter = Router()

bossRouter.post('/add', BossController.createBoss)

bossRouter.get('/', BossController.getAllBosss)

bossRouter.route('/:id')
    .get(BossController.getOneBoss)
    .put(BossController.updateBoss)
    .delete(BossController.deleteBoss)

export default bossRouter;