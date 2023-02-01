import { useState, useEffect } from 'react';

const localChache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState('unloaded');

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localChache[animal]) {
      setBreedList(localChache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus('loading');

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();
      localChache[animal] = json.breeds || [];
      setBreedList(localChache[animal]);
      setStatus('loaded');
    }
  }, [animal]);

  return [breedList, status];
}
