import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import TableOperations from "../ui/TableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperations filter = "cabins" sort = "cabins" />
      </Row>
        <CabinTable/>
        <AddCabin/>
    </>
  );
}

export default Cabins;
