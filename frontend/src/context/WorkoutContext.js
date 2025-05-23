import  {createContext, useReducer} from 'react'

//create and export a context function and invoke it 
export const WorkoutContext = createContext()

//provide context to application component tree so that out component can access it
//this is done by making a context provider component and this is a regular
//react component that's going to wrap the rest of application 

//action = dispatch
export const workoutsReducer = (state,action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts : action.payload //payload = array of workouts 
            }
        case 'CREATE_WORKOUT':
            return{
                workouts : [action.payload,...state.workouts] //[newWorkout,addingExistingWorkout]
            }
       case 'DELETE_WORKOUT':
        return{
            workouts: state.workouts.filter((w)=>w._id!==action.payload._id)
        }
        default : return state  
    }
}

//WorkoutsContextProvider returns the actual provider of the context created
export const WorkoutsContextProvider = ({children}) => {

    //reducer hook //args = reducer function , initial value for states
    const [state,dispatch] = useReducer(workoutsReducer,{
        workouts: null
    })

    //example for dispatch function
    //args : 1) type :  workout api type endpoint (i.e describe state event), 
    //       2) payload : any data we need to make this change
    //dispatch({type : 'SET_WORKOUTS',payload : [{},{}]})
    //calling dispatch function invokes reducer function (workoutReducer) so that 
    // can update the state using that information and data

    return(
        // component given by created context (workout context in this case)
        <WorkoutContext.Provider value={{...state,dispatch}}> 
            {/* here chilren property wraps the root app component in index.js */}
            {/* meaning all components will have access to workout context */}
            {children} 
        </WorkoutContext.Provider>
    )
}