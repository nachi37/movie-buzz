import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./movieDetails.module.css";
import { Button, Grid } from "@mui/material";

function MovieDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const [credits, setCredits] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: { api_key: "01b9611e224e9557ef7e44595884014d" },
        }
      );

      const castRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
          params: { api_key: "01b9611e224e9557ef7e44595884014d" },
        }
      );

      setCredits(castRes.data);
      setDetails(response.data);

      const trailerIdRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          params: { api_key: "01b9611e224e9557ef7e44595884014d" },
        }
      );
      setTrailerId(trailerIdRes.data?.results[0]?.key);
    }
    getMovieDetails();
  }, [id]);

  function pause() {
    let video = document.getElementById("videoId");
    video.contentWindow.postMessage(
      '{"event":"command", "func":"pauseVideo", "args":""}',
      "*"
    );
  }
  // to play the video
  function play() {
    let video = document.getElementById("videoId");
    video.contentWindow.postMessage(
      '{"event":"command", "func":"playVideo", "args":""}',
      "*"
    );
  }
  return (
    <>
      {details && (
        <>
          <div className={styles.movieName}>{details?.title}</div>
          <Grid container spacing={8}>
            <Grid item xs={3}>
              <img
                className={styles.img}
                src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
                alt={details.title}
              />
            </Grid>
            <Grid item xs={9}>
              <iframe
                width="912px"
                height="513"
                title="Trailer"
                id="videoId"
                src={`https://www.youtube.com/embed/${trailerId}?enablejsapi=1`}
              ></iframe>
            </Grid>
          </Grid>
          <div className={styles.MuiButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                showTrailer ? pause() : play();
                setShowTrailer(!showTrailer);
              }}
            >
              {showTrailer ? "Pause" : "Play"}
            </Button>
          </div>
          <div className={styles.title}>
            Genres:{" "}
            {details?.genres?.map((genre, index) => (
              <span style={{ font: "normal 12px" }}>
                {genre?.name} {index < details?.genres.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>

          <div className={styles.title}>Release Date: </div>
          <div className={styles.detail}>{details?.release_date}</div>

          <div className={styles.title}>Rating: </div>
          <div className={styles.detail}>{details?.vote_average}</div>

          <div className={styles.title}>Overview: </div>
          <div className={styles.detail}>{details?.overview}</div>

          <div className={styles.title}>Cast: </div>
          <div className={styles.container}>
            {credits?.cast?.map((cast, index) => {
              if (index < 5) {
                return (
                  <div className={styles.containerItem} key={cast?.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                      alt={cast?.name}
                    />
                    <h3>{cast.name}</h3>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetails;
