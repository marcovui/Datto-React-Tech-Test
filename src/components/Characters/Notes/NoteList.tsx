import React from 'react';
import { Note } from 'store/characters/types';

interface Props {
  notes: Note[];
}

export const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <>
      {notes.length > 0 && (
        <ul className="notes-list">
          {notes.map(({ text }, index) => (
            <li key={`note-${index}`} className="notes-list__item">
              {text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
