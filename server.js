require('dotenv').config()
require('./config/database')


const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')


//MODELS
const Plant = require('./models/plant.js')
const app = express()


//MIDDLEWARE
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))


// ROUTES
app.get("/", async (req, res) => {
    res.render("index.ejs")
})

app.get("/plants", async (req, res) => {
    const allPlants = await Plant.find()
    res.render('plants/index.ejs', { plants: allPlants})
})

app.get('/plants/new', (req, res) => {
    res.render('plants/new.ejs')
})

app.get('/plants/:plantId', async (req, res) => {
    const fountPlant = await Plant.findById(req.params.plantId)
    res.render('plants/show.ejs', { plant: fountPlant})
})

app.get('/plants/:plantId/edit', async(req, res) => {
    const foundPlant = await Plant.findById(req.params.plantId)
    res.render('plants/edit.ejs', { plant: foundPlant})
})

app.delete('/plants/:plantsId', async (req, res) => {
    await Plant.findByIdAndDelete(req.params.plantsId)
    res.redirect('/plants')
})

app.post('/plants', async (req, res) => {
    if (req.body.isSave === 'on'){
        req.body.isSave = true
    } else {
        req.body.isSave = false
    }
    await Plant.create(req.body)
    res.redirect('/plants')
})

app.put('/plants/:plantId', async (req, res) => {
    if (req.body.isSave === 'on'){
        req.body.isSave = true
    } else {
        req.body.isSave = false
    }
    await Plant.findByIdAndUpdate(req.params.plantId, req.body)
    res.redirect(`/plants/${req.params.plantId}`)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})