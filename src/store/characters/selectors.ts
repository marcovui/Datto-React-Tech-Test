import { RootState } from 'store/types';

export const getCharactersList = (state: RootState) => state.characters.list;

export const getIsError = (state: RootState) => state.characters.isError;

export const getIsFetching = (state: RootState) => state.characters.isFetching;
