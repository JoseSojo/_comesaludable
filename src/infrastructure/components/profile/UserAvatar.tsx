"use client";

import React from 'react';

const UserAvatar = ({ src, alt, size = "w-24 h-24" }: { src:string, alt:string, size?:string }) => {
  return (
    <div className={`${size} rounded-full overflow-hidden border-2 border-white shadow-lg`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;