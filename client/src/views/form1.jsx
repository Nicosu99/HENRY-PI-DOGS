import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {createNewDog, getAllTemperaments} from "../redux/actions"
import validate from "../components/validationBox"

const Form = () => {

    const dispatch = useDispatch();     // Dispatch an action
    const temperaments = useSelector((state)=> state.temperaments);     //Global state

    const [inputs, setInputs] = useState({      // Local state for inputs
        name: "",
        height: "",
        life_span: "",
        image: "",
        weightMin: "0",
        weightMax: "0",
        temperament: [],
    })

    const [error, setErrors] = useState({})    // Local state for errors

    const handleInputs = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...inputs,
            [event.target.name]: event.target.value
        }))
    }

    const handleTemperamentChoices = (event) => {
        let {value} = event.target;
        if (inputs.temperament.includes(value)) {
            return alert ("Temperaments can not be repeated")
        }
        if (value === "all"){
            return
        }
        setInputs({
            ...inputs,
            temperament: [...inputs.temperament, value]
        })
        setErrors(validate({
            ...inputs,
            [event.target.name]: event.target.value
        }))
    }

    const handleDelete = (temp) => {
        setInputs({
            ...inputs,
            temperament: inputs.temperament.filter(inst => inst !== temp)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createNewDog(inputs))
        console.log(inputs)
        console.log(error)
        alert("Dog succesfully created")
        setInputs({
            name: "",
            height: "",
            life_span: "",
            image: "",
            weightMin: "",
            weightMax: "",
            temperament: [],
        })
    }

    useEffect(() => {
        dispatch(getAllTemperaments())
    },[]);


    return(
        <div>
            <h1>Can't find a dog? Create it!</h1>
            <form>
                <div>
                    <div>
                        <label>Name: </label>
                        <input 
                        type="text"
                        name="name"
                        value={inputs.name}
                        placeholder={"For example: Firulais"}
                        onChange={(event) => handleInputs(event)} />
                        {error.name && <strong>{error.name}</strong>}
                    </div>

                    <br />

                    <div>
                        <label>Image: </label>
                        <input
                        type="text"
                        name="image"
                        value={inputs.image}
                        placeholder={"Insert image link"}
                        onChange={(event) => handleInputs(event)} />
                        {error.image && <strong>{error.image}</strong>}
                    </div>

                    <br />

                    <div>
                        <label>Weight</label>
                        <br />
                        <label>Min (Kg): </label>
                        <input 
                        type= "text"
                        name= "weightMin"
                        value={inputs.weightMin}
                        onChange={(event) => handleInputs(event)} />
                        {error.weightMin && <strong>{error.weightMin}</strong>}

                        <br />

                        <label>Max (Kg): </label>
                        <input
                        type="text"
                        name="weightMax"
                        value={inputs.weightMax}
                        onChange={(event) => handleInputs(event)} />
                        {error.weightMax && <strong>{error.weightMax}</strong>}
                    </div>

                    <br />

                    <div>
                        <label>Height (cm)</label>
                        <input 
                        type="text"
                        name="height"
                        value={inputs.height}
                        placeholder={"For example: 55 - 67 centimeters"}
                        onChange={(event) => handleInputs(event)} />
                        {error.height && <strong>{error.height}</strong>}
                    </div>

                    <br />

                    <div>
                        <label>Life expectancy:</label>
                        <input 
                        type="text"
                        name="life_span"
                        value={inputs.life_span}
                        placeholder={"For example: 10 - 15 years"}
                        onChange={(event) => handleInputs(event)} />
                        {error.life_span && <strong>{error.life_span}</strong>}
                    </div>

                    <br />

                    <label>Temperaments: 
                        <div className="">
                            <select onChange={(event) => handleTemperamentChoices(event)}>
                            <option className="" value="all"></option>
                            {temperaments.map((temp) => {
                                return (
                                <option className="" value={temp} key={temp}>
                                    {temp}
                                </option>
                                );
                            })}
                            </select>
                            <h4>My dog is...</h4>
                            <ul className=""><div>{inputs.temperament.map(temp => temp + ", ")}</div>
                            </ul>
                            <button
                            type="submit"
                            onClick={(event) => handleSubmit(event)}
                            className="" disabled={
                                error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || !inputs.temperament.length || !inputs.name}
                            >Add my dog</button>
                            {error.temperament && <strong>{error.temperament}</strong>}
                        </div>
                    </label>

                </div>
            </form>
            <div >
                {inputs.temperament.map(temp =>
                <div >
                <p>{temp}</p>
                <button onClick={() => { handleDelete(temp) }}>X</button>
            </div>
      )}
      </div>
        </div>
    )
}

export default Form;