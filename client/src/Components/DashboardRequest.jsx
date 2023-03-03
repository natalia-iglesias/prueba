import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';

function DashboardRequest() {
  function requestRender(req) {
    return (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight="bold">
              {req.cbu && 'Solicitud cambio de cbu'}
              {req.adress && 'Solicitud nueva entidad'}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {req.name}
          <br></br>
          {req.cbu && (
            <>
              {req.cbu}
              <br />
            </>
          )}
          {req.adress && (
            <>
              {req.adress}
              <br />
            </>
          )}
          {req.materials && (
            <>
              {req.materials}
              <br />
            </>
          )}
          {req.image && (
            <>
              {req.image}
              <br />
            </>
          )}
          <Button>
            <CheckIcon />
          </Button>
          <Button>
            <DeleteIcon />
          </Button>
        </AccordionPanel>
      </AccordionItem>
    );
  }
  return (
    <Accordion w="40vw">
      {requestArray.map((req) => requestRender(req))}
    </Accordion>
  );
}

export default DashboardRequest;

const requestArray = [
  {
    name: 'Entidad 1',
    adress: 'Av. tanto numero tanto',
    materials: 'Plastico, vidrio',
    image: 'https://cdn-icons-png.flaticon.com/512/4284/4284490.png',
  },
  { name: 'Entidad 2', cbu: '784935027345807203485' },
];
