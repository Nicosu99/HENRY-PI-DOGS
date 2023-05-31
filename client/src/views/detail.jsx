import React from 'react';
import { getDogDetail, resetDetail } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import styles from "../css/Detail.module.css"

const Detail = () => {
  let dispatch = useDispatch();
  let { id } = useParams();
  const dogDetail = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id))
    return()=>{
      dispatch(resetDetail())
    }
  }, [])

  return (
    <div className={styles.mainContainer-Detail}>
      <img src={dogDetail?.image ? dogDetail.image : "img"} alt="img" />
      <h3>ID: {dogDetail?.id}</h3>
      <h1>Breed: {dogDetail?.name}</h1>
      <h3>Weight:</h3>
      <span>Min: {dogDetail?.weightMin}</span> - <span>Max: {dogDetail?.weightMax}</span>
      <h3>Average weight: {dogDetail?.averageWeight}</h3>
      <h3>Height (min - max): {dogDetail?.height}</h3> {/* sin el .metric me lo trae */}
      <h3>Life expectancy : {dogDetail?.life_span}</h3>
      <h3>Temperament: {dogDetail?.temperament}</h3>
    </div>
  )
}

export default Detail;