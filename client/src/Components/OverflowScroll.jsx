import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Card,
  CardBody,
  Text,
  Divider,
  Link,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Link as ReachLink } from 'react-router-dom';

function DashboardScroll({ type, id }) {
  const [arrayToRender, setArrayToRender] = useState();
  useEffect(() => {
    const Axios = axios.create({ baseURL: 'http://localhost:3001' });

    switch (type) {
      case 'userDonation':
        Axios.get(`/donation/user/${id}`).then((res) => {
          res.data.forEach((obj) => (obj.User = false));
          setArrayToRender(res.data);
        });
        break;
      case 'userService':
        Axios.get(`/service/user/${id}`).then((res) => {
          res.data.forEach((obj) => (obj.User = false));
          setArrayToRender(res.data);
        });
        break;
      case 'entityDonation':
        Axios.get(`/donation/vdv/${id}`).then((res) => {
          res.data.forEach((obj) => (obj.VdV = false));
          setArrayToRender(res.data);
        });
        break;
      case 'comment':
        setArrayToRender(commentArray);
        break;
    }
  }, []);

  return (
    <Box w="40vw" h="40vh" overflow="auto">
      <Flex overflowY="scroll" flexDirection="column" gap={'1rem'}>
        {arrayToRender?.map((item, i) => {
          let arreglo;
          if (item.rating) {
            arreglo = new Array(item.rating).fill(<StarIcon />);
          }

          return (
            <div key={i}>
              <Flex direction="row">
                <Card w="full">
                  <CardBody>
                    <Text>
                      {item.name && `${item.name} /`}
                      {item.amount && `$${item.amount} /`}
                      {item.User && `${item.User.name} ${item.User.last_name}/`}
                      {item.date && `${item.date} /`}
                      {item.VdV && (
                        <Link as={ReachLink} to={`/entitie/${item.VdVId}`}>
                          {item.VdV.name}
                        </Link>
                      )}

                      {item.serviceType && `${item.serviceType} /`}
                      {item.content && item.content}
                    </Text>
                    {item.rating && arreglo}
                  </CardBody>
                </Card>
              </Flex>
              <Divider />
            </div>
          );
        })}
      </Flex>
    </Box>
  );
}

export default DashboardScroll;

const commentArray = [
  {
    content: 'UNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNOUNO',
    rating: 3,
  },
  {
    content: 'DOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOSDOS',
    rating: 1,
  },
  {
    content:
      'TRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRESTRES',
    rating: 5,
  },
];

const donationArray = [
  {
    name: 'Pepito Sanchez',
    date: '22/7/22',
    entity: 'Entidad 1111',
  },
  {
    name: 'Carlos Carlos',
    date: '12/2/21',
    entity: 'Entidad 22222',
  },
  {
    name: 'Shakira',
    date: '4/12/20',
    entity: 'Entidad 333333',
  },
  {
    name: 'Carola Reina',
    date: '8/1/19',
    entity: 'Entidad 22222',
  },
  {
    name: 'Andrea del Boca',
    date: '1/3/23',
    entity: 'Entidad 444444',
  },
];

const servicesArray = [
  {
    name: 'Pepito Sanchez',
    date: '22/7/22',
    serviceType: 'Semanal',
  },
  {
    name: 'Carlos Carlos',
    date: '12/2/21',
    serviceType: 'Individual',
  },
  {
    name: 'Shakira',
    date: '4/12/20',
    serviceType: 'Semanal',
  },
  {
    name: 'Carola Reina',
    date: '8/1/19',
    serviceType: 'Individual',
  },
  {
    name: 'Andrea del Boca',
    date: '1/3/23',
    serviceType: 'Individual',
  },
];
