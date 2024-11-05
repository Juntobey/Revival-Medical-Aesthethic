// src/components/Dashboard/HistoryModal.jsx
import React from "react";

const HistoryModal = ({ onClose, historyData }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4 text-darkgreen">History</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <div className="mt-4 space-y-4">
          {historyData && historyData.length > 0 ? (
            historyData.map((item, index) => (
              <div key={index} className="border-b pb-2">
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Type:</strong> {item.type}
                </p>
                <p>
                  <strong>Details:</strong> {item.details}
                </p>
              </div>
            ))
          ) : (
            <p>No history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
