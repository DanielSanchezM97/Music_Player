import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
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
    Songs,
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
    audioPlayer,
    progressBar,
    shuffle,
    songIds,
    animationRef,
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
    setShuffle,
    setSongIds,
  } = props;

  const { togglePlayPause } = props;

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

  const randomsUsed = [];
  let songIdsCopy = Songs.map((song) => song.id);
  // setSongIds(songIdsCopy);

  // const Songs = [
  //   {
  //     title: "(You're The) Devil in Disguise",
  //     artist: "Elvis Presley",
  //     like: false,
  //     image:
  //       "https://www.nacionrex.com/__export/1515365585499/sites/debate/img/2018/01/07/foto_de_portada_elvis.jpg_423682103.jpg",
  //     audio: "../audios/AudioElvis.mp3",
  //     background: `style="
  //     background-image: radial-gradient(
  //       circle 602px at 2.1% 5.1%,
  //       rgb(206, 200, 203) 0%,
  //       rgba(0, 0, 0, 1) 90.1%
  //     );
  //     `,
  //   },
  //   {
  //     title: "Get Lucky feat. Pharrell Williams and Nile Rodgers",
  //     artist: "Daft Punk",
  //     like: false,
  //     image: "https://img.youtube.com/vi/h5EofwRzit0/hqdefault.jpg?rev=2.8.6.2",
  //     audio: "../audios/GetLucky.mp3",
  //   },
  //   {
  //     title: "Save Me",
  //     artist: "Bruno Martini",
  //     like: false,
  //     image:
  //       "https://i1.sndcdn.com/artworks-fDl6pv6QSY5GATMI-NOVBYQ-t500x500.jpg",
  //     audio: "../audios/SaveMe.mp3",
  //   },
  //   {
  //     title: "Accidentally in Love",
  //     artist: "Counting Crows",
  //     like: false,
  //     image:
  //       "https://www.gannett-cdn.com/-mm-/6adc9704e2926e2fdd103128da3a87abf86aee99/c=0-77-1742-2400/local/-/media/2016/09/07/Phoenix/Phoenix/636088629485674132-counting-crows-2.jpg",
  //     audio: "../audios/AccidentallyInLove.mp3",
  //   },
  //   {
  //     title: "You Get What You Give",
  //     artist: "New Radicals",
  //     like: false,
  //     image:
  //       "https://i0.wp.com/www.alexurbanpop.com/wp-content/uploads/2019/08/New-Radicals-You-Get-What-You-Give.jpg?fit=1000%2C1000&ssl=1",
  //     audio: "../audios/YouGetWhatYouGive.mp3",
  //   },
  //   {
  //     title: "Moves Like Jagger",
  //     artist: "Maroon 5",
  //     like: false,
  //     image:
  //       "https://p4.wallpaperbetter.com/wallpaper/819/67/757/maroon-5-band-members-look-wallpaper-preview.jpg",
  //     audio: "../audios/MovesLikeJagger.mp3",
  //   },
  //   {
  //     title: "Am I Wrong",
  //     artist: "Nico & Vinz",
  //     like: false,
  //     image: "https://m.media-amazon.com/images/I/417OWNKAvZL.jpg",
  //     audio: "../audios/AmIWrong.mp3",
  //   },
  // ];

  // // ! refs

  // const audioPlayer = useRef(); // ? reference to the audio component
  // const progressBar = useRef(); // ? reference to the progress bar
  // const animationRef = useRef(); // ? reference to the animation

  // ! useEffect to handle the audio player

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);

    // ! current is a reference to the current item
    // ? max is the reference given by the progress bar

    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  // ! useEffect to handle the end of the audio and the repeat song and the play all songs

  useEffect(() => {
    if (currentTime == duration && isPlaying && !repeatSong) {
      if (shuffle) {
        shuffleWihoutRepeat();
      } else {
        for (let i = 0; i < Songs.length; i++) {
          if (Songs[i].title == songTitle) {
            if (i == Songs.length - 1) {
              togglePlayPause();
              timeTravel(0);
              setIsActive(false);
              setSongIds(songIdsCopy);
              return;
            } else {
              setCurrentTime(0);
              setSongTitle(Songs[i + 1].title);
              setSongArtist(Songs[i + 1].artist);
              setImage(Songs[i + 1].image);
              setAudio(Songs[i + 1].audio);
              setIsActive(true);
              setIsPlaying(true);
              setSongIds(songIdsCopy);
              audioPlayer.current.play();
              return;
            }
          }
        }
      }
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

  // const togglePlayPause = () => {
  //   const prevValue = isPlaying;
  //   setIsPlaying(!prevValue);

  //   console.log("prevValue: ", prevValue);
  //   console.log("isActive: ", isActive);

  //   if (!prevValue) {
  //     audioPlayer.current.play();

  //     // ? requestAnimationFrame is a function that allows us to run a function
  //     // ? every frame of the animation

  //     animationRef.current = requestAnimationFrame(whilePlaying);
  //   } else {
  //     audioPlayer.current.pause();
  //     cancelAnimationFrame(animationRef.current);
  //   }
  // };

  // ! Creating our animation function => whilePlaying

  // const whilePlaying = () => {
  //   progressBar.current.value = audioPlayer.current.currentTime;

  //   // changePlayerCurrentTime();
  //   setCurrentTime(progressBar.current.value);

  //   animationRef.current = requestAnimationFrame(whilePlaying);
  // };

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

  const shuffleWihoutRepeat = () => {
    if (songIds.length === 0) {
      togglePlayPause();
      timeTravel(0);
      setIsActive(false);
      setSongIds(songIdsCopy);
      setShuffle(false);
      return;
    }

    if (songIds.length === songIdsCopy.length) {
      for (let i = 0; i < Songs.length; i++) {
        if (Songs[i].title == songTitle) {
          songIds.splice(i, 1);
        }
      }
    }
    const randomElement = songIds[Math.floor(Math.random() * songIds.length)];
    const index = songIds.indexOf(randomElement);

    if (index > -1) {
      songIds.splice(index, 1);
    }
    console.log("randomElement", randomElement);
    console.log("songIds", songIds);
    console.log("shuffle else");
    setSongTitle(Songs[randomElement - 1].title);
    setSongArtist(Songs[randomElement - 1].artist);
    setImage(Songs[randomElement - 1].image);
    setAudio(Songs[randomElement - 1].audio);
    setIsPlaying(true);
    setCurrentTime(0);
    return;
  };

  const handlePrev = () => {
    Songs.map((song, index) => {
      if (song.title === songTitle) {
        if (index === 0) {
          setAudio(Songs[Songs.length - 1].audio);
          setSongTitle(Songs[Songs.length - 1].title);
          setImage(Songs[Songs.length - 1].image);
          setSongArtist(Songs[Songs.length - 1].artist);
          setIsActive(true);
        } else {
          setAudio(Songs[index - 1].audio);
          setSongTitle(Songs[index - 1].title);
          setImage(Songs[index - 1].image);
          setSongArtist(Songs[index - 1].artist);
          setIsActive(true);
        }
      }
    });
  };

  const handleNext = () => {
    if (shuffle) {
      shuffleWihoutRepeat();
    } else {
      Songs.map((song, index) => {
        if (song.title === songTitle) {
          if (index === Songs.length - 1) {
            setAudio(Songs[0].audio);
            setSongTitle(Songs[0].title);
            setImage(Songs[0].image);
            setSongArtist(Songs[0].artist);
            setIsActive(true);
            setShuffle(false);
          } else {
            setAudio(Songs[index + 1].audio);
            setSongTitle(Songs[index + 1].title);
            setImage(Songs[index + 1].image);
            setSongArtist(Songs[index + 1].artist);
            setIsActive(true);
            setShuffle(false);
          }
        }
      });
    }
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
          src={image ? image : Songs[0].image}
          alt="cover"
        />
      </div>

      {/* Song Info */}

      <div className={styles.songInfo}>
        <p className={styles.songArtist}>{songArtist}</p>
        <p className={styles.songTitle}>{songTitle}</p>
      </div>

      {/* Audio Player Reference */}

      <audio
        ref={audioPlayer}
        src={audio ? audio : Songs[0].audio}
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
            !shuffle ? handlePrev() : null;
          }}
          className={`${shuffle ? styles.prevOffset : styles.timeControls}`}
          title="Previous Song"
        >
          <CgPlayTrackPrev />
        </button>
        <button
          className={styles.timeControls}
          onClick={backThirty}
          title="Back 30 Seconds"
        >
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
            }}
            title="Play/Pause"
            tabIndex={0}
          ></div>
        </div>

        {/* End of Play and Pause Button */}

        <button
          className={styles.timeControls}
          onClick={forwardThirty}
          title="Forward 30 Seconds"
        >
          <AiFillForward />
        </button>
        <button
          onClick={() => {
            handleNext();
          }}
          className={styles.timeControls}
          title="Next Song"
        >
          <CgPlayTrackNext />
        </button>
      </div>

      {/* Additionnal Controls */}

      <div className={styles.controls}>
        <button
          className={`${
            repeatSong ? styles.shuffleOff : styles.AdditionalControls
          } ${shuffle ? styles.ActiveShuffle : ""}`}
          title="Shuffle"
          onClick={() => {
            !repeatSong ? setShuffle(!shuffle) : setShuffle(false);
          }}
        >
          <TiArrowShuffle />
        </button>
        <button
          className={styles.heart}
          onClick={() => setHeartFill(!heartFill)}
          title="Favorite"
        >
          {heartFill ? (
            <AiOutlineHeart />
          ) : (
            <AiFillHeart style={{ color: "red" }} />
          )}
        </button>
        <button
          className={`${
            shuffle ? styles.RepeatOff : styles.AdditionalControls
          }`}
          onClick={() => {
            !shuffle ? setRepeatSong(!repeatSong) : setRepeatSong(false);
          }}
          title="Repeat Song"
        >
          {repeatSong ? <MdRepeatOne /> : <MdOutlineRepeat />}
        </button>
        <button
          className={styles.AdditionalControls}
          onClick={toggleMute}
          title="Mute/Unmute"
        >
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

// if (Songs[i].title == songTitle) {
//   if (i == Songs.length - 1) {
//     togglePlayPause();
//     timeTravel(0);
//     setIsActive(false);
//     return;
//   } else {
//     setCurrentTime(0);
//     setSongTitle(Songs[i + 1].title);
//     setSongArtist(Songs[i + 1].artist);
//     setImage(Songs[i + 1].image);
//     setAudio(Songs[i + 1].audio);
//     setIsActive(true);
//     setIsPlaying(true);
//     audioPlayer.current.play();
//     return;
//   }
// }
