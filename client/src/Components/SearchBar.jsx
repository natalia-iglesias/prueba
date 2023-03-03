import { useDispatch } from 'react-redux';
import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import {
  searchEntities,
  filterEntitiesByMaterial,
} from '../redux/actions/entitiesActions';

const SearchBar = ({ entities, setPage, setInput, setSearch, search }) => {
  let dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const newFilters = entities.filter((ent) =>
      ent.name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    if (newFilters.length === 0)
      return window.alert('No se encontró ninguna entidad con ese nombre');
    dispatch(filterEntitiesByMaterial(newFilters));
    setInput(1);
    setPage(1);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchEntities(e.target.value));
  };

  const handleKeyDown = (e) => e.keyCode === 13 && handleClick(e);

  return (
    <InputGroup>
      <Input
        placeholder="Entidad VdV"
        type="text"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <IconButton
        value={search}
        colorScheme={'green'}
        icon={<SearchIcon />}
        onClick={handleClick}
      />
    </InputGroup>
  );
};

export default SearchBar;
