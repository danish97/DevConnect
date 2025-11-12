import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const EditPostModal = ({ isOpen, onClose, post, onUpdate }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) setContent(post.content);
  }, [post]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Just call parent function
      await onUpdate(post._id, content);
      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="bg-base-100 rounded-2xl shadow-xl p-6 w-11/12 sm:w-[450px] border border-base-300 relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <h3 className="text-lg font-semibold text-base-content mb-3">
                Edit Post
              </h3>

              {/* Textarea */}
              <textarea
                className="textarea textarea-bordered w-full h-32 resize-none bg-base-200 text-base-content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditPostModal;
