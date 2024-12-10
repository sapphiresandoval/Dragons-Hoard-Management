import Player from '../models/player.model.js'

const PlayerController = {
    //Create
    createPlayer: async (req, res, next) => {
        try{
            const player = await Player.create(req.body)
            return res.status(200).json(player)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Read
    //All
    getAllPlayers: async (req, res, next) => {
        try{
            const allPlayers = await Player.find()
            return res.status(200).json(allPlayers)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //One
    getOnePlayer: async (req, res, next) => {
        try{
            const onePlayer = await Player.findById(req.params.id).populate('gameId')
            return res.status(200).json(onePlayer)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Update
    updatePlayer: async (req, res, next) => {
        const options = {
            new: true,
            runValidators: true,
        }
        try{
            const playerId = req.params.id
            const updatedPlayer = await Player.findByIdAndUpdate(
                playerId, 
                {
                    playerName: req.body.playerName,
                    health: req.body.health,
                    armorClass: req.body.armorClass,
                    resistance: req.body.resistance,
                    perks: req.body.perks,
                    hasDarkvision: req.body.hasDarkvision,
                    $set: { gameId: req.body.gameId }
                },
                options
            )
            return res.status(200).json(updatedPlayer)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Delete
    deletePlayer: async (req, res, next) => {
        try{
            const deletedPlayer = await Player.findByIdAndDelete(req.params.id)
            return res.status(200).json(deletedPlayer)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

export default PlayerController