import {Schema, model} from 'mongoose'

const BossSchema = new Schema (
    {
        turnOrder: {
            type: Number,
            required: [true, 'Turn Order is required']
        },
        bossName: {
            type: String,
            required: [true, 'Boss Type is required']
        },
        typeName: {
            type: String
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

const Boss = model('Boss', BossSchema)
export default Boss