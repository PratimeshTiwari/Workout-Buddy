const mongoose = require('mongoose')

//create a function to create new schema
const Schema = mongoose.Schema

//create new schema
const workoutSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    reps : {
        type : Number,
        required : true
    },
    load : {
        type : Number,
        required : true
    }
} , {timestamps : true})

//export model   //create a new model by mongoose.model(model,schema)
module.exports = mongoose.model('Workout',workoutSchema) //create a Workout collection in the db 
