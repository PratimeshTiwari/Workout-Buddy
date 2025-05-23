//react component for the home page
import { useEffect,} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
//components 
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

    //no longer need this useState hook since workoutContext hook is used with reducer function
    //local state if response is not okay
    // const [workouts,setWorkouts] = useState(null)

    const {workouts,dispatch} = useWorkoutsContext()

    //fetching workouts from the backend 
    useEffect(()=>{
        const fetchWorkouts = async(req,res)=>{
            const response = await fetch('/api/workouts') //since react will not recognize this in internal server , it will proxy it to the given address 
            const json = await response.json() //gives array of workout objects

            //check is response is okay
            if(response.ok){

                //no longer needed after workoutContext hook
                //update local state and pass data from json
                // setWorkouts(json)

                dispatch({type : 'SET_WORKOUTS',payload : json})
            }
        }
        fetchWorkouts()
    },[dispatch]) // Include dispatch in the dependency array

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    // return <p key={workout._id}>{workout.title}</p>
                    //passing workout as a prop to workout 
                    return <WorkoutDetails key={workout._id} workout={workout}/>
                })}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home