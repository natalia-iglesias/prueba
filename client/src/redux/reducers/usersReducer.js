import { FETCH_USERS, CREATE_NEW_CONTACT } from '../actions/usersActions';

const initialState = {
  users: [],
  contact: [],
};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return { ...state, users: payload };
    case CREATE_NEW_CONTACT:
      console.log(state.contact);
      return { ...state, contact: [...state.contact, payload] };
    default:
      return { ...state };
  }
};
