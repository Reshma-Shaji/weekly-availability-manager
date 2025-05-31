import React, { useState, useEffect } from 'react';
import DayAvailability from '../Component/DayAvailability';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CiSaveDown2 } from 'react-icons/ci';
import { RiResetLeftLine } from 'react-icons/ri';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const isOverlapping = (slots, newSlot, indexToIgnore = -1) => {
  const newStart = new Date(`2024-01-01T${newSlot.start}`);
  const newEnd = new Date(`2024-01-01T${newSlot.end}`);
  if (newEnd <= newStart) return true;

  for (let i = 0; i < slots.length; i++) {
    if (i === indexToIgnore) continue;
    const slot = slots[i];
    if (!slot.start || !slot.end) continue;

    const existingStart = new Date(`2024-01-01T${slot.start}`);
    const existingEnd = new Date(`2024-01-01T${slot.end}`);

    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};

const Home = () => {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('availability');
    if (data) setAvailability(JSON.parse(data));
    else {
      const defaultAvailability = {};
      DAYS.forEach(day => (defaultAvailability[day] = []));
      setAvailability(defaultAvailability);
    }
  }, []);

  const handleAddSlot = day => {
    setAvailability(prev => ({
      ...prev,
      [day]: [...prev[day], { start: '', end: '' }],
    }));
  };

  const handleRemoveSlot = (day, index) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  // const handleChangeSlot = (day, index, field, value) => {
  //   const updatedSlots = [...availability[day]];
  //   updatedSlots[index][field] = value;
  //   setAvailability(prev => ({ ...prev, [day]: updatedSlots }));
  // };

  const handleChangeSlot = (day, index, field, value) => {
    const updatedSlots = [...availability[day]];
    updatedSlots[index] = {
      ...updatedSlots[index],
      [field]: value,
    };

    const currentSlot = updatedSlots[index];
    if (currentSlot.start && currentSlot.end) {
      const isOverlap = isOverlapping(updatedSlots, currentSlot, index);
      if (isOverlap) {
        alert('❌ This time slot overlaps with another or is invalid!');
        return; // Prevent saving overlapping slot
      }
    }

    setAvailability(prev => ({
      ...prev,
      [day]: updatedSlots,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('availability', JSON.stringify(availability));
    alert('Saved successfully!');
  };

  const handleReset = () => {
    const cleared = {};
    DAYS.forEach(day => (cleared[day] = []));
    setAvailability(cleared);
    localStorage.removeItem('availability');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-6 ">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#3a3a3a]">
        Weekly Availability Manager
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="w-full lg:w-[300px] bg-[#fff5d9] rounded-xl shadow-lg p-6 ml-0 lg:ml-12">
          <h2 className="text-center text-2xl font-semibold text-[#b88986] mb-6">
            Booking Slots
          </h2>
          <Calendar className="react-calendar" />

          <div className="mt-10 flex flex-col gap-4">
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <CiSaveDown2 size={22} />
              <span className="text-lg font-medium">Save</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <RiResetLeftLine size={20} />
              <span className="text-lg font-medium">Reset All</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
          {DAYS.map(day => (
            <DayAvailability
              key={day}
              day={day}
              slots={availability[day] || []}
              onAdd={() => handleAddSlot(day)}
              onRemove={index => handleRemoveSlot(day, index)}
              onChange={(index, field, value) =>
                handleChangeSlot(day, index, field, value)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
