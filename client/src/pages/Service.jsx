import {
  HStack,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
const Service = () => {
  return (
    <HStack spacing="4">
      <Card justifyContent="center" alignItems="center" textAlign="center">
        <CardHeader>
          <Heading>Individual</Heading>
          <Text fontSize="3xl">$10</Text>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            ornare leo. Cras ornare id lacus id tempor. Vestibulum sodales
            pellentesque massa, sed semper nibh.
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme={'green'}>SELECT PLAN</Button>
        </CardFooter>
      </Card>

      <Card justifyContent="center" alignItems="center" textAlign="center">
        <CardHeader>
          <Heading>Mensual</Heading>
          <Text fontSize="3xl">$230</Text>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            ornare leo. Cras ornare id lacus id tempor. Vestibulum sodales
            pellentesque massa, sed semper nibh.
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme={'green'}>SELECT PLAN</Button>
        </CardFooter>
      </Card>

      <Card justifyContent="center" alignItems="center" textAlign="center">
        <CardHeader>
          <Heading>Semanal</Heading>
          <Text fontSize="3xl">$50</Text>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            ornare leo. Cras ornare id lacus id tempor. Vestibulum sodales
            pellentesque massa, sed semper nibh.
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme={'green'}>SELECT PLAN</Button>
        </CardFooter>
      </Card>
    </HStack>
  );
};

export default Service;
