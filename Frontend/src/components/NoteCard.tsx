import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import api, { formatDate } from "./utils";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction, MouseEvent } from "react";

interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

interface Props {
    note: Note;
    setNotes: Dispatch<SetStateAction<Note[]>>;
}

function NoteCard ({note, setNotes}: Props) {

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();

        if(!window.confirm('Are you sure you want to delete this note')) return;
        
        try {
            await api.delete(`/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success('Note deleted successfully')
        } catch (error) {
            console.error('Failed to delete note:', error)
            toast.error('Failed to delete note!') 
        }
    }

  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF90]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
                <div className="flex items-center gap-1">
                    <button className="btn btn-ghost btn-xs">
                        <PenSquareIcon className="size-6"/>
                    </button>
                    <button onClick={(e) => handleDelete(e, note._id)} className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon className="size-6"/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard;
