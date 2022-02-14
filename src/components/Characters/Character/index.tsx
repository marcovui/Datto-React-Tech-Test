import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { editCharacter, deleteCharacter } from 'store/characters';

import { Character as CharacterType } from 'store/characters/types';

import { Notes } from '../Notes';

export const Character: React.FC<CharacterType> = ({
  id,
  name,
  birthYear,
  gender,
  height,
  notes,
}) => {
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (!isUpdated) return;

    setTimeout(() => {
      setIsUpdated(false);
    }, 5000);
  }, [isUpdated]);

  const onSubmit = (data: any) => {
    dispatch(editCharacter(data));
    // setting the state of the updated character manually
    // as there is no need to save data in DB for the exercise.
    setIsUpdated(true);
  };

  return (
    <li className="character">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} defaultValue={id} />
        <fieldset>
          <div className="character__entry">
            <label className="character__label" htmlFor={`name-${id}`}>
              Name:
            </label>
            <input
              type="text"
              className={`form-control character__input${
                errors.name ? ' form-control--error' : ''
              }`}
              id={`name-${id}`}
              {...register('name', { required: true })}
              defaultValue={name}
            />
            {errors.name && (
              <div className="invalid-feedback">Name is required</div>
            )}
          </div>
          <div className="character__entry">
            <label className="character__label" htmlFor={`birth-year-${id}`}>
              Date of birth:
            </label>
            <input
              type="text"
              className={`form-control character__input${
                errors.birthYear ? ' form-control--error' : ''
              }`}
              id={`birth-year-${id}`}
              {...register('birthYear', { required: true })}
              defaultValue={birthYear}
            />
            {errors.birthYear && (
              <div className="invalid-feedback">Date of birth is required</div>
            )}
          </div>
          <div className="character__entry">
            <label className="character__label" htmlFor={`gender-${id}`}>
              Gender:
            </label>
            <select
              className={`form-control character__input${
                errors.gender ? ' form-control--error' : ''
              }`}
              id={`gender-${id}`}
              {...register('gender', { required: true })}
              defaultValue={gender}
            >
              {/* 
                the option values here should be of type number.
                For the purpose of this exercise I am just going
                to use the values associated with property gender
                (female, male and n/a). 
              */}
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="n/a">n/a</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">Gender is required</div>
            )}
          </div>
          <div className="character__entry">
            <label className="character__label" htmlFor={`height-${id}`}>
              Height:
            </label>
            <input
              type="text"
              className={`form-control character__input${
                errors.height ? ' form-control--error' : ''
              }`}
              id={`height-${id}`}
              {...register('height', {
                required: true,
                pattern: /^[0-9]*$/,
              })}
              defaultValue={height}
            />
            {errors.height && (
              <div className="invalid-feedback">
                {errors.height?.type === 'required' && (
                  <span>Height is required</span>
                )}
                {errors.height?.type === 'pattern' && (
                  <span>Height is a number only field</span>
                )}
              </div>
            )}
          </div>
        </fieldset>
        <div className="btn__group btn__group--inverse">
          <span
            className={`character__updated${
              isUpdated ? ' character__updated--show' : ''
            }`}
          >
            Character updated successfully!
          </span>
          <button type="submit" className="btn btn--edit">
            Edit
          </button>
          <button
            type="button"
            className="btn btn--delete"
            onClick={() => dispatch(deleteCharacter(id))}
          >
            Delete
          </button>
        </div>
      </form>
      <Notes id={id} notes={notes} />
    </li>
  );
};
