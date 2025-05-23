import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {

    //context hooks returns value of WorkoutContext
    const context = useContext(WorkoutContext)

    if(!context) throw Error('useWorkoutContext must be used inside an  WorkoutsContextProvider')
    return context
}