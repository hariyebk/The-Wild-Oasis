import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useGetCabinData from "./useGetCabinData";
import { toast } from "react-hot-toast";
import Table from "../../ui/Table";
import {useSearchParams} from "react-router-dom"
import Empty from "../../ui/Empty"
import AddCabin from "./AddCabin";
import Pagination, { PAGE_SIZE } from "../../ui/Pagination";

function CabinTable() {
  const {isFetching, cabin:cabins, error, count} = useGetCabinData()
  const [searchParams, setSearchParams] = useSearchParams()
  const filterValue = searchParams.get("discount") || "all"
  //1. Filter
  let filteredCabins

  if(filterValue === "all") filteredCabins = cabins
  if(filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0)
  if(filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0)

  //2. Sort
  const sortValue = searchParams.get("sortBy") || ""
  const [fieldName, direction] = sortValue.split("-") 
  const sortedCabins = filteredCabins?.sort((a,b) => direction === "asc" ? a[fieldName] - b[fieldName] : b[fieldName] - a[fieldName])

  //3. PAGINATION
  const page = +searchParams.get("page") || 1
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  const paginatedCabins = sortedCabins?.slice(from, to)

  //3. query
  const query = +searchParams.get("query") || null
  let queryCabin
  if(query) queryCabin = cabins?.filter(cabins => cabins.id === query)
  if(query && cabins?.length === 0){
    toast.error(`No cabin found with an id of ${query}`)
    setSearchParams(undefined)
  } 


  if(error) return toast.error("Can't get cabins data")
  if(isFetching) return <Spinner />
  if(cabins.length === 0) return <Empty resourceName = "cabins" />
  return (
    <>
      <Table role = "table" columns= "1.5fr 2fr 2.2fr 2fr 2fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin Id</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <AddCabin />
        </Table.Header>
        <Table.Body data = {queryCabin ? queryCabin.length === 0 ? paginatedCabins : queryCabin : paginatedCabins} render = {cabin => <CabinRow cabin = {cabin} key = {cabin.id}/>}/>
        <Table.Footer>
                <Pagination count = {count} />
            </Table.Footer>
      </Table>
    </>
  )
}

export default CabinTable

