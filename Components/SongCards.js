import React from "react";
import styles from "../styles/SongCards.module.css";

function SongCards(props) {
  const { audio, image, songTitle, songArtist, isActive } = props;
  const { setAudio, setImage, setSongTitle, setSongArtist, setIsActive } =
    props;

  const Elvis = "../audios/AudioElvis.mp3";
  const GetLucky = "../audios/GetLucky.mp3";

  const elvisImage =
    "https://www.nacionrex.com/__export/1515365585499/sites/debate/img/2018/01/07/foto_de_portada_elvis.jpg_423682103.jpg";
  const getLuckyImage =
    "https://img.youtube.com/vi/h5EofwRzit0/hqdefault.jpg?rev=2.8.6.2";
  return (
    <div className={styles.cardsContainer}>
      {/* Song Cards  */}

      <div
        className={styles.card}
        onClick={() => {
          setAudio(Elvis);
          setImage(elvisImage);
          setSongArtist("Elvis Presley");
          setSongTitle("(You're The) Devil in Disguise");
          setIsActive(true);
        }}
      >
        <div className={styles.imageContainer}>
          <img src={elvisImage}></img>
        </div>
        <div className={styles.SongInfoContainer}>
          <p className={styles.SongTitle}>(You're The) Devil in Disguise</p>
          <p className={styles.SongArtist}>Elvis Presley</p>
        </div>
      </div>

      <div
        className={styles.card}
        onClick={() => {
          setAudio(GetLucky);
          setImage(getLuckyImage);
          setSongArtist("Daft Punk");
          setSongTitle("Get Lucky feat. Pharrell Williams and Nile Rodgers");
          setIsActive(true);
        }}
      >
        <div className={styles.imageContainer}>
          <img src={getLuckyImage}></img>
        </div>
        <div className={styles.SongInfoContainer}>
          <p className={styles.SongTitle}>
            Get Lucky
            {/* feat. Pharrell Williams and Nile Rodgers */}
          </p>
          <p className={styles.SongArtist}>Daft Punk</p>
        </div>
      </div>
    </div>
  );
}

export default SongCards;
