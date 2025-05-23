const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')



//get all workouts 
const getWorkouts = async(req,res) => {
    //use the Workout Model to fetch the data
    const workouts = await Workout.find({}).sort({createdAt: -1}) //sort by descending/newest documents
    res.status(200).json(workouts)
}


//get a single workout 
const getWorkout = async(req,res) =>{
    const {id} = req.params //grabbing the id from the route paramaters

    //if id is not of supported format (mongoose format)
    //valid object id - string of 12 bytes or string of 24 hex characters
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout found ! Invalid Id format'})
    }

    const workout = await Workout.findById(id)

    //if workout not found
    if(!workout){
        return res.status(404).json({error : 'No such workout found'})
    }
    res.status(200).json(workout)
}


//create new workout 
const createWorkout = async(req,res) =>{
    const {title,load,reps} = req.body
    //add a new document to the Workout Collection 
    try{
        //workout.create = async = promise
        const workout = await Workout.create({title,load,reps})  
        //send a response 
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//delete a workout 
const deleteWorkout = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout found ! Invalid Id format'})
    }

    const workout = await Workout.findOneAndDelete({_id: id}) 
    if(!workout){
        return res.status(404).json({error : 'No such workout found'})
    }
    res.status(200).json(workout)
}


//update a workout 
const updateWorkout = async(req,res) => {
    const {id} = req.params //extract id from object

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout found ! Invalid Id format'})
    }

    //parameters : {required id},{object to update}
    const workout = await Workout.findOneAndUpdate({_id : id},{
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error : 'No such workout found'})
    }
    res.status(200).json(workout)
}


//export function
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}



