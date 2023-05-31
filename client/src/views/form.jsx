import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewDog, getAllTemperaments } from "../redux/actions";
import validate from "../components/validate.jsx"
import style from "../css/form.module.css"
import { Link } from "react-router-dom";

const Form = () => {

  const dispatch = useDispatch(); //this component will dispatch an action
  const temperaments = useSelector((state) => state.temperaments) //global state

  const [inputs, setInputs] = useState({ //local state
    name: "",
    height: "",
    life_span: "",
    image: "",
    weightMin: "0",
    weightMax: "0",
    temperament: [],
  })

  const [error, setErrors] = useState({}) //local state to validate form

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

  const handleTemperamentChoices = (event) => { //This function checks that you cannot create a dog with a temmperament "happy, happy, happy"    
    let { value } = event.target;
    if (inputs.temperament.includes(value)) {
      return alert("Temperaments can not be repeated")
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

  const handleDelete = (temp) => { //This function allows you to delete a temperament you don´t want BEFORE creating the dog 
    setInputs({
      ...inputs,
      temperament: inputs.temperament.filter(inst => inst !== temp)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewDog(inputs))
    console.log(inputs)
    alert("Dog successfully added")
    setInputs({
      name: "",
      height: "",
      life_span: "",
      image: "",
      weightMin: "0",
      weightMax: "0",
      temperament: [],
    })
  }

  useEffect(() => {
    dispatch(getAllTemperaments())
  }, []);

  return (
    <div>
      <Link to="/home" className={style.button}>
        Go back
      </Link>
      <form className={style.Formulario}>
        <div className={style.inputs}>
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
              placeholder={"For example: https://mydog.jpg "}
              onChange={(event) => handleInputs(event)} />
            {error.image && <strong>{error.image}</strong>}
          </div>

          <br />

          <div>
            <label>Weight</label>
            <br />
            <br />
            <label>Min (kg): </label>
            <input
              type="text"
              name="weightMin"
              value={inputs.weightMin}
              onChange={(event) => handleInputs(event)} />
            {error.weightMin && <strong>{error.weightMin}</strong>}

            <br />

            <label>Max (kg): </label>
            <input
              type="text"
              name="weightMax"
              value={inputs.weightMax}
              onChange={(event) => handleInputs(event)} />
            {error.weightMax && <strong>{error.weightMax}</strong>}

          </div>

          <br />

          <div>
            <label>Height (cm):
              <input
                type="text"
                name="height"
                value={inputs.height}
                placeholder={"For example: 55 "}
                onChange={(event) => handleInputs(event)} />
              {error.height && <strong>{error.height}</strong>}
            </label>
          </div>

          <br />

          <div>
            <label>Life expectancy:
              <input
                type="text"
                name="life_span"
                value={inputs.life_span}
                placeholder={"For example: 10 - 15"}
                onChange={(event) => handleInputs(event)} />
              {error.life_span && <strong>{error.life_span}</strong>}
            </label>
          </div>

          <br />

          <label>Temperaments: 
          <div className={style.temperaments}>
            <select onChange={(event) => handleTemperamentChoices(event)}>
              <option className={style.opciones} value="all"></option>
              {temperaments.map((temp) => {
                return (
                  <option className={style.opciones} value={temp} key={temp}>
                    {temp}
                  </option>
                );
              })}
            </select>
            <h4>My dog is...</h4>
          {inputs.temperament.map(temp =>
          <div className={style.toDelete}>
          <p>{temp}</p>
          <button onClick={() => { handleDelete(temp) }}>X</button>
          </div>
      )}
            <button
              type="submit"
              onClick={(event) => handleSubmit(event)}
              className={style.button} disabled={
                error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || !inputs.temperament.length || !inputs.name}
              >Add my dog</button>
              {error.temperament && <strong>{error.temperament}</strong>}
              </div>
              </label>
        </div>
      </form>
  </div>
  )
}

export default Form;

