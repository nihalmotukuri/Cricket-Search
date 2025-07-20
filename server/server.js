import Player from './player.model.js'
import Express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = Express()
app.use(Express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "HI BULLE!!" })
})

app.get('/players', async (req, res) => {
    try {
        const players = await Player.find({})
        res.json(players)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get('/players/:player_name', async (req, res) => {
    const playerName = req.params.player_name
    
    try {
        const playerInfo = await Player.findOne({ name: playerName })
        res.json(playerInfo)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.post('/add_player', async (req, res) => {
    const player = req.body

    try {
        const newPlayer = new Player(player)
        const savedPlayer = await newPlayer.save()
        res.json(savedPlayer)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://nihalmotukuri:xCT0jcbmMjslardV@cluster0.gducujb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log('server is running on port 3000')
        })
    } catch (err) {
        console.error(err)
    }
}

dbConnection()