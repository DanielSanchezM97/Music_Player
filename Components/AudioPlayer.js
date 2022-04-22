import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { CgPlayTrackPrev } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { GiSpeaker } from "react-icons/gi";
import { GiSpeakerOff } from "react-icons/gi";
import { MdOutlineRepeat } from "react-icons/md";
import { MdRepeatOne } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { TiArrowShuffle } from "react-icons/ti";

const AudioPlayer = (props) => {
  const {
    isPlaying,
    duration,
    currentTime,
    audio,
    image,
    heartFill,
    repeatSong,
    muted,
    songTitle,
    songArtist,
    isActive,
  } = props;

  const {
    setIsPlaying,
    setDuration,
    setCurrentTime,
    setAudio,
    setImage,
    setHeartFill,
    setRepeatSong,
    setMuted,
    setSongTitle,
    setSongArtist,
    setIsActive,
  } = props;

  const chapters = [
    {
      // start: 0,
      // end: 40,
      start: 0,
      end: 8,
    },
    {
      start: 135,
      end: 140,
      // start: 100,
      // end: 140,
    },
  ];

  const Elvis = "../audios/AudioElvis.mp3";
  const GetLucky = "../audios/GetLucky.mp3";

  const elvisImage =
    "https://www.nacionrex.com/__export/1515365585499/sites/debate/img/2018/01/07/foto_de_portada_elvis.jpg_423682103.jpg";
  const getLuckyImage =
    "https://img.youtube.com/vi/h5EofwRzit0/hqdefault.jpg?rev=2.8.6.2";

  // ! refs

  const audioPlayer = useRef(); // ? reference to the audio component
  const progressBar = useRef(); // ? reference to the progress bar
  const animationRef = useRef(); // ? reference to the animation

  // ! useEffect to handle the audio player

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);

    // ! current is a reference to the current item
    // ? max is the reference given by the progress bar

    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  // ! useEffect to handle the end of the audio and the repeat song

  useEffect(() => {
    if (currentTime == duration && isPlaying && !repeatSong) {
      togglePlayPause();
      timeTravel(0);
      setIsActive(false);
    } else if (currentTime == duration && repeatSong) {
      timeTravel(0);
      audioPlayer.current.play();
      setRepeatSong(false);
    }
  }, [currentTime]);

  // ! useEffect to change the audio

  useEffect(() => {
    if (audio && !isPlaying) {
      setCurrentTime(0);
      audioPlayer.current.src = audio;
      audioPlayer.current.load(); // ? load the audio
      togglePlayPause();
      timeTravel(0);

      progressBar.current.value = currentTime;
    } else if (audio && isPlaying) {
      setCurrentTime(0);
      audioPlayer.current.src = audio;
      audioPlayer.current.load(); // ? load the audio
      audioPlayer.current.play();
      timeTravel(0);

      progressBar.current.value = currentTime;
    }
  }, [audio]);

  // ! Changing the duration according to the current audio

  useEffect(() => {
    if (audioPlayer.current.duration) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);

      progressBar.current.max = seconds;
    }
  }, [duration]);

  // ! useEffet to pause and play the audio with the spacebar

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

  // ! FUNCTIONS

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
      togglePlayPause();
      setIsActive(!isActive);
    } else if (e.keyCode === 39) {
      forwardThirty();
    } else if (e.keyCode === 37) {
      backThirty();
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `${minutes}` : minutes;
    // const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();

      // ? requestAnimationFrame is a function that allows us to run a function
      // ? every frame of the animation

      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  // ! Creating our animation function => whilePlaying

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;

    // changePlayerCurrentTime();
    setCurrentTime(progressBar.current.value);

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  // ! Changing the range of the progress bar FUNCTION

  const changeRange = () => {
    // ! Setting our audio current time to the value of the progress bar
    audioPlayer.current.currentTime = progressBar.current.value;

    // changePlayerCurrentTime();
    setCurrentTime(progressBar.current.value);
  };

  const changePlayerCurrentTime = () => {
    // ! Updating the progress bar in CSS

    // ? progressBar.current.style.setProperty => takes two arguments
    // ? first is the property name
    // ? second is the value of the property

    // console.log("bar", progressBar.current.value);
    // console.log("duration", duration);

    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    console.log("bar", progressBar.current.value);
    console.log("duration", duration);
    const Total = progressBar.current.value / duration;
    console.log("Total", Total);
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  };

  const timeTravel = (newTime) => {
    progressBar.current.value = newTime;
    changeRange();
  };

  // ! muted and unmuted

  const toggleMute = () => {
    audioPlayer.current.muted = !audioPlayer.current.muted;
    setMuted(!muted);
  };

  return (
    <div className={styles.audioPlayer}>
      {/* Song Cover */}

      <div className={styles.imgContainer}>
        <img
          className={styles.coverImg}
          src={image ? image : elvisImage}
          alt="cover"
        />
      </div>

      {/* Song Info */}

      <div className={styles.songInfo}>
        <p className={styles.songArtist}>
          {songArtist ? songArtist : "Elvis Presley"}
        </p>
        <p className={styles.songTitle}>
          {songTitle ? songTitle : "(You're The) Devil in Disguise"}
        </p>
      </div>

      {/* Audio Player Reference */}

      <audio
        ref={audioPlayer}
        // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        src={audio ? audio : Elvis}
        preload="metadata"
      ></audio>

      {/* End of the Audio Player Reference */}

      <div className={styles.progressBarContainer}>
        {/* Current Time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        {/* Progress Bar */}

        <div className={styles.progressBarWrapper}>
          <input
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
            step="0.05"
          />

          {/* Chapters Video 2 */}

          {/* {chapters.map((chapter, i) => {
          const leftStyle = (chapter.start / duration) * 100;

          const widthStyle = ((chapter.end - chapter.start) / duration) * 100;

          return (
            <div
              key={i}
              className={`${styles.chapter} ${
                chapter.start === 0 && styles.start
              } ${chapter.end === duration && styles.end}`}
              style={{
                "--left": `${leftStyle}%`,
                "--width": `${widthStyle}%`,
              }}
            ></div>
          );
        })} */}
        </div>

        {/* Duration */}

        <div className={styles.duration}>
          {duration && !isNaN(duration) ? calculateTime(duration) : "0:00"}
        </div>
      </div>

      {/* Controls */}

      <div className={styles.controls}>
        <button
          onClick={() => {
            setAudio(Elvis);
            setImage(elvisImage);
            setSongTitle("(You're The) Devil in Disguise");
            setSongArtist("Elvis Presley");
          }}
          className={styles.timeControls}
        >
          <CgPlayTrackPrev />
        </button>
        <button className={styles.timeControls} onClick={backThirty}>
          <AiFillBackward />
        </button>

        {/* Play and Pause Button */}

        {/* <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button> */}

        <div
          className={styles.newButton}
          // onclick="this.classList.toggle('active')"
        >
          <div className={styles.background}></div>
          <div
            className={isActive ? styles.activeIcon : styles.icon}
            width="200"
            height="200"
          >
            <div
              className={`${styles.parte} ${
                isActive ? styles.activeLeft : styles.left
              }`}
              x="0"
              y="0"
            ></div>
            <div
              className={`${styles.parte} ${
                isActive ? styles.activeRight : styles.right
              }`}
              x="0"
              y="0"
            ></div>
          </div>
          <div
            className={styles.puntero}
            onClick={() => {
              togglePlayPause();
              setIsActive(!isActive);
            }}
          ></div>
        </div>

        {/* End of Play and Pause Button */}

        <button className={styles.timeControls} onClick={forwardThirty}>
          <AiFillForward />
        </button>
        <button
          onClick={() => {
            setAudio(GetLucky);
            setImage(getLuckyImage);
            setSongTitle("Get Lucky feat. Pharrell Williams and Nile Rodgers");
            setSongArtist("Daft Punk");
          }}
          className={styles.timeControls}
        >
          <CgPlayTrackNext />
        </button>
      </div>

      {/* Additionnal Controls */}

      <div className={styles.controls}>
        <button className={styles.AdditionalControls}>
          <TiArrowShuffle />
        </button>
        <button
          className={styles.heart}
          onClick={() => setHeartFill(!heartFill)}
        >
          {heartFill ? (
            <AiOutlineHeart />
          ) : (
            <AiFillHeart style={{ color: "red" }} />
          )}
        </button>
        <button
          className={styles.AdditionalControls}
          onClick={() => {
            setRepeatSong(!repeatSong);
          }}
        >
          {repeatSong ? <MdRepeatOne /> : <MdOutlineRepeat />}
        </button>
        <button className={styles.AdditionalControls} onClick={toggleMute}>
          {muted ? <GiSpeakerOff /> : <GiSpeaker />}
        </button>
      </div>

      {/* Song Selector */}

      <div>
        {/* <button
          onClick={() => {
            setAudio(Elvis);
            setImage(elvisImage);
            setSongArtist("Elvis Presley");
            setSongTitle("(You're The) Devil in Disguise");
          }}
        >
          Elvis Song
        </button> */}

        {/* <button
          onClick={() => {
            setAudio(GetLucky);
            setImage(getLuckyImage);
            setSongArtist("Daft Punk");
            setSongTitle("Get Lucky feat. Pharrell Williams and Nile Rodgers");
          }}
        >
          Get Lucky Song
        </button> */}
      </div>
    </div>
  );
};

export { AudioPlayer };
// ! the {} means that this is a named export
