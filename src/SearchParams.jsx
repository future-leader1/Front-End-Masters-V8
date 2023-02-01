import { useState, useEffect } from 'react';
import Results from './Results';
import useBreedList from './useBreedList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          <input
            onChange={e => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="location"
          />
        </label>
        <label htmlFor="animal">Anima</label>
        <select
          id="animal"
          value={animal}
          onChange={e => setAnimal(e.target.value)}
        >
          <option />
          {ANIMALS.map(animal => (
            <option key={animal}> {animal}</option>
          ))}
        </select>
        <label htmlFor="breed">breed</label>
        <select
          id="breed"
          disabled={breeds.length === 0}
          value={breed}
          onChange={e => setBreed(e.target.value)}
        >
          <option />
          {breeds.map(breed => (
            <option key={breed}> {breed}</option>
          ))}
        </select>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
