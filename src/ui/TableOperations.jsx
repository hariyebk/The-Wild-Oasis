import styled from 'styled-components';
import {createContext} from "react"
import Filter from './Filter';
import SortBy from '../features/cabins/SortBy';

const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
export const TableOperationsContext = createContext()
const options = {
    filterField: "discount",
    filterOptions: [
        {value: "all", label: "All"},
        {value: "no-discount", label: "No Discount"},
        {value: "with-discount", label: "With Discount"}
    ],
    SortOptions: [
        {value: "name-asc", label: "Sort by name(A-Z)"},
        {value: "name-dsc", label: "Sort by name(Z-A)"},
        {value: "regularPrice-asc", label: "Sort by Price(low to high)"},
        {value: "regularPrice-dsc", label: "Sort by Price(high to low)"},
        {value: "maxCapacity-asc", label: "Sort by Maximum capacity(low to high)"},
        {value: "maxCapacity-dsc", label: "Maximum capacity(high to low)"},
        {value: "discount-asc", label: "Discount(low to high)"},
        {value: "discount-dsc", label: "Discount(high to low)"}
    ]
}

function TableOperations() {
  return <TableOperationsContext.Provider value={{
    filterField: options.filterField,
    filterOptions: options.filterOptions,
    SortOptions: options.SortOptions
  }}>
      <StyledTableOperations>
            <Filter/>
            <SortBy/>
      </StyledTableOperations>
  </TableOperationsContext.Provider>
}
export default TableOperations;
