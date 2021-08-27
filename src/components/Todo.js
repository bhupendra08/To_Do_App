import React, { useState, useEffect } from 'react';
import './ToDo.css';


//get localstorage data

const getLocalData = () => {
    let todo = localStorage.getItem('todo');
    if (todo) {
        return JSON.parse(localStorage.getItem('todo'))
    }
    else {
        return []
    }
}

const Todo = () => {
    const [todo, setTodo] = useState("");
    const [alltodo, setAllTodo] = useState(getLocalData());
    const [toggle, setToggle] = useState(false)
    const [isEdit, setIsEdit] = useState(null);




    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    const handleClick = (event) => {
        if (!todo) {
            alert("This field can't be empty")
        }
        else if (toggle) {
            setAllTodo(
                alltodo.map((val) => {
                    if (val.id === isEdit) {
                        return { ...val, name: todo }
                    }
                    return val
                })
             
            )
        }

        else {
            const allData = { id: new Date().getTime().toString(), name: todo }
            setAllTodo([...alltodo, allData]);
            setTodo("");
        }

    }

    const handleKey = (e) => {
        if (todo && e.key === 'Enter') {
            const allData = { id: new Date().getTime().toString(), name: todo }
            setAllTodo([...alltodo, allData]);
            setTodo("");
        }


    }

    const handleDelete = (id) => {
        const updatedValue = alltodo.filter((val) => {
            return id !== val.id
        })
        setAllTodo(updatedValue)

    }

    const handleEdit = (id) => {
        const newEdititem = alltodo.find(val => {
            return val.id === id
        })
        setTodo(newEdititem.name)
        setIsEdit(id)
        setToggle(true)
    }

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(alltodo));

    }, [alltodo])

    return (
        <>
            <div className="box">
                <div className="container">
                    <h1>TO-DO LIST</h1>
                    <div className="input_box">
                        <input type="text"
                            value={todo}
                            onChange={handleChange}
                            onKeyPress={handleKey}
                            placeholder="what you want to do...." />
                    </div>
                    <div className="button">
                        <button onClick={handleClick}>ADD</button>
                    </div>

                    {alltodo.map((val, ind) => {

                        return (
                            <div className="all_data" key={val.id}>
                                <div className="data">
                                    <p>{val.name}</p>
                                </div>
                                <div className="data_button">
                                    <button onClick={() => { handleEdit(val.id) }}>Edit</button>
                                    <button onClick={() => { handleDelete(val.id) }}>Delete</button>
                                </div>
                            </div>)
                    })}

                </div>
            </div>

        </>

    )
}

export default Todo
