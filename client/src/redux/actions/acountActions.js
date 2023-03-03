import axios from 'axios';

export const AUTH_ACOUNT_LOCAL = 'AUTH_ACOUNT_LOCAL';
export const AUTH_ACOUNT_GOOGLE = 'AUTH_ACOUNT_GOOGLE';
export const LOGOUT_ACOUNT = 'LOGOUT_ACOUNT';

export const authAcountLocal = ({ mail, password }) => {
  return async (dispatch) => {
    try {
      const auth = await axios.post('/login', {
        mail: mail,
        password: password,
      });

      const { token } = await auth.data;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //local storage
      console.log(auth);
      localStorage.setItem('LogedUser', JSON.stringify(auth.data));

      const acount = await axios.get(
        `/login?mail=${mail}`,
        config
      );

      dispatch({ type: AUTH_ACOUNT_LOCAL, payload: acount.data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const authAcountGoogle = () => {
  return async (dispatch) => {
    try {
      const auth = await axios.get('/login/google');

      dispatch({ type: AUTH_ACOUNT_GOOGLE, payload: auth.data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const logoutAcount = () => {
  return async (dispatch) => {
    try {
      await axios.get('/logout');

      dispatch({ type: LOGOUT_ACOUNT, payload: {} });
    } catch (error) {
      dispatch({ type: LOGOUT_ACOUNT, payload: {} });
    }
  };
};
