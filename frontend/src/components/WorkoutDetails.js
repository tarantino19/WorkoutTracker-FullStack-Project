import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useState} from 'react'
//the workout here is the one from Home that we use now as props
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function WorkoutDetails ({workout}) {

      const [done, setDone] = useState (false)

    const {dispatch} = useWorkoutsContext ()

  const handleDelete = async () => {
        const response = await fetch ('/api/workouts/' + workout._id, {
              method: 'DELETE'
        } )
        const json = await response.json ()

        if (response.ok) {
              dispatch ({
                type: 'DELETE_WORKOUT', payload: json
              })
        }
  }

  const handleDone = () => {
            setDone (true)
  }
    
  return (
    <div className="workout-details">
    <h4>
    {done? <s>{workout.title}</s> : <div>{workout.title}</div> } 
    </h4>
    <p><strong>Load (kg):</strong> {workout.load}</p>
    <p><strong>Reps: :</strong> {workout.reps}</p>
    <p>added {formatDistanceToNow(new Date (workout.createdAt), {addSuffix: true})}</p>
    <span className='done' onClick={handleDone}>finished</span>
    <span className="material-symbols-outlined"onClick={handleDelete}>delete</span>
    </div>)
}

export default WorkoutDetails;