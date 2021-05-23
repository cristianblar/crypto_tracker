import {useState, useEffect} from 'react';
import Http from '../lib/http';

const useCoins = () => {
  const [coins, setCoins] = useState({coins: []});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const coinsData = await Http.instance.get(
          'https://api.coinlore.net/api/tickers/',
        );
        setCoins(coinsData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {coins, loading};
};

export default useCoins;
