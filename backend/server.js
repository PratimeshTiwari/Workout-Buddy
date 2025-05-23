require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

//import routers from workouts.js 
const workoutRoutes = require('./routes/workouts') //no need to specify extension here


//launching the express app. 
const app = express()

//register a global middleware 
app.use((request,response,next)=>{
    console.log(request.path,request.method) //logging get/post request
    next()
})


//middleware : 
app.use(express.json()) //check for data in the server for each req received 
                        //and if data is there then it attaches it to the request object
                        //so that we can access it in the request handler 

//Example to setup route 
//react to request -> setup a route handler 
// app.get('/',(request,response)=>{
//     response.json({mssg : 'Welcome to the app'})
// })

//using/invoking routes on express app (all of the routes)
app.use('/api/workouts',workoutRoutes)

//connect to db 
mongoose.connect(process.env.MONGO_URI) //this is async process ...hence returns promise
.then(()=>{
    //listen to request 
    console.log('Connected to DB')
    startServer();
}) //if success 
.catch((error)=>{  //if fails 
    console.log(error)
})
//listening for request on a port 
function startServer(){
    app.listen(process.env.PORT,()=>{
        console.log("Listening on port 4000 !!!")
    })
}

