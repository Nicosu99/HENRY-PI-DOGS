import style from "../css/Card.module.css"
import React from "react"
import {Link} from "react-router-dom"

const Card = ({image, name, temperament, weightMin, weightMax, averageWeight, id}) => {
    return(
        <div className={style.card}>
            <Link to={`/home/${id}`}>
            <p className={style.nombre}>{name}</p>
            <img src={image} alt={`Fotito of ${name}`} />
            </Link>
            <div>
                <p>Temperament:</p>
                <p>{temperament}</p>
            </div>
            <div>
                <p>Weight</p>
                <p>Min: {weightMin}</p>
                <p>Max: {weightMax}</p>
            </div>
        </div>
    )
}

export default Card