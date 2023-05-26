import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {createNewDog} from "../redux/actions"
import validationBox from "../components/validationBox"

const Form = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const allDogs = useSelector((state) => state.dogs)

    const [form, setForm] = useState({
        weightMin: "",
        weightMax: "",
        height: "",
        name: "",
        life_span: "",
        image: "",
        temperament: [],
    })

    const [errors, setErrors] = useState({
        weightMin: "",
        weightMax: "",
        height: "",
        name: "",
        life_span: "",
        image: "",
        temperament: [],
    })

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
        
        setErrors(
            validationBox({
                ...form,
                [event.target.name]: event.target.value,
            })
        )
    }

    const submitHandler = (event) => {
        event.preventDefault()
        let dogName = allDogs.find(
            (el) => el.name === form.name.trim().toLocaleLowerCase(),)
        if (dogName){
            return alert ('There is already a dog with this name')}
        
        console.log(form);
        dispatch(createNewDog(form))
        .then(res=>alert('Dog succesfully created'))
        // setForm({
        //     weightMin: "0",
        //     weightMax: "0",
        //     height: "",
        //     name: "",
        //     life_span: "",
        //     image: "",
        //     temperament: [],
        // })
    }

    const handleTemperamentChoices = (event) =>{
        let {value} = event.target;
        if (form.temperament.includes(value)) {
            return alert ("Temperaments can not be repeated")
        }
        if (value === "all"){
            return
        }
        setForm({
            ...form,
            temperament: [...form.temperament, value]
        })
        setErrors(validationBox({
            ...form,
            [event.target.name]: event.target.value
        }))
    }

    const handleDelete = (temp) => {
        setForm({
            ...form,
            temperament: form.temperament.filter(inst => inst !== temp)
        })
    }

    return (
        <form onSubmit={(event) => submitHandler(event)}>
            <div>
                <label>Name: </label>
                <input
                type="text"
                name="name"
                value={form.name}
                placeholder="For example: Firulais"
                onChange={(event) => changeHandler(event)} />
                <span>{errors.name}</span>
            </div>
            <div>
                <label>Image: </label>
                <input
                type="text"
                name="image"
                value={form.image}
                placeholder="Instert image link"
                onChange={(event) => changeHandler(event)} />
               <span>{errors.image}</span>
            </div>
            <div>
                <label>Weight Min: </label>
                <input
                type="text"
                name="weightMin"
                value={form.weightMin}
                placeholder="For example: 12"
                onChange={(event) => changeHandler(event)} />
               <span>{errors.weightMin}</span>
            </div>
            <div>
            <label>Weight Max: </label>
                <input
                type="text"
                name="weightMax"
                value={form.weightMax}
                placeholder="For example: 19"
                onChange={(event) => changeHandler(event)} />
               <span>{errors.weightMax}</span>
            </div>
            <div>
                <label>Height: </label>
                <input
                type="text"
                name="height"
                value={form.height}
                placeholder="For example: 35"
                onChange={(event) => changeHandler(event)} />
                <span>{errors.height}</span>
            </div>
            <div>
                <label>Life expectancy: </label>
                <input
                type="text"
                name="life_span"
                value={form.life_span}
                placeholder="For example: 11"
                onChange={(event) => changeHandler(event)} />
                <span>{errors.life_span}</span>
            </div>
            <div>
                <label>Temperaments: </label>
                <select onChange={(event) => handleTemperamentChoices(event)}>
                    <option value="all"></option>
                    {temperaments.map((temp) => {
                        return (
                            <option value={temp} key={temp}> {temp} </option>
                        )
                    })}                   
                </select>
                <div>
                    {form.temperament.map(temp => 
                        <div> 
                            <p>{temp}</p>
                            <button onClick={() => {handleDelete(temp)}}>x</button>
                        </div> )}
                </div>
            </div>
            <div>
            <button
        type="submit"
        onClick={(event) => submitHandler(event)}
        className="" disabled={
            errors.name || errors.image || errors.weightMin || errors.weightMax || errors.height || errors.life_span || !form.temperament.length || !form.name}
        >Add my dog</button>
            </div>
        </form>
    )
}

export default Form