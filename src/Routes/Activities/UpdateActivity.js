import { useState } from 'react';
import { updateActivitiesById } from '../../util/API';
import { useOutletContext } from 'react-router-dom';

const UpdateActivities = ({getAllActivities,id}) =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token] = useOutletContext();

    async function submitUpdateForm (event) {
        event.preventDefault();
        const updatedActivity = { 
                name,
                description 
            };
        const response = await updateActivitiesById(token, id, updatedActivity);
        if (response) {
            getAllActivities()
            setName('');
            setDescription('');
        }else if(!name || !description){
            setErrorMessage('Please enter all fields')
        }
    }

    return(
        <div>
        <form onSubmit = { submitUpdateForm }>
            <input 
                type ='text'
                placeholder='Activity Name'
                value = {name}
                onChange={(event) => setName(event.target.value)}
            />
            <input 
                type ='text'
                placeholder='Activity Description'
                value = {description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button type="submit" onChange={event => (event.target.value)}>
                Edit
            </button>
            <p>{errorMessage}</p>
        </form>  
    </div>
)
}


export default UpdateActivities;