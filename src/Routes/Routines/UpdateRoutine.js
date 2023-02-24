import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { updateRoutine } from "../../util/API";

const UpdateRoutine = ({
    getUserRoutines,
    userRoutines,
    setUserRoutines,
    id
}) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [token] = useOutletContext();


async function submitUpdateForm (event) {
    event.preventDefault()
    const routine = {
        name,
        goal
    };
    const data = await updateRoutine(token, routine, id);
        console.log(data, "data");
    
    if (!name || !goal) {
        setErrorMessage("Please enter all fields");
      } else {
        setErrorMessage("");
      }
      setName("");
      setGoal("");
      getUserRoutines();
} 

  return (
    <div>
        <form onSubmit={ submitUpdateForm }>
        <input
            type="text"
            placeholder="Routine Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
        <input
            type="text"
            placeholder="Routine Goal"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
        />
        <button type="submit" >
            Edit Routine
        </button>
        <p>{errorMessage}</p>
        </form>
    </div>
  );
};

export default UpdateRoutine;
