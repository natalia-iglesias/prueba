import axios from 'axios';

const deleteUser = (id, navigate) => {
  axios.delete(`/user/${id}`).then(() => {
    window.alert('El usuario a sido borrado');
    navigate('/home');
  });
};

const updateUser = (id, input) => {
  try {
    axios.put(`/user/${id}`, input).then(() => {
      window.alert('Los cambios se han guardado exitosamente');
    });
  } catch (error) {
    window.alert(error);
  }
};

export { deleteUser, updateUser };
