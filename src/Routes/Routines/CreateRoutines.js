import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { postRoutines } from "../../util/API";

const CreateRoutines = ({ routines, setRoutines, userRoutines,setUserRoutines }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [token] = useOutletContext();

  async function submitForm(event) {
    event.preventDefault();

    const routine = { name, goal, isPublic };
    if (!name || !goal) {
      setErrorMessage("Please enter all fields");
    }
    const response = await postRoutines(token, routine);
    response.activities = [];
    console.log(routine, response, "routine");
    if (response.error) {
      setErrorMessage(
        `A routine with the name "${name}" already exists. Please enter a new routine name`
      );
    } else {
      setErrorMessage("");
      setRoutines([...routines, response]);
      setUserRoutines(userRoutines)
    }

    setName("");
    setGoal("");
    setIsPublic(true);
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Routine Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Routine goal"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        />
        <button type="submit" onChange={(event) => event.target.value}>
          Create Routine
        </button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};

export default CreateRoutines;
