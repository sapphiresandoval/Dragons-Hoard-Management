import Boss from '../models/boss.model.js'

const BossController = {
      //Create
    createBoss: async (req, res, next) => {
        try{
            const boss = await Boss.create(req.body)
            return res.status(200).json(boss)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Read
    //All
    getAllBosss: async (req, res, next) => {
        try{
            const allBosss = await Boss.find().populate('locationId')
            return res.status(200).json(allBosss)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //One
    getOneBoss: async (req, res, next) => {
        try{
            const oneBoss = await Boss.findById(req.params.id).populate('locationId')
            return res.status(200).json(oneBoss)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Update
    updateBoss: async (req, res, next) => {
        const options = {
            new: true,
            runValidators: true,
        }
        try{
            const bossId = req.params.id
            const updatedBoss = await Boss.findByIdAndUpdate(
                bossId, 
                {
                    bossName: req.body.bossName,
                    health: req.body.health,
                    armorClass: req.body.armorClass,
                    resistance: req.body.resistance,
                    perks: req.body.perks,
                    hasDarkvision: req.body.hasDarkvision,
                    $set: { gameId: req.body.gameId }
                },
                options
            )
            return res.status(200).json(updatedBoss)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Delete
    deleteBoss: async (req, res, next) => {
        try{
            const deletedBoss = await Boss.findByIdAndDelete(req.params.id)
            return res.status(200).json(deletedBoss)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

export default BossController