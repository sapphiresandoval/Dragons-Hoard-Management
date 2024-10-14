import {Schema, model} from 'mongoose'

const GameSchema = new Schema (
    {
        gameName : {
            type : String, 
            required : [true, 'Game name is required']
        },
        world : {
            type : String
        },
        description : {
            type : String, 
            required : [true, 'Description required'],
            minLength : [5, 'must be at least 5 characters'],
            maxLength : [255, 'must be less than 255 characters']
        },
        //Relationship - Basically like a foreign key
        userId : {
            type : Schema.Types.ObjectId,
            ref : 'User', //the name of the model
            required : [true, 'User Id is required']
        }
    }
)

const Game = model('Game', GameSchema);
export default Game;