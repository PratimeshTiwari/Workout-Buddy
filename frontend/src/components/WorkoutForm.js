import {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = ()=>{
    
    const {dispatch} = useWorkoutsContext()

    //create a local state 
    const [title,setTitle] = useState('') //assign empty string as default value
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)

    const handleSubmit = async(e) =>{ //e = event object
        e.preventDefault() //default action = refresh page on form submission

        //dummy workout object to send as the body of the request 
        const workout = {title,load,reps}

        //fetch api to send post request //args = path,object with options 
        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout), //parses workout object into json string
            headers: {//to define content type is json
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json();
        if(!response.ok){
            setError(json.error)
        }
        else{
            //reset form on successful form submission
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log("New Workout Added",json)
            dispatch({type : 'CREATE_WORKOUT',payload : json})
        }
    }

    return (
        <form className='create' onSubmit = {handleSubmit}>
            <h3>Add a new workout</h3>
            <lable>Exercise Title:</lable>
            <input
                type = "text"
                onChange={(events)=>setTitle(events.target.value)}
                //setting up two way data binding
                value={title}
            />

            <lable>Load (in kg) :</lable>
            <input
                type = "number"
                onChange={(events)=>setLoad(events.target.value)}
                //setting up two way data binding
                value={load}
            />

            <lable>Reps :</lable>
            <input
                type = "number"
                onChange={(events)=>setReps(events.target.value)}
                //setting up two way data binding
                value={reps}
            />

            <button>Add Workout</button>
            {/* see error if there is one */}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm