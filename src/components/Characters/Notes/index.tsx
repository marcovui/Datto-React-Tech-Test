import React from 'react';
import { NoteItem } from 'store/characters/types';

import { CreateNote } from './CreateNote';
import { NoteList } from './NoteList';

export const Notes: React.FC<NoteItem> = ({ id, notes }) => {
  return (
    <>
      <CreateNote id={id} />
      <NoteList notes={notes} />
    </>
  );
};
