import { useState } from 'react';
import OverflowScroll from '../../Components/OverflowScroll';
import { deleteUser, updateUser } from './userProfileFunctions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { BiUser, BiUserX, BiImage } from 'react-icons/bi';

function UserProfile() {
  const { acount } = useSelector((state) => state.acountReducer);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: acount?.name,
    mail: acount?.mail,
    password: acount?.password,
    image: acount?.image,
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleShow = (e) => setShow(!show);

  const handleSaveChanges = () => {
    updateUser(acount?.id, input);
  };

  const handleCancelChanges = () => {
    setInput({
      name: acount?.name,
      mail: acount?.mail,
      password: acount?.password,
      image: acount?.image,
    });
  };

  const handleDeleteUser = () => {
    deleteUser(acount?.id, navigate);
  };

  if (!Object.entries(acount).length) return navigate('/login');

  return (
    <Grid templateColumns={'repeat(2, 1fr)'} gap="1rem">
      <GridItem>
        <Heading mb={'1rem'}>Información del usuario</Heading>
        <Box my="1rem">
          <Text>Nombre</Text>
          <InputGroup>
            <InputLeftElement children={<BiUser />} />
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Mail</Text>
          <InputGroup>
            <InputLeftElement children={<AtSignIcon />} />
            <Input
              type="email"
              name="mail"
              value={input.mail}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Contraseña</Text>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              type={show ? 'text' : 'password'}
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleShow}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Imagen</Text>
          <InputGroup>
            <InputLeftElement children={<BiImage />} />
            <Input name="iamge" value={input.image} onChange={handleChange} />
          </InputGroup>
        </Box>

        <ButtonGroup
          variant={'outline'}
          w="full"
          justifyContent={'center'}
          mt="1rem"
        >
          <Button colorScheme={'green'} w="40%" onClick={handleSaveChanges}>
            Guardar
          </Button>
          <Button colorScheme={'blue'} w="40%" onClick={handleCancelChanges}>
            Cancelar
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme={'red'} w="40%" leftIcon={<BiUserX />}>
                Eliminar usuario
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="bold" pr={'2rem'}>
                Estas seguro de que deseas eliminar tu usuario de forma
                definitiva?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                ⚠️ Una vez que elimines tu usuario todos tus datos seran
                eliminados de nuestra base de datos sin posibildad de ser
                recuperados
              </PopoverBody>
              <Button colorScheme={'red'} onClick={handleDeleteUser}>
                Confirmar
              </Button>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </GridItem>

      <GridItem>
        <Heading>Donaciones</Heading>
        <OverflowScroll type="userDonation" id={acount?.id} />
        <Heading>Servicios</Heading>
        <OverflowScroll type="userService" id={acount?.id} />
      </GridItem>
    </Grid>
  );
}

export default UserProfile;
