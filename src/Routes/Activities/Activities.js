import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getActivities } from "../../util/API";
import CreateActivities from "./CreateAcvities";
import UpdateActivities from "./UpdateActivity";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [token] = useOutletContext();

  useEffect(() => {
    getAllActivities();
  }, []);

  const getAllActivities = async () => {
    const response = await getActivities();
    setActivities(response);
    console.log(response)

  };  
  
  return (
    <div className="Activities">
      <h1> Activities </h1>
      {token && (
        <CreateActivities
          activities={activities}
          setActivities={setActivities}
          token={token}
        />
      )}
      <div>
        {activities.map(({ id, name, description }) => (
          <div key = {id} className="activityList">
            <li>
              <h2> Name: {name}</h2>
              <ul>Description: {description} </ul>
              {token && 
                <UpdateActivities
                  activities={activities}
                  getAllActivities ={getAllActivities}
                  id = {id}
                />
              }
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
