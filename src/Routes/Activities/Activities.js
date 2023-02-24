import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getActivities } from "../../util/API";
import CreateActivities from "./CreateAcvities";
import UpdateActivities from "./UpdateActivity";

const Activities = () => {
  const [activities, setActivites] = useState([]);
  const [token] = useOutletContext();

  useEffect(() => {
    const seeActivities = async () => {
      const response = await getActivities();
      setActivites(response);
      console.log(response, "activities");
    };
    seeActivities();
  }, []);

  return (
    <div className="Activities">
      <h1> Activities </h1>
      {token && (
        <CreateActivities
          activities={activities}
          setActivities={setActivites}
          token={token}
        />
      )}
      <ul>
        {activities.map(({ id, name, description }) => (
          <div key={id} className="activityList">
            <li>
              <h2> Name: {name}</h2>
              <ul>Description: {description} </ul>
              {token && 
                <UpdateActivities
                  activities={activities}
                  setActivities={setActivites}
                  id = {id}
                />
              }
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
