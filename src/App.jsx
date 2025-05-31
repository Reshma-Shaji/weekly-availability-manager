// import React, { useState, useEffect } from 'react';
// import DayAvailability from './Component/DayAvailability';

// const DAYS = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ];

// function App() {
//   const [availability, setAvailability] = useState({});
//   const [message, setMessage] = useState('');

//   // Fetch saved availability from localStorage or initialize empty availability
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem('availability');
//       if (saved) {
//         setAvailability(JSON.parse(saved));
//       } else {
//         const init = {};
//         DAYS.forEach(day => (init[day] = [])); // Initialize all days with empty slots
//         setAvailability(init);
//       }
//     } catch (error) {
//       console.error('Error fetching data from localStorage', error);
//     }
//   }, []);

//   // Add a new slot (start and end time) for a specific day
//   const handleAddSlot = day => {
//     setAvailability(prev => ({
//       ...prev,
//       [day]: [...prev[day], { start: '', end: '' }],
//     }));
//   };

//   // Remove a slot for a specific day and index
//   const handleRemoveSlot = (day, index) => {
//     setAvailability(prev => {
//       const updated = [...prev[day]];
//       updated.splice(index, 1);
//       return { ...prev, [day]: updated };
//     });
//   };

//   // Handle time changes for a specific slot (start or end time)
//   const handleChange = (day, index, field, value) => {
//     setAvailability(prev => {
//       const updated = [...prev[day]];
//       updated[index][field] = value;
//       return { ...prev, [day]: updated };
//     });
//   };

//   // Helper function to convert time to minutes for easy comparison
//   const toMinutes = time => {
//     const [h, m] = time.split(':').map(Number);
//     return h * 60 + m;
//   };

//   // Validation for time slots
//   const validateDay = slots => {
//     // Check if each slot has valid start < end
//     for (let slot of slots) {
//       if (
//         !slot.start ||
//         !slot.end ||
//         toMinutes(slot.start) >= toMinutes(slot.end)
//       ) {
//         return false;
//       }
//     }

//     // Check if there are no overlapping slots
//     const sorted = [...slots].sort(
//       (a, b) => toMinutes(a.start) - toMinutes(b.start)
//     );
//     for (let i = 0; i < sorted.length - 1; i++) {
//       if (toMinutes(sorted[i].end) > toMinutes(sorted[i + 1].start)) {
//         return false;
//       }
//     }
//     return true;
//   };

//   // Handle saving the availability to localStorage
//   const handleSave = () => {
//     // Validate all days' time slots
//     for (let day of DAYS) {
//       if (!validateDay(availability[day])) {
//         alert(`Invalid time slot in ${day}`);
//         return;
//       }
//     }
//     try {
//       localStorage.setItem('availability', JSON.stringify(availability));
//       setMessage('Availability saved!');
//       setTimeout(() => setMessage(''), 3000);
//     } catch (error) {
//       console.error('Error saving data to localStorage', error);
//     }
//   };

//   // Handle resetting all availability
//   const handleReset = () => {
//     if (window.confirm('Clear all availability?')) {
//       const cleared = {};
//       DAYS.forEach(day => (cleared[day] = []));
//       setAvailability(cleared);
//       localStorage.removeItem('availability');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Weekly Availability
//       </h1>
//       {DAYS.map(day => (
//         <DayAvailability
//           key={day}
//           day={day}
//           slots={availability[day]}
//           onAdd={() => handleAddSlot(day)}
//           onRemove={i => handleRemoveSlot(day, i)}
//           onChange={(i, field, value) => handleChange(day, i, field, value)}
//         />
//       ))}
//       <div className="flex gap-4 justify-center mt-6">
//         <button
//           onClick={handleSave}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Save
//         </button>
//         <button
//           onClick={handleReset}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Reset All
//         </button>
//       </div>
//       {message && <p className="text-green-600 text-center mt-4">{message}</p>}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Page/Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
