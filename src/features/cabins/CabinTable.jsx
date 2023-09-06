import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useGetCabinData from "./useGetCabinData";
import { toast } from "react-hot-toast";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {useSearchParams} from "react-router-dom"
import Empty from "../../ui/Empty"
import AddCabin from "./AddCabin";

function CabinTable() {
  const {isFetching, cabin:cabins, error} = useGetCabinData()
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get("discount") || "all"
  //1. Filter
  let filteredCabins

  if(filterValue === "all") filteredCabins = cabins
  if(filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0)
  if(filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0)

  //2. Sort
  const sortValue = searchParams.get("sortBy") || ""
  const [fieldName, direction] = sortValue.split("-") 
  const sortedCabins = filteredCabins?.sort((a,b) => direction === "asc" ? a[fieldName] - b[fieldName]: b[fieldName] - a[fieldName])
  if(error) return toast.error("Can't get cabins data")
  if(isFetching) return <Spinner />
  if(cabins.length === 0) return <Empty resourceName = "cabins" />
  return (
    <>
      <Table role = "table" columns= "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data = {sortedCabins} render = {cabin => <CabinRow cabin = {cabin} key = {cabin.id}/>}/>
      </Table>
      <AddCabin />
    </>
  )
}

export default CabinTable

