
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate} from "react-router-dom";
import api from "../components/utils";
import type { FormEvent, ChangeEvent } from "react";


function CreatePage () {

  const[title, setTitle] = useState('');
  const[content, setContent] = useState('');
  const[loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true)
    try {
      await api.post('/', {
        title,
        content
      })
      toast.success('Note created successfully');
      navigate('/')
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error('Failed to create note!')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeft className="size-5"/>
            Back to notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form id='create-form' onSubmit={() => handleSubmit}>
                <fieldset className="field flex flex-col gap-1 mb-4">
                  <label className="label">
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" 
                              placeholder="Note Title" 
                              className='input input-bordered w-full' 
                              value={title} 
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
                </fieldset>
                <fieldset className="field flex flex-col gap-1 mb-4">
                  <label className="label">
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea placeholder="Write your content here..." 
                                    className='textarea textarea-bordered w-full' 
                                    value={content} 
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
                </fieldset>
              </form>
              <div className="card-actions justify-end">
                <button form="create-form" type='submit' className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;
