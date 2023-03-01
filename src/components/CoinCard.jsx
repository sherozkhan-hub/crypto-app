import { Heading, Image, VStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = 'Rs' }) => {
  return (
    <Link to={`/coin/${id}`} target={'blank'}>
      <VStack
        w={'52'}
        p={'8'}
        shadow={'lg'}
        borderRadius={'lg'}
        m={'4'}
        transition={'all 0.3'}
        css={{
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <Image
          src={img}
          alt={'Exchange'}
          w={'10'}
          h={'10'}
          objectFit={'contain'}
        />
        <Heading size={'md'} noOfLines={'1'}>
          {symbol}
        </Heading>
        <Text noOfLines={'1'}>{name}</Text>
        <Text noOfLines={'1'}>
          {price ? `${currencySymbol}${price}` : 'NA'}
        </Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
