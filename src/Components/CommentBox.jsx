// src/components/CommentBox.jsx
import React, { useState, useEffect } from "react";
import { db } from "../Services/firebase";
import { ref, push, onValue } from "firebase/database";

const CommentBox = ({ label, userEmail }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const commentsRef = ref(db, `comments/${label}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsArray = Object.values(data);
        setAllComments(commentsArray);
      } else {
        setAllComments([]);
      }
    });

    return () => unsubscribe();
  }, [label]);

  const handleSubmit = () => {
    if (comment.trim() === "") return;

    const commentsRef = ref(db, `comments/${label}`);
    push(commentsRef, {
      user: userEmail,
      message: comment,
    });

    setComment("");
  };

  return (
    <div className="bg-gray-50 p-4 rounded shadow mt-4">
      <h3 className="font-semibold mb-2">🗒 Comments for {label}</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto text-sm">
        {allComments.map((c, i) => (
          <div key={i} className="bg-white p-2 border rounded">
            <strong>{c.user}</strong>: {c.message}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border p-2 rounded-l"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-3 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
