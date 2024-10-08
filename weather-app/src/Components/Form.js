// Form to Read, Add, Update and Delete user dummy data (UsersData.js)
// Letting user to add other activity on current day
// https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
// https://github.com/joshnh/Git-Commands

// Import UseState Library
import { useState } from 'react';

// Create a clean after submit 
const initialItemState = {
    activity: "",
    location: "",
    time: "",
    comment: "",
}

function EditForm () {
    // Create store value
    const [item, setItem] = useState(initialItemState);
    // Create isEditing is True
    const [isediting, setEditing] = useState(false);
    
    // Capture the Input Field when create new activity on that day
    const handleItemChange = (e) => {
        setItem((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    // Create Submit when Add button click
    // const handleAddSubmit = (e) => {
    //     e.preventDefault();
    // }

    return (
        <>
        <h1>Enter New Actitity:</h1>
        {/* Create Add/Edit Form */}
        <form>
            <input name="activity" placeholder="Enter Actitity" onChange={handleItemChange} />
            <input name="location" placeholder="Enter Places" onChange={handleItemChange} />
            <input name="time" placeholder="Enter Time" onChange={handleItemChange} />
            <input name="comment" placeholder="Comments" onChange={handleItemChange} />
            <button>Add</button>
        </form>
        </>
    )
}

export default EditForm;