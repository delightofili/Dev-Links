"use client";

import { getSocket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function CommentSection({
  linkId,
  initialComments,
  accessToken,
}) {
  const [comments, setComments] = useState(initialComments);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const socket = getSocket(accessToken);
    socket.emit("joinLink", linkId);

    socket.on("newComment", (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    socket.on("userTyping", ({ userId, isTyping }) => {
      setTypingUsers((prev) => {
        if (isTyping) {
          return [...new Set([...prev, userId])];
        } else {
          return prev.filter((id) => id !== userId);
        }
      });
    });
    return () => {
      socket.emit("leaveLink", linkId);

      socket.off("newComment");
      socket.off("userTyping");
    };
  }, [linkId, accessToken]);

  function handleTyping() {
    const socket = getSocket(accessToken);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { linkId, isTyping: true });
    }

    clearTimeout(window.typingTimeout);

    window.typingTimeoutv = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", { linkId, isTyping: false });
    }, 1000);
  }

  return (
    <div>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.user.name}</strong>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-500">
          {typingUsers.length === 1
            ? "Someone is typing..."
            : `${typingUsers.length} people are typing...`}
        </p>
      )}

      <textarea onChange={handleTyping} placeholder="Add a comment..." />
    </div>
  );
}
