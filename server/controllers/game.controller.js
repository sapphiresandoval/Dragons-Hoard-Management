import Game from '../models/game.model.js'
import jwt from 'jsonwebtoken'

const GameController = {
    //Create
    createGame : async (req, res, next) => {
        try{
            const decodedToken = jwt.decode(req.cookies.userToken, {complete: true})
            console.log(decodedToken)
            const userId = decodedToken.payload.userId
            const newGame = {... req.body, userId}
            const game = await Game.create(req.body)
            return res.status(201).json(game)
        }catch(error){
            console.log(error)
            next(error)
        }
    },

    //Read
    //All
    getAllGames : async (req, res, next) => {
        try{
            const allGames = await Game.find().populate('userId')
            return res.status(200).json(allGames)
        }catch(error){
            console.log(error)
            next(error)
        }
    },

    //One
    getOneGame : async (req, res, next) => {
        try{
            const oneGame = await Game.findById(req.params.id).populate('userId')
            return res.status(200).json(oneGame)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Update
    updateGame : async (req, res, next) => {
        const options = {
            new: true,
            runValidators: true,
        }
        try{
            const gameId = req.params.id
            const updatedGame = await Game.findByIdAndUpdate(
                gameId, 
                {
                    gameName: req.body.gameName,
                    world: req.body.world,
                    description: req.body.description,
                    $set: {userId : req.body.userId}
                },
                options)
            return res.status(202).json(updatedGame)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Delete
    deleteGame : async (req, res, next) => {
        try{
            const deletedGame = await Game.findByIdAndDelete(req.params.id)
            return res.status(200).json(deletedGame)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

export default GameController;