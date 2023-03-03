import {
  AUTH_ACOUNT_GOOGLE,
  AUTH_ACOUNT_LOCAL,
  LOGOUT_ACOUNT,
} from '../actions/acountActions';

const initialState = {
  acount: {},
};

export const acountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_ACOUNT_LOCAL:
      return { ...state, acount: payload };
    case AUTH_ACOUNT_GOOGLE:
      return { ...state, acount: payload };
    case LOGOUT_ACOUNT:
      return { ...state, acount: payload };
    default:
      return { ...state };
  }
};
