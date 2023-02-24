import { useOutletContext } from "react-router-dom";
import { deleteRoutine } from "../../util/API";

const DeleteRoutine = ({
  userRoutines,
  routines,
  setRoutines,
  getUserRoutines,
  id,
}) => {
  console.log(userRoutines, "routines");
  const [token] = useOutletContext();

  const removeRoutine = async (routineId) => {
    console.log(routineId, "routine to delete");
    const data = await deleteRoutine(token, routineId.id);
    console.log(routines, "data");
    if (data) {
      const newRoutines = routines.filter(
        (routine) => routine.id !== routineId.id
      );
      setRoutines(newRoutines);
      getUserRoutines();
    }
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        removeRoutine({ id });
      }}
    >
      Delete Routine
    </button>
  );
};

export default DeleteRoutine;
