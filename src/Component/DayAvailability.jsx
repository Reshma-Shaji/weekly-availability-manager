import React from 'react';
import TimeSlot from './TimeSlot';
import { IoMdAdd } from 'react-icons/io';

function DayAvailability({ day, slots, onAdd, onRemove, onChange }) {
  return (
    <div className="bg-[#fff5d9] p-6 rounded-md shadow-md w-full md:w-[300px] flex flex-col gap-4">
      <h2 className="text-xl font-semibold bg-[#f2a779a1] text-center py-2 px-4 rounded-md">
        {day}
      </h2>

      <div className="flex flex-col gap-4">
        {slots.map((slot, index) => (
          <TimeSlot
            key={index}
            index={index}
            start={slot.start}
            end={slot.end}
            onChange={(field, value) => onChange(index, field, value)}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>

      <button
        onClick={onAdd}
        className="bg-[#c26059ad] text-white py-2 px-2 rounded-md hover:bg-[#c2605984] self-center flex items-center justify-center gap-1"
      >
        <IoMdAdd className="text-xl" />
        Add Time Slot
      </button>
    </div>
  );
}

export default DayAvailability;
