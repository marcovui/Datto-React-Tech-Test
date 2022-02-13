import React from 'react';
import { shallow } from 'enzyme';

import { Character } from './index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe('<Character/>', () => {
  test('It renders correctly', () => {
    const props = {
      id: 0,
      name: 'my name',
      birthYear: 'my date of birth',
      gender: 'my gender',
      height: 182,
      notes: [],
    };
    const target = shallow(<Character {...props} />);
    expect(target).toMatchSnapshot();
  });
});
