import React from "react";
import { Link } from "react-router-dom";
import CardsContainer from "../components/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllBreeds, getAllTemperaments, setCurrentPage, filterByTemper, orderByName, orderByWeight, filterByOrigin } from "../redux/actions";
import SearchBar from "../components/SearchBar";
import styles from "../css/Home.module.css"

const Home = () => {

    const dispatch = useDispatch();
    // eslint-disable-next-line
    const [order, setOrder] = useState(''); // eslint-disable-next-line
    const [temperament, setTemperament] = useState ('all'); 
    const [filter, setFilter] = useState({
        name: "name",
        origin: "All",
        temperament: "all",
        weight: "weight",
        aver: "aver",
    });



    const temperaments = useSelector(state => [...state.temperaments].sort(
        function(a,b) {
            if (a < b) return -1;
            else return 1;
        }
    ))

    const handleOrder1 = (event) => {
        dispatch(orderByName(event.target.value));
        dispatch(setCurrentPage(1));
        setOrder(`Ordered ${event.target.value}`);
        setFilter({
          ...filter,
          name: event.target.value
        })
      }
    
    const handleOrder2 = (event) => {
        dispatch(orderByWeight(event.target.value));
        dispatch(setCurrentPage(1));
        setOrder(`Ordered ${event.target.value}`);
        setFilter({
          ...filter,
          weight: event.target.value
        })
      }
    
    const handleOrder3 = (event) => {
        dispatch(orderByWeight(event.target.value));
        dispatch(setCurrentPage(1));
        setOrder(`Ordered ${event.target.value}`);
        setFilter({
          ...filter,
          aver: event.target.value
        })
      }
    
    
    const handleFilterByOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value))
        dispatch(setCurrentPage(1));
        setOrder(`Ordered ${event.target.value}`)
        setFilter({
          ...filter,
          origin: event.target.value
        })
      }
    
    const handleFilterByTemperament = (event) => {
        setTemperament(event.target.value)
        dispatch(filterByTemper(event.target.value))
        dispatch(setCurrentPage(1));
        setOrder(`Ordered ${event.target.value}`)
        setFilter({
          ...filter,
          temperament: event.target.value
        })
      }
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getAllBreeds());
        dispatch(setCurrentPage(1));
        setFilter({
          name: "name",
          origin: "All",
          temperament: "all",
          weight: "weight",
          aver: "aver",
        })
      }

    useEffect(()=>{
        dispatch(getAllBreeds());
        dispatch(getAllTemperaments());
    },[dispatch])

    return(
        <div>
            {/* ACA EMPIEZA LA NAVBAR */}
            <div className={styles.navbar}>
            <div>
            <img src="" alt="Dogs Logo" />
            </div>
            <div>
            <Link to="/">WELCOME PAGE</Link>
            <Link to="/create">CREATE NEW DOG</Link>
            </div>
            <div>
            <img src="" alt="Linkedin logo" />
            <img src="" alt="Instagram logo" />
            </div>
        </div>
                {/* ACA TERMINA LA NAVBAR */}

            <div className={styles.container}>
            <button className={styles.buttonAllDogs} onClick={(event) => handleClick(event)}>
            All Dogs
            </button>
            <SearchBar/>
            </div>
<br />
            <div>
                <section className={styles.filterSection}>
                    <select value={filter.name} onChange={event => {handleOrder1(event)}}>
                        <option value="name" disabled selected>Sort alphabetically</option>
                        <option value="a-z">From A to Z</option>
                        <option value="z-a">From Z to A</option>
                    </select>

                    <select value={filter.weight} onChange={event => {handleOrder2(event)}}>
                        <option value="weight" disabled selected>Order by weight</option>
                        <option value="min">Lightest first</option>
                        <option value="max">Heaviest first</option>
                    </select>

                    <select value={filter.aver} onChange={event => {handleOrder3(event)}}>
                        <option value="aver" disabled selected>Order by average weight</option>
                        <option value="ave">Lightest average first</option>
                        <option value="ave-max">Heaviest average first</option>
                    </select>
                    
                    <select value={filter.origin} onChange={event => {handleFilterByOrigin(event)}}>
                        <option value="All">All dogs</option>
                        <option value="api">Api dogs</option>
                        <option value="created">Created dogs</option>
                    </select>
                    <select value={filter.temperament} onChange={event => {handleFilterByTemperament(event)}}>
                        <option value="all">All temperaments</option>
                        {temperaments.map((temp)=> {
                            return (
                                <option value={temp} key={temp}>
                                    {temp}
                                </option>
                            )
                        })}
                    </select>
                </section>
                
            </div>
            <CardsContainer/>
            <div>
                FOOTER
            </div>
        </div>
    )
}

export default Home;