import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import useGetCabinData from "../features/cabins/useGetCabinData";
import { toast } from "react-hot-toast";

function Cabins() {
  const [showForm, setShowForm] = useState(false)
  const {isFetching, cabin, error} = useGetCabinData()
  if(error) return toast.error("Can't get cabins data")
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p> Filter / Sort</p>
      </Row>
        <CabinTable cabin={cabin} isLoading={isFetching} error = {error} />
        {!isFetching && <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form": "Add new Cabin"}
        </Button>}
        {showForm && <CreateCabinForm setCreateShowForm = {setShowForm}/>}
    </>
  );
}

export default Cabins;
