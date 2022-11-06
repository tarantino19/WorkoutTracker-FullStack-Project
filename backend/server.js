const express = require ('express')
const { default: mongoose } = require('mongoose')
const app = express ()
require ('dotenv').config ()
const workoutRoutes = require ('./routes/workout')


//MIDDLEWARE
//express json for the body
app.use (express.json ())


//logger
app.use ((req, res, next) => {
  console.log(req.path, req.method);
  next ()
})

//ROUTES
app.use ('/api/workouts' ,workoutRoutes) //grabs all the routes and uses it in the app  - for the link ... only fire the   / in the workout if it has /api/workouts as the route

//connect to db
mongoose.connect (process.env.MONGO_URI)
    .then (( ) => {
      app.listen (process.env.PORT, () => {
        console.log(`connected to db...listening on port`, process.env.PORT);
      })      
    })
    .catch ((error) => {
      console.log(error);
    })








