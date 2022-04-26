import React from "react";
import styles from "../styles/SongCards.module.css";

function SongCards(props) {
  const { Songs, songTitle, isActive } = props;
  const { setShuffle } = props;
  const { togglePlayPause, declareProperties } = props;

  // ! FUNCTIONS

  const createSongCards = () => {
    const songCards = [];

    for (let i = 0; i < Songs.length; i++) {
      songCards.push(
        <div
          key={Songs[i].id}
          className={`${styles.card} ${
            songTitle === Songs[i].title ? styles.ActiveCard : ""
          }`}
          onClick={() => {
            isActive && songTitle === Songs[i].title
              ? null
              : (togglePlayPause(),
                declareProperties(Songs[i].title),
                setShuffle(false));
          }}
        >
          <div className={styles.imageContainer}>
            <img
              className={styles.cardImage}
              src={Songs[i].image}
              alt={Songs[0].title}
            />
          </div>
          <div className={styles.SongInfoContainer}>
            <p
              className={`${styles.SongTitle} ${
                songTitle === Songs[i].title ? styles.ActiveTitle : ""
              }`}
            >
              {Songs[i].title}
            </p>
            <p className={styles.SongArtist}>{Songs[i].artist}</p>
          </div>
        </div>
      );
    }
    return songCards;
  };

  return <div className={styles.cardsContainer}>{createSongCards()}</div>;
}

export default SongCards;
