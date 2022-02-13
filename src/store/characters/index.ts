import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Thunk } from 'store/types';
import { CharacterApi, Character, Slice } from './types';

export const initialState: Slice = {
  list: [],
  isFetching: false,
  isError: false,
};

const slice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchRequest(state) {
      state.isFetching = true;
    },
    fetchSuccess(state, action: PayloadAction<Character[]>) {
      state.isFetching = false;
      state.isError = false;
      state.list = action.payload.map((character) => ({
        ...character,
        notes: [],
      }));
    },
    fetchFailure(state) {
      state.isFetching = false;
      state.isError = true;
    },
    deleteCharacter(state, action: PayloadAction<number>) {
      state.list = state.list.filter(
        (character) => character.id !== action.payload
      );
    },
    editCharacter(state, action: PayloadAction<Character>) {
      const { id } = action.payload;
      state.list = state.list.map((character) => {
        const { id: characterId, notes } = character;
        return characterId === id
          ? {
              ...action.payload,
              notes,
            }
          : {
              ...character,
            };
      });
    },
    addNote(state, action: PayloadAction<{ id: number; note: string }>) {
      const { id, note } = action.payload;
      state.list = state.list.map((character) => {
        const { id: characterId, notes: characterNotes } = character;

        return characterId === id
          ? {
              ...character,
              notes: [...characterNotes, { text: note }],
            }
          : character;
      });
    },
  },
});

export const { reducer } = slice;

export const {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  deleteCharacter,
  editCharacter,
  addNote,
} = slice.actions;

export const getCharacters = (): Thunk => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const { data } = await axios.get('https://swapi.dev/api/people');
      const { results } = data;
      if (!results) throw new Error('missing results from API /people');
      const characters = results.map(
        (
          { name, birth_year: birthYear, gender, height }: CharacterApi,
          index: number
        ): Character => ({
          id: index,
          name,
          birthYear,
          gender,
          height,
          notes: [],
        })
      );
      dispatch(fetchSuccess(characters));
    } catch (e) {
      dispatch(fetchFailure());
      console.error(e);
    }
  };
};
