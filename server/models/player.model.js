import {Schema, model} from 'mongoose'

const PlayerSchema = new Schema (
    {
        playerName: {
            type: String,
            required: [true, "Player Name is Required"]
        },
        health: {
            type: Number,
            required: [true, "Health is required"],
            min: [1, "cannot have less than 1 health"]
        },
        armorClass: {
            type: Number,
            required: [true, 'Armor Class is required'],
            min: [1, "Must be atleast 1"]
        },
        resistance: {
            type: String
        },
        perks: {
            type: String
        },
        hasDarkvision: {
            type: Boolean,
            default: false
        },
        gameId: {
            type: Schema.Types.ObjectId,
            ref: 'Game',
            required: [true, 'Game id is required']
        }
    },
    {timestamps: true}
)

const Player = model('Player', PlayerSchema)
export default Player