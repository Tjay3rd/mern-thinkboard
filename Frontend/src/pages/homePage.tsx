import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import RateLimitedUI from "../components/rateLimitedUI";
import api from "../components/utils";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect (() => {
  const fetchNotes = async () => {
    try {
      const response = await api.get('/');
      setNotes(response.data);
      setIsRateLimited(false);
      console.log(response);
    } catch (error) {
        console.error('Error fetching notes:', error);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        error.response.status === 429 ? setIsRateLimited(true) : toast.error('Failed to load notes');
      } finally {
          setIsLoading(false);
        }
  };
  fetchNotes();
}, [])

  return (
    <div className="relative min-h-screen">
      <Navbar/> 
      {isRateLimited &&<RateLimitedUI/>}   
      <div>
        {isLoading && <div className="text-center text-primary py-10">Loading Notes...</div>}
        {notes.length && !isRateLimited ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-24 py-8">
            {notes.map((note) => 
              (<NoteCard key={note._id} note={note} setNotes={setNotes}/>)
            )}
          </div>) : notes.length===0 && !isRateLimited && <NotesNotFound/>
        }
      </div>
    </div>
  )
}

export default HomePage;
