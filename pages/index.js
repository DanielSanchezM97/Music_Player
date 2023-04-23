import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useRef, useEffect } from "react";
import { AudioPlayer } from "../Components/AudioPlayer";
import SongCards from "../Components/SongCards";
import Footer from "../Components/Footer";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  // ! Router.query is a function that returns the query object

  // ! state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [muted, setMuted] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [repeatSong, setRepeatSong] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [songBg, setSongBg] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [songIds, setSongIds] = useState([]);
  const [likes, setLikes] = useState([]);

  // ! refs

  const audioPlayer = useRef(); // ? reference to the audio component
  const progressBar = useRef(); // ? reference to the progress bar
  const animationRef = useRef(); // ? reference to the animation

  // ! set background in variables

  const rockabyeBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(42, 181, 206, 0.637) 0%,
    rgb(0, 0, 0) 90.1%
  )`;

  const devilInDisguiseBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(65, 63, 77, 0.527) 0%,
    rgb(0, 0, 0) 90.1%
  )`;

  const getLuckyBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(12, 3, 66, 0.747) 0%,
    rgb(0, 0, 0) 90.1%
  )`;

  const saveMeBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    #5f27cd 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const accidentallyInLoveBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(247, 213, 213, 0.527) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const youGetWhatYouGiveBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    #f9ca24 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const movesLikeJaggerBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(51, 51, 45, 0.527) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const amIWrongBg = `radial-gradient(
    circle 602px at 2.1% 5.1%,
    rgba(221, 151, 20, 0.911) 0%,
    rgba(0, 0, 0, 1) 90.1%
  )`;

  const background = [
    {
      title: "Rockabye",
      background: rockabyeBg,
    },
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

  const Songs = [
    {
      id: 1,
      title: "Rockabye",
      artist: "Clean Bandit",
      like: false,
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/26/CleanBanditWhatIsLove.png",
      audio: "../audios/Rockabye.mp3",
    },
    {
      id: 2,
      title: "(You're The) Devil in Disguise",
      artist: "Elvis Presley",
      like: false,
      image:
        "https://www.nacionrex.com/__export/1515365585499/sites/debate/img/2018/01/07/foto_de_portada_elvis.jpg_423682103.jpg",
      audio: "../audios/AudioElvis.mp3",
    },
    {
      id: 3,
      title: "Get Lucky feat. Pharrell Williams and Nile Rodgers",
      artist: "Daft Punk",
      like: false,
      image: "https://img.youtube.com/vi/h5EofwRzit0/hqdefault.jpg?rev=2.8.6.2",
      audio: "../audios/GetLucky.mp3",
    },
    {
      id: 4,
      title: "Save Me",
      artist: "Bruno Martini",
      like: false,
      image:
        "https://i1.sndcdn.com/artworks-fDl6pv6QSY5GATMI-NOVBYQ-t500x500.jpg",
      audio: "../audios/SaveMe.mp3",
    },
    {
      id: 5,
      title: "Accidentally in Love",
      artist: "Counting Crows",
      like: false,
      image:
        "https://www.gannett-cdn.com/-mm-/6adc9704e2926e2fdd103128da3a87abf86aee99/c=0-77-1742-2400/local/-/media/2016/09/07/Phoenix/Phoenix/636088629485674132-counting-crows-2.jpg",
      audio: "../audios/AccidentallyInLove.mp3",
    },
    {
      id: 6,
      title: "You Get What You Give",
      artist: "New Radicals",
      like: false,
      image:
        "https://i0.wp.com/www.alexurbanpop.com/wp-content/uploads/2019/08/New-Radicals-You-Get-What-You-Give.jpg?fit=1000%2C1000&ssl=1",
      audio: "../audios/YouGetWhatYouGive.mp3",
    },
    {
      id: 7,
      title: "Moves Like Jagger",
      artist: "Maroon 5",
      like: false,
      image:
        "https://p4.wallpaperbetter.com/wallpaper/819/67/757/maroon-5-band-members-look-wallpaper-preview.jpg",
      audio: "../audios/MovesLikeJagger.mp3",
    },
    {
      id: 8,
      title: "Am I Wrong",
      artist: "Nico & Vinz",
      like: false,
      image: "https://m.media-amazon.com/images/I/417OWNKAvZL.jpg",
      audio: "../audios/AmIWrong.mp3",
    },
  ];

  let Likes = [];
  Likes = Songs.map((song) => {
    return {
      id: song.id,
      title: song.title,
      isLiked: song.like,
    };
  });

  useEffect(() => {
    // ! passing the ids of the songs to the state
    setSongIds(Songs.map((song) => song.id));
    setSongArtist(Songs[0].artist);
    setSongTitle(Songs[0].title);
    setLikes(Likes);
  }, []);

  useEffect(() => {
    for (let i = 0; i < background.length; i++) {
      if (background[i].title === songTitle) {
        setSongBg(background[i].background);
      }
    }
  }, [songTitle]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      if (!isActive) {
        setIsActive(true);
      }
      audioPlayer.current.play();

      // ? requestAnimationFrame is a function that allows us to run a function
      // ? every frame of the animation

      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      if (isActive) {
        setIsActive(false);
      }
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  // ! function that runs while the song is playing

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;

    // changePlayerCurrentTime();
    setCurrentTime(progressBar.current.value);

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const declareProperties = (e) => {
    for (let i = 0; i < Songs.length; i++) {
      if (Songs[i].title === e) {
        setAudio(Songs[i].audio);
        setImage(Songs[i].image);
        setSongArtist(Songs[i].artist);
        setSongTitle(Songs[i].title);
        setIsActive(true);
      }
    }

    window.scrollTo(0, 0);
  };

  const LikeOrDislike = (e) => {
    setLikes(
      likes.map((like) =>
        like.title === e ? { ...like, isLiked: !like.isLiked } : like
      )
    );
  };

  const changeHeart = () => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].title === songTitle) {
        if (likes[i].isLiked) {
          return (
            <AiFillHeart
              style={{
                color: "red",
              }}
            />
          );
        } else {
          return <AiOutlineHeart />;
        }
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `${
          songBg
            ? songBg
            : "radial-gradient(circle 602px at 2.1% 5.1%,rgba(42, 181, 206, 0.637) 0%,rgb(0, 0, 0) 90.1%)"
        }`,
      }}
      // style={{ backgroundImage: songBg }}
      // className={styles.container}
    >
      <Head>
        <title>React Audio Player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AudioPlayer
          Songs={Songs}
          likes={likes}
          isPlaying={isPlaying}
          duration={duration}
          currentTime={currentTime}
          audio={audio}
          image={image}
          muted={muted}
          repeatSong={repeatSong}
          songTitle={songTitle}
          songArtist={songArtist}
          isActive={isActive}
          audioPlayer={audioPlayer}
          progressBar={progressBar}
          animationRef={animationRef}
          shuffle={shuffle}
          songIds={songIds}
          setIsPlaying={setIsPlaying}
          setDuration={setDuration}
          setCurrentTime={setCurrentTime}
          setAudio={setAudio}
          setImage={setImage}
          setRepeatSong={setRepeatSong}
          setMuted={setMuted}
          setSongTitle={setSongTitle}
          setSongArtist={setSongArtist}
          setIsActive={setIsActive}
          setShuffle={setShuffle}
          setSongIds={setSongIds}
          togglePlayPause={togglePlayPause}
          LikeOrDislike={LikeOrDislike}
          changeHeart={changeHeart}
        />
        <SongCards
          Songs={Songs}
          likes={likes}
          songTitle={songTitle}
          isActive={isActive}
          setShuffle={setShuffle}
          togglePlayPause={togglePlayPause}
          declareProperties={declareProperties}
          changeHeart={changeHeart}
        />
      </main>
      <Footer />
    </div>
  );
}
