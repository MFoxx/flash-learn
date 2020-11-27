import mongoose from 'mongoose';
import {nanoid} from 'nanoid';


const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    _id: {
        type: String,
        default: () => nanoid(6)
      }, 
    decks: [
        {
            _id: {
                type: String,
                default: () => nanoid(5)
            },
            name: String,
            cards: [
                {
                    question: String,
                    explanation: String,
                    _id: {
                        type: String,
                        default: () => nanoid(5)
                    }
                }
            ]
        }
    ],
    log: [{
        date: Date,
        event: String
    }]
})

const userModel = mongoose.model('Users', userSchema)

export = userModel;