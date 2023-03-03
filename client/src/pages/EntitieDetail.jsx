import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import PropagateLoader from 'react-spinners/PropagateLoader';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import RankingStars from '../Components/RankingStars';
import {
  getEntityById,
  getEntityFeedbacks,
} from '../redux/actions/entitiesActions';

const EntityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntityById(id));
    dispatch(getEntityFeedbacks(id));
  }, [id]);

  const { entity, feedbacks } = useSelector((state) => state.entitiesReducer);

  if (!entity || !feedbacks) return <PropagateLoader color="#1c5738" />;

  const [inputMonto, setInputMonto] = useState('');

  const handleInputs = (event) => {
    setInputMonto(event.target.value);
  };

  const handleButton = (event) => {
    if (inputMonto) {
      try {
        axios
          .post('/donation', {
            VdVId: id,
            amount: inputMonto,
            UserId: 1,
          }) // userId LocalStorage
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      alert('ingrese monto');
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'}>
      <GridItem>
        <VStack ml="1rem">
          <Image src={entity.img} maxHeight="35%" maxWidth="50%" />
          <InputGroup>
            <InputLeftElement children={<MdOutlineAttachMoney />} />
            <Input
              name="Monto"
              placeholder="Monto"
              type={'number'}
              onChange={handleInputs}
            />
            <Button onClick={handleButton}>Donar</Button>
          </InputGroup>
        </VStack>
      </GridItem>
      <GridItem>
        <Heading>{entity.name}</Heading>
        <HStack my="1rem">
          {entity.Materials?.map(({ name }, i) => (
            <Badge key={i} variant="solid" colorScheme="green">
              {name}
            </Badge>
          ))}
        </HStack>
        <Text fontSize={'lg'} lineHeight="8">
          {entity.description}
        </Text>

        <Stack mt="1rem">
          <Heading fontSize={'lg'}>Reseñas</Heading>
          <Divider />
          <VStack
            alignItems="flex-start"
            overflowY={'scroll'}
            maxH="25vh"
            divider={<StackDivider />}
          >
            {feedbacks?.map(({ User, rating, comment }, i) => (
              <Box key={i}>
                <HStack>
                  <Avatar name={User.name} size="sm" />
                  <RankingStars stars={rating} />
                </HStack>
                <Text>{comment}</Text>
              </Box>
            ))}
          </VStack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default EntityDetail;
