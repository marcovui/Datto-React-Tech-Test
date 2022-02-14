import React, { useEffect } from 'react';

import { getCharacters } from 'store/characters';
import {
  getCharactersList,
  getIsError,
  getIsFetching,
} from 'store/characters/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Character } from './Character';

export const Characters: React.FC<{}> = () => {
  const charactersList = useSelector(getCharactersList);
  const isFetching = useSelector(getIsFetching);
  const isError = useSelector(getIsError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  return (
    <div className="characters">
      {isError ? (
        <div className="characters__error">
          An error occured while loading characters, please try later.
        </div>
      ) : (
        <>
          <h1 className="characters__title">Characters:</h1>
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <ul className="characters__list">
              {charactersList.map(({ id, ...rest }) => (
                <Character key={`character-form${id}`} id={id} {...rest} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
