import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CreateTableOperations from "../features/cabins/createTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CreateTableOperations />
      </Row>
        <CabinTable/>
        <AddCabin/>
    </>
  );
}

export default Cabins;
