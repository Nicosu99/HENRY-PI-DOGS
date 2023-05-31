import Card from "./Card"
import style from "../css/CardsContainer.module.css"
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import Pagination from "./Pagination"

const CardsContainer = () => {
    const dogs = useSelector(state => state.dogs)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexLastDog = currentPage * dogsPerPage
    const indexFirstDog = indexLastDog - dogsPerPage
    const currentDogs = dogs.slice(indexFirstDog,indexLastDog)

    const pagination = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    return(
        <div>
            <div>
            <Pagination 
            dogsPerPage={dogsPerPage} 
            dogs={dogs.length} 
            pagination={pagination} />

            </div>
            <div className={style.container}>
            {currentDogs.map((dog)=>{
                return <Card  
                  id= {dog.id}
                  name= {dog.name}
                  image= {dog.image}
                  temperament= {dog.temperament}
                  weightMin= {dog.weightMin}
                  weightMax= {dog.weightMax}
                />
            })}
            </div>
        </div>

    )
}

export default CardsContainer