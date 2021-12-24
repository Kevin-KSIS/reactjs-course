import React, {useState} from 'react';

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        if (text.length===0) {
            alert('Please insert a form');
        }

        onAdd({
            text: text,
            day: day,
            reminder: reminder
        })
        setText('');
        setDay('');
        setReminder('');
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type="text" placeholder='Add task'
                       onChange={(e)=> setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label htmlFor="">Day & Time</label>
                <input type="text" placeholder='add Day & Time'
                       onChange={(e)=> setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor="">Reminder</label>
                <input type="checkbox"
                       onChange={(e)=> setReminder(e.currentTarget.value)}/>
            </div>
            <input type="submit" className='btn btn-block' value='Submit Task'/>
        </form>
    );
};

export default AddTask;
