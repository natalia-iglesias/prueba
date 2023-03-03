import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  useColorMode,
  HStack,
  Box,
  Link,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Profile from './Profile';

const Navbar = () => {
  const { colorMode } = useColorMode();

  return (
    <HStack
      bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
      justifyContent="space-between"
      alignItems="center"
      mb="1rem"
      pr="1rem"
    >
      <Box>
        <Link as={ReachLink} to="/home">
          <Image src="/images/logo.png" w="10rem" />
        </Link>
      </Box>

      <List display="flex" flexDir="row" gap="1rem">
        <ListItem
          as={ReachLink}
          to="/map"
          color={colorMode === 'light' ? 'green' : '#68D391'}
          fontWeight="semibold"
          fontSize="xl"
        >
          Mapa
        </ListItem>

        <ListItem color={colorMode === 'light' ? 'green' : '#68D391'}>
          <Menu>
            <MenuButton fontWeight="semibold" fontSize="xl">
              Puntos de reciclaje
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/entities"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Ver todos
              </MenuItem>
              <MenuItem
                as={ReachLink}
                to="/beVdV"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Publica tu punto de reciclaje
              </MenuItem>
            </MenuList>
          </Menu>
        </ListItem>

        <ListItem>
          <Menu>
            <MenuButton
              color={colorMode === 'light' ? 'green' : '#68D391'}
              fontWeight="semibold"
              fontSize="xl"
            >
              Contactanos
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/about"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Quienes somos
              </MenuItem>
              <MenuItem
                as={ReachLink}
                to="/contact"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Contacto
              </MenuItem>
            </MenuList>
          </Menu>
        </ListItem>
      </List>

      <Profile />
    </HStack>
  );
};

export default Navbar;
