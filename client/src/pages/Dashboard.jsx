import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import TabListPosts from '../Components/TabListPosts';
import OverflowScroll from '../Components/OverflowScroll';
import DashboardRequest from '../Components/DashboardRequest';

const Dashboard = () => {
  return (
    <Flex direction="row" justify="space-evenly">
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Reseñas
        </Heading>
        <OverflowScroll type="comment" />
        <Heading align="center" m="3vh">
          Posts
        </Heading>
        <TabListPosts />
        <Heading align="center" m="3vh">
          Solicitudes
        </Heading>
        <DashboardRequest />
      </Flex>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        <OverflowScroll type="donation" />
        <Heading align="center" m="3vh">
          Servicios
        </Heading>
        <OverflowScroll type="services" />
      </Flex>
    </Flex>
  );
};

export default Dashboard;

//-------------------------------------------------------------//
