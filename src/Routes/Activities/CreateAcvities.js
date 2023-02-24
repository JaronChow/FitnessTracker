import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { postActivities } from "../../util/API";

const CreateActivities = ({ activities, setActivities }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token] = useOutletContext();

  async function submitForm(event) {
    event.preventDefault();
    const activity = {
      name,
      description,
    };

    const response = await postActivities(token, activity);
    console.log(response, "response");
    setName("");
    setDescription("");

    if (!name || !description) {
      setErrorMessage("Please enter all fields");
    } else if (response.error) {
      setErrorMessage(
        ` An activity with the name "${name}" already exists. Please enter a new activity name`
      );
    } else {
      setErrorMessage("New activity added");
      setActivities([...activities, response]);
    }
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Activity Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Activity Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit" onChange={(event) => event.target.value}>
          Create Activity
        </button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};

export default CreateActivities;
