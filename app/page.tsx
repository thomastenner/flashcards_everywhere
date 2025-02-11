'use client';

import { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcard';

interface FlashcardType {
  id: string;
  front: string;
  back: string;
  folderId: string;
}

interface Folder {
  id: string;
  name: string;
}

export default function Home() {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    fetchFolders();
    fetchFlashcards();
  }, []);

  const fetchFolders = async () => {
    const response = await fetch('/api/folders');
    const data = await response.json();
    setFolders(data);
  };

  const fetchFlashcards = async () => {
    const response = await fetch('/api/flashcards');
    const data = await response.json();
    setFlashcards(data);
  };

  const addFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFolder) return;

    const response = await fetch('/api/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        front: newCardFront,
        back: newCardBack,
        folderId: selectedFolder,
      }),
    });

    if (response.ok) {
      setNewCardFront('');
      setNewCardBack('');
      fetchFlashcards();
    }
  };

  const addFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newFolderName,
      }),
    });

    if (response.ok) {
      setNewFolderName('');
      fetchFolders();
    }
  };

  const deleteFlashcard = async (id: string) => {
    const response = await fetch(`/api/flashcards/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchFlashcards();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Flashcards Everywhere</h1>
      
      {/* Folder Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Folders</h2>
        <form onSubmit={addFolder} className="mb-4">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New Folder Name"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Folder
          </button>
        </form>
        <div className="flex gap-2 mb-4">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`px-4 py-2 rounded ${
                selectedFolder === folder.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {folder.name}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard Creation */}
      {selectedFolder && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Flashcard</h2>
          <form onSubmit={addFlashcard} className="space-y-4">
            <div>
              <input
                type="text"
                value={newCardFront}
                onChange={(e) => setNewCardFront(e.target.value)}
                placeholder="Front of card"
                className="border p-2 w-full"
              />
            </div>
            <div>
              <input
                type="text"
                value={newCardBack}
                onChange={(e) => setNewCardBack(e.target.value)}
                placeholder="Back of card"
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Add Flashcard
            </button>
          </form>
        </div>
      )}

      {/* Flashcards Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards
          .filter((card) => !selectedFolder || card.folderId === selectedFolder)
          .map((card) => (
            <Flashcard
              key={card.id}
              id={card.id}
              front={card.front}
              back={card.back}
              onDelete={deleteFlashcard}
            />
          ))}
      </div>
    </div>
  );
}