require('dotenv').config()

const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true }, (err) => {
    console.log(err || "Connected to MongoDB.")
})

// Schema
const haikuSchema = new mongoose.Schema({
    title: String,
    body: String
})

const Haiku = mongoose.model('Haiku', haikuSchema)


// API Routes
app.use(express.json())
app.use(logger('dev'))

app.get('/api/haikus', (req, res) => {
    Haiku.find({}, (err ,allTheHaikus) => {
        res.json(allTheHaikus)
    })
})

app.get('/api/haikus/:id', (req, res) => {
    Haiku.findById(req.params.id, (err, thatHaiku) => {
        res.json(thatHaiku)
    })
})

app.post('/api/haikus', (req, res) => {
    Haiku.create(req.body, (err, brandNewHaiku) => {
        res.json({ success: true, message: "Haiku created", payload: brandNewHaiku })
    })
})

app.patch('/api/haikus/:id', (req, res) => {
    Haiku.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedHaiku) => {
        res.json({ success: true, message: "Haiku updated", payload: updatedHaiku })
    })
})

app.delete('/api/haikus/:id', (req, res) => {
    findByIdAndRemove(req.params.id, (err, deletedHaiku) => {
        res.json({ success: true, message: "Haiku deleted", payload: deletedHaiku })
    })
})

// 

app.listen(PORT, err => {
    console.log(err || `Server running on port ${PORT}.`)
})