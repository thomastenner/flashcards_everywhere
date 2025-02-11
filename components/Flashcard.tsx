'use client';

import { useState } from 'react';

interface FlashcardProps {
  id: string;
  front: string;
  back: string;
  onDelete?: (id: string) => void;
}

export default function Flashcard({ id, front, back, onDelete }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-64 h-40 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        <div className="absolute w-full h-full bg-white p-4 rounded-lg shadow-lg backface-hidden">
          <p className="text-center">{front}</p>
        </div>
        <div className="absolute w-full h-full bg-blue-100 p-4 rounded-lg shadow-lg backface-hidden rotate-y-180">
          <p className="text-center">{back}</p>
          {onDelete && (
            <button
              className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}