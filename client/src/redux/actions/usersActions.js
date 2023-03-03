import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const CREATE_NEW_CONTACT = 'CREATE_NEW_CONTACT';

export const fetchUsers = () => {
  return async (dispatch) => {
    const res = await axios.get();
    const users = res.data;

    dispatch({ type: FETCH_USERS, payload: users });
  };
};

export const createNewContact = (contact) => {
  return async function (dispatch) {
    try {
      const res = await axios.post('/contact', contact);
      const message = res.data;
      let payload = {
        message,
        contact,
      };
      dispatch({ type: CREATE_NEW_CONTACT, payload: payload.contact });
      alert('Muchas gracias! Nos pondremos en contacto vía email.');
    } catch (error) {
      alert('No pudimos enviar tu comentario.');
      dispatch({ type: CREATE_NEW_CONTACT, payload: error.message });
    }
  };
};
