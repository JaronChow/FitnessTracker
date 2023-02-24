import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllRoutines, addActivityToRoutine } from "../../util/API";
import { isLoggedIn } from "../../util/API";
import jwt_decode from "jwt-decode";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token] = useOutletContext();

  useEffect(() => {
    const seeRoutines = async () => {
      const response = await getAllRoutines();
      setRoutines(response);
      console.log(response, "routines");
    };
    const seeId = async (token) => {
      const response = await isLoggedIn(token);
    };
    if (token) {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken.username);
      seeId(token);
    }
    seeRoutines();
  }, [username, token]);

  const attachActivity = async (event, routineId) => {
    console.log(routineId);
    event.preventDefault();
    const routineActivity = {
      activityId,
      count,
      duration,
    };
    const response = await addActivityToRoutine(
      routineId.id,
      token,
      routineActivity
    );
    console.log(response);
    if (!duration || !count) {
      setErrorMessage("Please enter all fields");
    } else {
      setErrorMessage("");
      setRoutines([...routines, response]);
    }
    setCount("");
    setDuration("");
  };

  return (
    <div className="Routines">
      <h1> Routines </h1>
      <ul>
        {routines.map(({ id, name, goal, creatorName, activities }) => (
          <div className = "routine-item" key={id}>
            <li>
              <h2>Routine Name: {name}</h2>
              <h3> Routine Creator: {creatorName}</h3>
              <ul>Goal: {goal}</ul>
              <ul className="routine-activities-box">
                <h2 >Activities List</h2> 
                {activities.map(
                  ({ id, name, description, duration, count }) => (
                    <div key= {id}>
                      <li className="routine-list">
                        <ul>Activity Name: {name} </ul>
                        <ul>
                          Description: {description}
                        </ul>
                        <ul>Duration: {duration} </ul>
                        <ul>Count: {count} </ul>
                      </li>
                    </div>
                  )
                )}
              </ul>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Routines;
