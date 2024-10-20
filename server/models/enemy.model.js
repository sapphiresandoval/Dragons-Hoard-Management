import {Schema, model} from 'mongoose'

const EnemySchema = new Schema (
    {
        turnOrder: {
            type: Number,
            required: [true, 'Turn Order is required']
        },
        enemyName: {
            type: String,
            required: [true, 'Enemy Type is required']
        },
        health: {
            type: Number,
            required: [true, 'Health is required']
        },
        armorClass: {
            type: Number,
            required: [true, 'Armor class is required'],
            min: [1, 'cannot be below one']
        }, 
        perks: {
            type: String,
        },
        resictance: {
            type: String
        }, 
        locationId: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
            required: [true, 'Location ID is required']
        }
    },
    {timestamps: true}
)

const Enemy = model('Enemy', EnemySchema)
export default Enemy