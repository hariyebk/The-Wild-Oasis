import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import TableOperations from "../ui/TableOperations";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import Search from "../ui/Search";

const type = "cabins"
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperations>
            <Filter filter= {type} />
            <SortBy sort= {type} />
            <Search type ={type} />
        </TableOperations>
      </Row>
        <CabinTable/>
    </>
  );
}

export default Cabins;
