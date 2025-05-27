"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';

const PasswordForm = ({  }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setPasswords({ current: '', new: '', confirm: '' });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña actual</label>
        <input
          type="password"
          name="current"
          value={passwords.current}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
        <input
          type="password"
          name="new"
          value={passwords.new}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
        <input
          type="password"
          name="confirm"
          value={passwords.confirm}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>
      
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        Cambiar contraseña
      </button>
    </form>
  );
};

export default PasswordForm;