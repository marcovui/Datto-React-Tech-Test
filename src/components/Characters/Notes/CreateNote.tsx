import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { addNote } from 'store/characters';
import { useDispatch } from 'react-redux';

import { Id } from 'store/characters/types';

export const CreateNote: React.FC<Id> = ({ id }) => {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const dispatch = useDispatch();

  const [note, setNote] = useState('');

  useEffect(() => {
    setNote('');
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleOnClick = () => {
    if (note.trim() === '') {
      focusInput();
      setNote('');
      return false;
    }

    dispatch(addNote({ id, note }));

    setNote('');
    focusInput();
    return true;
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleOnClick();
    }
  };

  return (
    <div className="create-note">
      <input
        type="text"
        ref={inputRef}
        value={note}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="create-note__input"
        aria-label="Note"
      />
      <button type="button" className="btn btn--add" onClick={handleOnClick}>
        Leave a note
      </button>
    </div>
  );
};
