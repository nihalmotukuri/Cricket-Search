import { Schema, model } from "mongoose";

const playerSchema = new Schema({
    name: String,
    jersey_number: Number,
    runs_scored: Number,
    nationality: String,
    active: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Player = model("player", playerSchema)

export default Player