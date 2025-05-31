import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

function TimeSlot({ index, start, end, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Start</label>
      <input
        type="time"
        value={start}
        onChange={e => onChange('start', e.target.value)}
        className="outline-none"
      />
      <label className="text-sm">End</label>
      <input
        type="time"
        value={end}
        onChange={e => onChange('end', e.target.value)}
        className="outline-none"
      />
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 text-lg ml-2"
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
}

export default TimeSlot;
