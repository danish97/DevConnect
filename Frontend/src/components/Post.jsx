import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  Edit,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Trash2,
} from "lucide-react";

const Post = ({ post, onDelete, onEdit }) => {
  const { user, token } = useAuth();
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(post.likes || []);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editContent, setEditContent] = useState('')
  const currentUserId = user?._id;
  const isLiked = currentUserId ? likes.includes(currentUserId) : false;
  const isOwner = user?._id === post.user?._id;

  useEffect(() =>{
    if(showEditModal){
      setEditContent(post.content)
    }
  }, [showEditModal, post.content])

  const createdAt = post?.createdAt;
  const createdAtStr = createdAt ? new Date(createdAt).toLocaleString() : "";

  const handleLike = async () => {
    if (!token) return toast.error("You must be logged in");
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await api.put(
        `/post/${post._id}/like`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedLikes = isLiked
      ? likes.filter(id => id !== currentUserId)
      : [...likes, currentUserId];
      setLikes(updatedLikes);
    } catch (err) {
      console.error(err);
      toast.error("Something Went Wrong");
    } finally {
      setIsLiking(false);
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("You must be logged in");
    if (!commentText.trim()) return;

    setIsCommenting(true);
    try {
      const res = await api.post(
        `/post/${post._id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Comment response:", res.data);

      setComments(res.data.post?.comments);
      setCommentText("");
      toast.success("Comment added!");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't post comment");
    } finally {
      setIsCommenting(false);
    }
  };
  return (
    <article className="bg-base-200 rounded-2xl shadow-sm p-4 mb-4 border border-base-300">
      {/* header */}
      <header className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-base-content">
            {post.user?.username || "Unknown"}
          </p>
          <span className="date text-sm text-muted">{createdAtStr}</span>
        </div>
        {isOwner && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              <MoreHorizontal className="w-5 h-5 text-base-content/70" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-40 menu p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li>
                <button
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Edit Post
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowConfirm(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-error" /> Delete Post
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>
      {/* content */}
      <div className="mb-3">
        <p className="text-base text-base-content/90 whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      {/* Actions */}

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className="inline-flex items-center gap-2 btn btn-ghost btn-sm"
            aria-pressed={isLiked}
            title={isLiked ? "Unlike" : "Like"}
          >
            <Heart
              size={18}
              className={
                isLiked ? "text-error fill-error" : "text-muted-foreground"
              }
            />
            <span className="text-base-content">{likes?.length || 0}</span>
          </button>
          <div className="inline-flex items-center gap-2">
            <MessageCircle size={18} className="text-muted-foreground" />
            <span className="text-base-content">
              {comments?.length ?? 0}
            </span>{" "}
            {/* changed code */}
          </div>
        </div>
      </div>
      <form onSubmit={handleComment} className="flex gap-2 justify-between">
        <input
          className="input input-bordered w-full"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button className="btn btn-primary btn-circle" disabled={isCommenting}>
          <Send size={18} />
        </button>
      </form>

      {comments?.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-base-300 pt-3">
          <span className="text-sm text-base-content/40">Comments</span>
          {comments.map((comment) => (
            <div key={comment._id} className="text-sm">
              <span className="font-medium text-base-content">
                {comment.user?.username ||
                  (comment.user === user?._id ? user.username : "User")}
              </span>
              <span className="text-base-content/80">- {comment.text}</span>
            </div>
          ))}
        </div>
      )}
      {/* Delete post modal */}
      {showConfirm && (
        <dialog open className="modal">
          <div className="modal-box bg-base-100 text-base-content">
            <h3 className="text-lg font-bold">Delete Post</h3>
            <p className="py-3">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  setShowConfirm(false);
                  onDelete(post._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
      {showEditModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-base-200 animate-fadeIn">
            <h3 className="font-bold text-lg">Edit Post</h3>
            <textarea
              className="textarea textarea-bordered w-full mt-3"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={()=>{
                  setShowEditModal(false);
                  onEdit(post._id, editContent)
                }}
                
              >
                Save
              </button>
              <button className="btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
};

export default Post;