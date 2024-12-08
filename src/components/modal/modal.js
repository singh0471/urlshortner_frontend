import React from 'react';

const Modal = ({ title, message, onConfirm, onCancel }) => (
  <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
