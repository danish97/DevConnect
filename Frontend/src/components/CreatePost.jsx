import { useState } from "react"
import {useAuth} from '../context/AuthContext'
import {toast} from 'react-hot-toast'
import api from '../lib/axios'
import {Send} from 'lucide-react'

const CreatePost = ({onPostCreated}) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const {token, user} = useAuth();

  const handleSubmit = async (e) =>{   
    e.preventDefault();
    if(!content.trim()){
      toast.error('You cannot make an Empty post');
      return;
    }
    setLoading(true)
    try {
      const res = await api.post('/post', {content}, {Headers:{Authorization: `Bearer ${token}`}})
      toast.success("Post Created Succesfully")
      setContent('')
      if(onPostCreated) onPostCreated(res.data.post)
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'failed to create post')
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="bg-base-200 rounded-xl p-4 shadow-md mb-6">
      <form onSubmit={handleSubmit} className="flex flex-row align-middle items-center gap-4">
        <input
          type="text"
          value={content}
          placeholder={`What's on your mind, ${user?.username}?`}
          onChange={(e) => setContent(e.target.value)}
          className="input input-primary w-full"
        />
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary btn-sm flex items-center gap-2"
            disabled={loading}
          >
            <Send size={16} />
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
