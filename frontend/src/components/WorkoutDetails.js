

//the workout here is the one from Home that we use now as props

function WorkoutDetails ({workout}) {
    
  return (<div className="workout-details">
    <h4>{workout.title}</h4>
    <p><strong>Load (kg):</strong> {workout.load}</p>
    <p><strong>Reps: :</strong> {workout.reps}</p>
    <p>{workout.createdAt}</p>
    </div>)
}

export default WorkoutDetails;