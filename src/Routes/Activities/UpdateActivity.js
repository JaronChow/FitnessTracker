import { useState } from 'react';
import { updateActivitiesById } from '../../util/API';
import { useOutletContext } from 'react-router-dom';

const UpdateActivities = ({id}) =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token] = useOutletContext();

    async function updateActivityForm (event) {
        event.preventDefault();
        const updatedActivity = { 
                name,
                description 
            };
            console.log("updated activity",updatedActivity)

        const response = await updateActivitiesById(token,updatedActivity,id);

            console.log(response,'response')


        if(!name || !description){
            setErrorMessage('Please enter all fields')
        }else {
            setErrorMessage('')
        }
        setName('');
        setDescription('');
    }

    return(
        <div>
        <form onSubmit = { updateActivityForm }>
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