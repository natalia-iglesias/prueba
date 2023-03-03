import axios from 'axios';
import { VStack, Select, Badge } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterEntitiesByMaterial,
  listOfMaterialsToFilter,
} from '../redux/actions/entitiesActions.js';

const AsideFilters = ({ filters, setPage, setInput }) => {
  const dispatch = useDispatch();

  const { materials, listOfMaterialsToFilterState } = useSelector(
    (state) => state.entitiesReducer
  );

  const handleClikMaterials = (e) => {
    const newFilters = filters.filter((ent) => {
      return ent.Materials.some((mat) => mat.name === e.target.value);
    });
    if (newFilters.length == 0) return window.alert('No hubo coincidencias');
    listOfMaterialsToFilterState.push(e.target.value);
    dispatch(filterEntitiesByMaterial(newFilters));
    dispatch(listOfMaterialsToFilter(listOfMaterialsToFilterState));
    setPage(1);
    setInput(1);
  };

  const handleRanking = (e) => {
    if (e.target.value === 'Ascendente') {
      axios
        .post('/feedback/rating', {
          order: 'Ascendente',
        })
        .then((res) => {
          let newFilters = [];
          res.data.forEach((ent1) => {
            filters.forEach((ent2) => {
              if (ent1.name === ent2.name) newFilters.push(ent2);
            });
          });

          dispatch(filterEntitiesByMaterial(newFilters));
        });
    } else {
      axios
        .post('/feedback/rating', {
          order: 'Descendente',
        })
        .then((res) => {
          let newFilters = [];
          res.data.forEach((ent1) => {
            filters.forEach((ent2) => {
              if (ent1.name === ent2.name) newFilters.push(ent2);
            });
          });

          dispatch(filterEntitiesByMaterial(newFilters));
        });
    }
  };

  return (
    <VStack>
      <Select
        id="select_materials"
        placeholder="Selecciona un material"
        width="-moz-fit-content"
        onChange={(e) => handleClikMaterials(e)}
      >
        {materials.map((m, i) => (
          <option key={i} value={m.name}>
            {m.name}
          </option>
        ))}
      </Select>
      {listOfMaterialsToFilterState?.map((mat, i) => {
        return (
          <Badge key={i} variant="solid" colorScheme="green">
            {mat}
          </Badge>
        );
      })}
      <Select
        placeholder="Puntuación"
        onClick={(e) => {
          console.log(e.target.value);
          if (
            e.target.value === 'Ascendente' ||
            e.target.value === 'Descendente'
          ) {
            handleRanking(e);
          }
        }}
        width="-moz-fit-content"
      >
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </Select>
    </VStack>
  );
};

export default AsideFilters;
