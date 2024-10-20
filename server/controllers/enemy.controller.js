import Enemy from '../models/enemy.model.js'

const EnemyController = {
     //Create
    createEnemy: async (req, res, next) => {
        try{
            const enemy = await Enemy.create(req.body)
            return res.status(200).json(enemy)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Read
    //All
    getAllEnemys: async (req, res, next) => {
        try{
            const allEnemys = await Enemy.find().populate('locationId')
            return res.status(200).json(allEnemys)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //One
    getOneEnemy: async (req, res, next) => {
        try{
            const oneEnemy = await Enemy.findById(req.params.id).populate('locationId')
            return res.status(200).json(oneEnemy)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Update
    updateEnemy: async (req, res, next) => {
        const options = {
            new: true,
            runValidators: true,
        }
        try{
            const enemyId = req.params.id
            const updatedEnemy = await Enemy.findByIdAndUpdate(
                enemyId, 
                {
                    enemyName: req.body.enemyName,
                    health: req.body.health,
                    armorClass: req.body.armorClass,
                    resistance: req.body.resistance,
                    perks: req.body.perks,
                    $set: { locationId: req.body.locationId }
                },
                options
            )
            return res.status(200).json(updatedEnemy)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Delete
    deleteEnemy: async (req, res, next) => {
        try{
            const deletedEnemy = await Enemy.findByIdAndDelete(req.params.id)
            return res.status(200).json(deletedEnemy)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

export default EnemyController