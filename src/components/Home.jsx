import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import styles from './home.module.css';
import APP_NAME  from '../constants/APP_CONSTANTS.js'
const baseURL = "https://api.themoviedb.org/4/list/8243765";

const Home = () => {
    const [movies, setMovies] = React.useState([]);
    let navigate = useNavigate();
    useEffect(() =>{
        async function getMovies(){
        const response = await axios.get(`${baseURL}`, { params: { page: 1, api_key: '01b9611e224e9557ef7e44595884014d' } })
        setMovies(response.data.results);
        }
        getMovies();
    }, []);
    console.log('movies', movies);

//    const createPost = () => {
//         axios.post(baseURL, {title: 'Home', body:'Food'})
//         .then((response) => {
//             setMovies(response.data);
//         })
//       }
    
    const showDetails = (id) => {
        navigate(`/details/${id}`);
    }  
    return (
        <>
        <div className={styles.appName}>{APP_NAME}</div>
        <div className={styles.container}> 
            {
                movies.map((movie) => (
                    <div className={styles.containerItem} key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => showDetails(movie.id)} />
                        <h3>{movie.title}</h3>
                        <p>Release Date: {movie.release_date}</p>
                        <Button variant="contained" color="primary">Play</Button>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default Home;