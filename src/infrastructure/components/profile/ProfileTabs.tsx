"use client";

import React, { Dispatch, SetStateAction, useState } from 'react';

const ProfileTabs = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: Dispatch<SetStateAction<string>> }) => {
  const tabs = [
    { id: 'profile', label: 'Perfil' },
    { id: 'password', label: 'Contraseña' },
    { id: 'comments', label: 'Comentarios' },
    { id: 'favorites', label: 'Favoritos' }
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-4 py-2 font-medium text-sm focus:outline-none ${
            activeTab === tab.id
              ? 'text-black border-b-2 border-black'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;