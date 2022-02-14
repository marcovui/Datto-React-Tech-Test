export type Gender = 'female' | 'male' | 'n/a';

export type FormValues = {
  height: string;
  birthYear: string;
  name: string;
  gender: Gender;
};

export type Id = {
  id: number;
};

export interface Note {
  text: string;
}

export interface NoteItem extends Id {
  notes: Note[];
}

export interface PartialCharacter {
  name: string;
  gender: Gender;
  height: number;
}

// The api is returning an array of Characters with a propertie not formatted with camelCase convention.
export interface CharacterApi extends PartialCharacter {
  birth_year: string;
}

// The unformatted propertie is converted with camelCase convention before being stored.
export interface Character extends Id, PartialCharacter {
  birthYear: string;
  notes: Note[];
}

export interface Slice {
  list: Character[];
  isFetching: boolean;
  isError: boolean;
}
