import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import TableOperations from "../ui/TableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperations type= "cabins" />
      </Row>
        <CabinTable/>
    </>
  );
}

export default Cabins;
