import Location from '../models/location.model.js'

const LocationController = {
      //Create
    createLocation: async (req, res, next) => {
        try{
            const location = await Location.create(req.body)
            return res.status(200).json(location)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Read
    //All
    getAllLocations: async (req, res, next) => {
        try{
            const allLocations = await Location.find()
            return res.status(200).json(allLocations)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //One
    getOneLocation: async (req, res, next) => {
        try{
            const oneLocation = await Location.findById(req.params.id).populate('gameId')
            return res.status(200).json(oneLocation)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Update
    updateLocation: async (req, res, next) => {
        const options = {
            new: true,
            runValidators: true,
        }
        try{
            const locationId = req.params.id
            const updatedLocation = await Location.findByIdAndUpdate(
                locationId, 
                {
                    locationName: req.body.locationName,
                    treasureList: req.body.treasureList,
                    locationNotes: req.body.locationNotes,
                    isCompleted: req.body.isCompleted,
                    $set: { gameId: req.body.gameId }
                },
                options
            )
            return res.status(200).json(updatedLocation)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    //Delete
    deleteLocation: async (req, res, next) => {
        try{
            const deletedLocation = await Location.findByIdAndDelete(req.params.id)
            return res.status(200).json(deleteLocation)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

export default LocationController