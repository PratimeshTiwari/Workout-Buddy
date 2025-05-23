const express = require('express')
const Workout = require('../models/workoutModel')
const {createWorkout,getWorkout,getWorkouts, deleteWorkout, updateWorkout} = require('../controllers/workoutControllers')
//create a express Router instance 
const router = express.Router()



//attach a handler to get all workouts 
router.get('/',getWorkouts)

//get a single workout 
router.get('/:id',getWorkout)

//post a new workout 
router.post('/',createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)

//update a workout 
router.patch('/:id',updateWorkout)

//export the router 
module.exports = router;