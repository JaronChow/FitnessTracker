import { useEffect, useState } from "react";
import { getRoutines } from "../../util/API";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    getAllRoutines();

  }, []);

  const getAllRoutines = async () => {
    const response = await getRoutines();
    setRoutines(response);
    console.log(response, "routines");
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
