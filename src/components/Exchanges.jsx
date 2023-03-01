import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import {
  Container,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=250`);
        // console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error)
    return <ErrorComponent message={'Error while fetching exchanges'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'}>
            {exchanges.map(i => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={'blank'}>
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
          {rank}
        </Heading>
        <Text noOfLines={'1'}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
