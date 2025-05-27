"use client";

import { CommentCreate } from '@/infrastructure/interface/interactions/coment.type';
import React from 'react';

const CommentsList = ({ comments }: { comments: CommentCreate[] }) => {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.name} className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-800">{comment.name}</p>
          <p className="text-sm text-gray-500 mt-2">{comment.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;