import { useForm } from "react-hook-form";
import FormInput from "./components/FormInput";
import Header from "./components/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebse";

const formSchema = z.object({
  movieName: z.string().min(3).max(30),
  songName: z.string().min(3).max(50),
  yt_url: z.string().min(10).max(100),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [songs, setSongs] = useState([]);

  const SONG_COLLECTION = "songsList";
  const sendThistoServer = async (data) => {
    try {
      const docRef = await addDoc(collection(db, SONG_COLLECTION), data);
      console.log("Document written with ID:", docRef.id);
      alert(
        "Your Favourite Song Added...! Refresh the page to get your song 😉"
      );
    } catch (e) {
      console.error("Error adding document:", e);
    }
    reset();
  };

  const deleteSong = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this song?"
    );
    if (confirmation) {
      try {
        await deleteDoc(doc(db, SONG_COLLECTION, id));
        console.log("Document successfully deleted!");
        setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
      } catch (e) {
        console.error("Error deleting document:", e);
      }
    }
  };

  useEffect(() => {
    async function getDataFromFirebase() {
      const querySnapshot = await getDocs(collection(db, SONG_COLLECTION));
      setSongs(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      if (querySnapshot.docs.length === 0) {
        alert("No Record Found");
      }
    }
    getDataFromFirebase();
  }, []);

  return (
    <>
      <Header />
      <form
        action=""
        onSubmit={handleSubmit(sendThistoServer)}
        className="max-w-5xl p-5 space-y-5 mx-auto bg-blue-300 mt-4 rounded-md mb-4 "
      >
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.pixabay.com/photo/2021/11/25/05/20/cloud-storage-6822673_1280.png"
            alt=""
            className="w-20"
          />
          <p className="text-teal-800 font-semibold">
            Upload your favourite songs in cloud database...
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor="movieName" className="text-xl font-semibold">
            Enter your movie name
          </label>
          <FormInput
            name="movieName"
            type="text"
            placeholder="Enter the Movie Name"
            register={register("movieName")}
            error={errors.movieName}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="songName" className="text-xl font-semibold">
            Enter your song name
          </label>
          <FormInput
            name="songName"
            type="text"
            placeholder="Enter the Song Name"
            register={register("songName")}
            error={errors.songName}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="youtube_url" className="text-xl font-semibold">
            Enter the song youtube url link
          </label>
          <FormInput
            name="yt_url"
            type="url"
            placeholder="Paste the song youtube url link here...!"
            register={register("yt_url")}
            error={errors.yt_url}
          />
        </div>
        <div className="text-center">
          <button className="bg-teal-600 hover:bg-blue-500 hover:text-black p-3 rounded-lg font-semibold ">
            Upload Song
          </button>
        </div>
      </form>
      <section>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="  mx-auto text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100 ">
            <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Movie name
                </th>
                <th scope="col" className="px-6 py-3">
                  Song Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Youtube_Link
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr
                  key={song.id}
                  className="bg-blue-500 border-b border-blue-400"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    {song.movieName}
                  </th>
                  <td className="px-6 py-4">{song.songName}</td>
                  <td className="px-6 py-4">
                    <a href={song.yt_url} target="blank">
                      {song.yt_url}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteSong(song.id)}
                      className="font-medium text-white hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default App;
