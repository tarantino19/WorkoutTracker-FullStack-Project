import {useEffect, useState}  from 'react'

//components
import WorkoutDetails from '../components/WorkoutDetails'

function Home (){
    const [workouts, setWorkouts] = useState (null)

    useEffect (() => {
          const fetchWorkouts = async () => {
              const response = await fetch ('/api/workouts')
              const json = await response.json () 
              if (response.ok) {
                setWorkouts (json)
              }
          }
          fetchWorkouts ()
    }, [ ])


    return (<div>
          <div className="Home">
              <div className='workouts'>
                  {workouts && workouts.map ((workout) => {
                    return (
                      <WorkoutDetails  key={workout._id} workout={workout}  />
                    )
                  })}
              </div>
          </div>
      </div>)
}

//if workouts is true, then render workouts

export default Home;