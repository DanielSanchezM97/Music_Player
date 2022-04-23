import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { AudioPlayer } from "../Components/AudioPlayer";
import SongCards from "../Components/SongCards";

export default function Home() {
  // ! Router.query is a function that returns the query object

  // ! state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [muted, setMuted] = useState(false);
  const [songTitle, setSongTitle] = useState("(You're The) Devil in Disguise");
  const [songArtist, setSongArtist] = useState("Elvis Presley");
  const [heartFill, setHeartFill] = useState(false);
  const [repeatSong, setRepeatSong] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [songBg, setSongBg] = useState(null);

  // ! set background in variables

  const devilInDisguiseBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(65, 63, 77, 0.527) 0%,
    rgb(0, 0, 0) 90.1%
  )`;

  // const getLuckyBg = `radial-gradient(
  //   circle 602px at 2.1% 5.1%,
  //   rgba(10, 10, 10, 0.527) 50%,
  //   rgba(0, 0, 0, 1) 90.1%
  // )`;
  const getLuckyBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(60, 51, 110, 0.527) 0%,
    rgb(0, 0, 0) 90.1%
  )`;

  const saveMeBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(104, 11, 88, 0.527) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const accidentallyInLoveBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(247, 213, 213, 0.527) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const youGetWhatYouGiveBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(243, 231, 62, 0.527) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const movesLikeJaggerBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(51, 51, 45, 0.527) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const amIWrongBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(119, 119, 9, 0.527) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const background = [
    {
      title: "(You're The) Devil in Disguise",
      background: devilInDisguiseBg,
    },
    {
      title: "Get Lucky feat. Pharrell Williams and Nile Rodgers",
      background: getLuckyBg,
    },
    {
      title: "Save Me",
      background: saveMeBg,
    },
    {
      title: "Accidentally in Love",
      background: accidentallyInLoveBg,
    },
    {
      title: "You Get What You Give",
      background: youGetWhatYouGiveBg,
    },
    {
      title: "Moves Like Jagger",
      background: movesLikeJaggerBg,
    },
    {
      title: "Am I Wrong",
      background: amIWrongBg,
    },
  ];

  useEffect(() => {
    for (let i = 0; i < background.length; i++) {
      if (background[i].title === songTitle) {
        setSongBg(background[i].background);
      }
    }
  }, [songTitle]);

  return (
    <div style={{ backgroundImage: songBg }} className={styles.container}>
      {/* <div className={styles.container}> */}
      <Head>
        <title>React Audio Player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AudioPlayer
          isPlaying={isPlaying}
          duration={duration}
          currentTime={currentTime}
          audio={audio}
          image={image}
          muted={muted}
          heartFill={heartFill}
          repeatSong={repeatSong}
          songTitle={songTitle}
          songArtist={songArtist}
          isActive={isActive}
          setIsPlaying={setIsPlaying}
          setDuration={setDuration}
          setCurrentTime={setCurrentTime}
          setAudio={setAudio}
          setImage={setImage}
          setHeartFill={setHeartFill}
          setRepeatSong={setRepeatSong}
          setMuted={setMuted}
          setSongTitle={setSongTitle}
          setSongArtist={setSongArtist}
          setIsActive={setIsActive}
        />
        <SongCards
          audio={audio}
          image={image}
          songTitle={songTitle}
          songArtist={songArtist}
          isActive={isActive}
          setAudio={setAudio}
          setImage={setImage}
          setSongTitle={setSongTitle}
          setSongArtist={setSongArtist}
          setIsActive={setIsActive}
        />
      </main>
    </div>
  );
}
