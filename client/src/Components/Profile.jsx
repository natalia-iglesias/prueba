import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';
import { logoutAcount } from '../redux/actions/acountActions';

const Profile = () => {
  const { acount } = useSelector((state) => state.acountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  if (!Object.entries(acount).length)
    return (
      <Button
        bg={colorMode === 'light' ? '#F5F2EB' : '#68D391'}
        onClick={() => navigate('/login')}
      >
        Iniciar Sesión
      </Button>
    );

  return (
    <Menu>
      <MenuButton>
        <Avatar
          name={`${acount.name} ${acount.last_name}`}
          src={acount.image}
        />
      </MenuButton>
      <MenuList>
        <MenuItem
          as={ReachLink}
          to={`/userprofile`}
          fontWeight={'700'}
          color={colorMode === 'light' ? 'green' : '#68D391'}
        >
          Mi perfil
        </MenuItem>
        <MenuItem
          as={ReachLink}
          to="/home"
          fontWeight={'700'}
          color={colorMode === 'light' ? 'green' : '#68D391'}
          onClick={() => dispatch(logoutAcount())}
        >
          Cerrar Sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
