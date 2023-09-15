import styled from 'styled-components';
import {Children, createContext} from "react"
import SortBy from './SortBy';
import Filter from "./Filter"
import Search from './Search';


const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
export const TableOperationsContext = createContext()
const options = {
    CabinFilterField: "discount",
    CabinFilterOptions: [
        {value: "all", label: "All"},
        {value: "no-discount", label: "No Discount"},
        {value: "with-discount", label: "With Discount"}
    ],
    CabinSortOptions: [
        {value: "name-asc", label: "Sort by name(A-Z)"},
        {value: "name-dsc", label: "Sort by name(Z-A)"},
        {value: "regularPrice-asc", label: "Sort by Price(low to high)"},
        {value: "regularPrice-dsc", label: "Sort by Price(high to low)"},
        {value: "maxCapacity-asc", label: "Sort by Maximum capacity(low to high)"},
        {value: "maxCapacity-dsc", label: "Maximum capacity(high to low)"},
        {value: "discount-asc", label: "Discount(low to high)"},
        {value: "discount-dsc", label: "Discount(high to low)"}
    ],
    BookingFilterField: "status",
    BookingFilterOptions: [
        {value: "all", label: "All"},
        {value: "checked-in", label: "Checked In"},
        {value: "checked-out", label: "Checked Out"},
        {value: "unconfirmed", label: "Unconfirmed"}
    ],
    BookingSortOptions: [
      {value: "startDate-desc", label: "Sort by date (recent first)"},
      {value: "startDate-asc", label: "Sort by date (earlier first)"},
      {value: "totalPrice-desc", label: "Sort by amount (high to low)"},
      {value: "totalPrice-asc", label: "Sort by amount (low to high)"}
    ],
    DashboardFilterField: "last",
    DashboardFilterOptions: [
        { value: '7', label: 'Last 7 days' },
        { value: '30', label: 'Last 30 days' },
        { value: '90', label: 'Last 90 days' },
    ],
    GuestFilterField: "Gender",
    GuestFilterOptions: [
      {value: "all", label: "All"},
      {value: "Male", label: "Male"},
      {value: "Female", label: "Female"},
    ],
    GuestSortOptions: [
        {value: "fullName-asc", label: "Sort by name(A-Z)"},
        {value: "fullName-desc", label: "Sort by name(Z-A)"},
        {value: "nationality-asc", label: "Sort by countries(A-Z)"},
        {value: "nationality-desc", label: "Sort by countries(Z-A)"},
        {value: "Diet-asc", label: "Sort by Diet(A-Z)"},
        {value: "Diet-desc", label: "Sort by Diet(Z-A)"},
        {value: "Age-asc", label: "Sort by Age(Young to old)"},
        {value: "Age-desc", label: "Sort by Age(Old to young)"},
    ]

}

function TableOperations({children}) {
  // type can be either cabins or bookings
  return <TableOperationsContext.Provider value={{
    CabinFilterField: options.CabinFilterField,
    CabinFilterOptions: options.CabinFilterOptions,
    CabinSortOptions: options.CabinSortOptions,
    BookingFilterField: options.BookingFilterField,
    BookingFilterOptions: options.BookingFilterOptions,
    BookingSortOptions: options.BookingSortOptions,
    DashboardFilterField: options.DashboardFilterField,
    DashboardFilterOptions: options.DashboardFilterOptions,
    GuestFilterField: options.GuestFilterField,
    GuestFilterOptions: options.GuestFilterOptions,
    GuestSortOptions: options.GuestSortOptions
  }}>
      <StyledTableOperations>
            {children}
      </StyledTableOperations>
  </TableOperationsContext.Provider>
}
export default TableOperations;
