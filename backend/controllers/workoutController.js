const Workout = require ('../models/workoutModel')
const mongoose = require ('mongoose')
//self note: Workout with capital W came from the mongoose model

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find ({ }).sort ({createdAt: -1}) //descending order from newest one at the top
  res.status (200).json (workouts)
}


//get a single workout
const getWorkout = async (req, res) => {

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Workout does not exist'})
  }

  const workout = await Workout.findById(id)
  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}



//create new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body
  try {
    //adds doc to db
      const workout = await Workout.create ( {title, load, reps} ) 
      res.status (200.).json (workout) 
  } catch (error) {
      res.status (400).json ({error: error.message})
  }
}


//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Workout does not exist'})
    }
  
  const workout = await Workout.findOneAndDelete ({_id: id}) //mongoose _id:id

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status (200).json (workout)

}


//update a workout

const updateWorkout = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Workout does not exist'})
  }

  const workout = await Workout.findOneAndUpdate ({_id: id }, {
        ...req.body //this spreads the new object with title, load, reps inside
    })
      //we work w/ req.body this time around for the patch
      //2 arguments,  the mongoose id we want to update and the new property that represents the updated one

    if (!workout) {
      return res.status(404).json({error: 'No such workout'})
    }

      res.status(200).json (workout)
}





module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
}