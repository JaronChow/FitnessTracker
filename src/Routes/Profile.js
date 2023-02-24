import { useEffect, useState} from 'react';
import { useOutletContext } from "react-router-dom";
import { getRoutinesByUser } from '../util/API';
import CreateRoutines from './Routines/CreateRoutines';
import DeleteRoutine from './Routines/DeleteRoutine';
import UpdateRoutine from './Routines/UpdateRoutine';
import jwt_decode from 'jwt-decode'

const UserRoutines = ({setRoutines}) => {
    const [userRoutines, setUserRoutines] = useState([])
    const [token] = useOutletContext();
    const { username } = jwt_decode(token)

    useEffect(() => {
        getUserRoutines();
      });

      const getUserRoutines = async () => {
        const routines = await getRoutinesByUser(username);
        setUserRoutines(routines);
            console.log(routines,username,userRoutines, 'username')
        };

    return(
        <div>
        {token && <CreateRoutines getUserRoutines = {getUserRoutines} />}
       <ul>
            {userRoutines.map(({ id, name, goal, creatorName, activities}) => (
                <div key={id} >   
                    <li className='routineList'>
                        <h2>Routine Name: { name }</h2>
                        <h3> Routine Creator: { creatorName }</h3>
                            <ul>Goal: { goal }</ul>
                        <ul>
                            <h2>Activities List</h2>
                                {activities.map (({id,name,description,duration,count})=> (
                                    <div key={id}>                            
                                    <li>
                                        <ul>Name: { name } </ul>
                                        <ul>Description: { description } </ul>
                                        <ul>Duration: { duration } </ul>
                                        <ul>Count: { count } </ul>
                                    </li>
                                    </div>
                                ))}
                        </ul>
                    </li>
                    <div>
                    <UpdateRoutine getUserRoutines = {getUserRoutines} userRoutines ={userRoutines} setUserRoutines ={setUserRoutines} id={id}   />
                    </div>
                    <DeleteRoutine getUserRoutines = {getUserRoutines} setRoutines = {setRoutines} userRoutines ={userRoutines} setUserRoutines ={setUserRoutines} id={id} />
                </div>
            ))}
        </ul>       
        </div>
    )
}


export default UserRoutines;