import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, HStack, Button, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('usd');
  const currencySymbol =
    currency === 'usd' ? '$' : currency === 'eur' ? '€' : currency === 'pkr';

  // Pagination
  const changePage = page => {
    setPage(page);
    setLoading(true);
  };

  // Buttons Array
  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        // console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [page, currency]);

  if (error) return <ErrorComponent message={'Error while fetching coins'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'pkr'}>Pkr</Radio>
              <Radio value={'usd'}>Usd</Radio>
              <Radio value={'eur'}>Eur</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={'wrap'}>
            {coins.map(i => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={'full'} overflow={'auto'} p={'8'}>
            {btns.map((item, index) => {
              return (
                <Button
                  bgColor={'blackAlpha.900'}
                  color={'white'}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
