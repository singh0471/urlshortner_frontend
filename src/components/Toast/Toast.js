// components/Toast.js
'use client'
import React from 'react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-md shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
