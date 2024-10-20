import {Schema, model} from 'mongoose'

const LocationSchema = new Schema (
    {
        locationName: {
            type : String, 
            required : [true, 'Game name is required']
        },
        treasureList: {
            type: String
        },
        locationNotes: {
            type: String
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        gameId: {
            type: Schema.Types.ObjectId,
            ref: 'Game',
            required: [true, "Game id is required"]
        }
    },
    {timestamps: true}
)

const Location = model('Location', LocationSchema)
export default Location