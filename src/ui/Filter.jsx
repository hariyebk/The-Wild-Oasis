import styled, { css } from "styled-components";
import {useSearchParams} from "react-router-dom"
import {useContext} from "react"
import { TableOperationsContext } from "./TableOperations";


const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({filter}){
  const [searchParams, setSearchParams] = useSearchParams()
  const {CabinFilterField, CabinFilterOptions, BookingFilterField, BookingFilterOptions, DashboardFilterField, DashboardFilterOptions, GuestFilterField, GuestFilterOptions} = useContext(TableOperationsContext)
  let type
  
  if(filter === "cabins") type = [CabinFilterField, CabinFilterOptions]
  if(filter === "bookings") type = [BookingFilterField, BookingFilterOptions]
  if(filter === "dashboard") type = [DashboardFilterField, DashboardFilterOptions]
  if(filter === "guests") type = [GuestFilterField, GuestFilterOptions]

  const currentFilter = searchParams.get(type.at(0)) || type.at(1)[0].value
  function handleClick(value){
    searchParams.set(type.at(0), value)
    // reversing the page number to one when a filter happens
    if(searchParams.get("page")) searchParams.set("page", 1)
    setSearchParams(searchParams)
  }
  return (
    <StyledFilter>
        {type.at(1).map(option => <FilterButton onClick = {() => handleClick(option.value)} active = {currentFilter === option.value} disabled = {currentFilter === option.value} key = {option.value}> {option.label} </FilterButton>)}
    </StyledFilter>
  )
}

export default Filter
