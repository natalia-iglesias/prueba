import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';
import ItemsCarousel from 'react-items-carousel';
import { InstagramEmbed } from 'react-social-media-embed';

const PostsCarousel = ({ posts }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={<IconButton icon={<AiOutlineArrowLeft />} />}
        rightChevron={<IconButton icon={<AiOutlineArrowRight />} />}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {posts?.map(({ url }, index) => (
          <InstagramEmbed
            url={url}
            key={index}
            style={{ maxHeight: '50vh', overflowY: 'scroll' }}
          />
        ))}
      </ItemsCarousel>
    </div>
  );
};

export default PostsCarousel;
