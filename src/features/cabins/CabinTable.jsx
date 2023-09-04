import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useGetCabinData from "./useGetCabinData";
import { toast } from "react-hot-toast";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const {isFetching, cabin, error} = useGetCabinData()
  error && toast.error("Can't get cabins data")
  isFetching && <Spinner />
  return (
    <Menus>
      <Table role = "table" columns= "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data = {cabin} render = {cabin => <CabinRow cabin = {cabin} key = {cabin.id}/>}/>
      </Table>
    </Menus>
  )
}

export default CabinTable

