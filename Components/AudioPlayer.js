import React, { useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
import { CgPlayTrackPrev } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { GiSpeaker } from "react-icons/gi";
import { GiSpeakerOff } from "react-icons/gi";
import { MdOutlineRepeat } from "react-icons/md";
import { MdRepeatOne } from "react-icons/md";
import { TiArrowShuffle } from "react-icons/ti";

const AudioPlayer = (props) => {
  const {
    Songs,
    likes,
    isPlaying,
    duration,
    currentTime,
    audio,
    image,
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
    setRepeatSong,
    setMuted,
    setSongTitle,
    setSongArtist,
    setIsActive,
    setShuffle,
    setSongIds,
  } = props;

  const { togglePlayPause, LikeOrDislike, changeHeart } = props;

  let songIdsCopy = Songs.map((song) => song.id);

  // ! useEffect to handle the audio player

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);

    // ! current is a reference to the current item
    // ? max is the reference given by the progress bar

    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  // ! useEffect to handle the end of the audio, repeat song || play all songs in order || play all songs in random order

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
    } else if (audio && isPlaying) {
      setCurrentTime(0);
      audioPlayer.current.src = audio;
      audioPlayer.current.load(); // ? load the audio
      audioPlayer.current.play();
      timeTravel(0);
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

    // ! Removing the current song from the array the 1st time

    if (songIds.length === songIdsCopy.length) {
      for (let i = 0; i < Songs.length; i++) {
        if (Songs[i].title == songTitle) {
          songIds.splice(i, 1);
        }
      }
    }

    // ? Picking a random song from the array at pass the index to randomElement

    const randomElement = songIds[Math.floor(Math.random() * songIds.length)];
    const index = songIds.indexOf(randomElement);

    // ! Removing that random pick from the array so it won't be picked again

    if (index > -1) {
      songIds.splice(index, 1);
    }
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

  // const changeHeart = () => {
  //   for (let i = 0; i < likes.length; i++) {
  //     if (likes[i].title === songTitle) {
  //       if (likes[i].isLiked) {
  //         return (
  //           <AiFillHeart
  //             style={{
  //               color: "red",
  //             }}
  //           />
  //         );
  //       } else {
  //         return <AiOutlineHeart />;
  //       }
  //     }
  //   }
  // };

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

        <div className={styles.newButton}>
          <div className={styles.background}></div>
          <div
            className={isActive ? styles.activeIcon : styles.icon}
            width="200"
            height="200"
          >
            <div
              className={`${styles.part} ${
                isActive ? styles.activeLeft : styles.left
              }`}
              x="0"
              y="0"
            ></div>
            <div
              className={`${styles.part} ${
                isActive ? styles.activeRight : styles.right
              }`}
              x="0"
              y="0"
            ></div>
          </div>
          <div
            className={styles.pointer}
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
          onClick={() => LikeOrDislike(songTitle)}
          title="Favorite"
        >
          {changeHeart()}
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
    </div>
  );
};

export { AudioPlayer };
// ! the {} means that this is a named export
