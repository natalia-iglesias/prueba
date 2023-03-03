import React from 'react';
import {
  Flex,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

function TabListPosts() {
  function renderUrlPost(url) {
    return (
      <TabPanel>
        <Flex direction="row">
          <Text width="30vw">{url}</Text>
          <Button>
            <EditIcon />
          </Button>
        </Flex>
      </TabPanel>
    );
  }
  return (
    <Tabs>
      <TabList>
        <Tab fontWeight="bold">Post 1</Tab>
        <Tab fontWeight="bold">Post 2</Tab>
        <Tab fontWeight="bold">Post 3</Tab>
      </TabList>
      <TabPanels>
        {urlListArray.map((eachUrl) => {
          return renderUrlPost(eachUrl);
        })}
      </TabPanels>
    </Tabs>
  );
}

export default TabListPosts;

const urlListArray = [
  'URL1URL1URL1URL1URL1URL1',
  'URL2URL2URL2URL2URL2URL2URL2',
  'URL3URL3URL3URL3URL3URL3URL3',
];
