import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  const [showForm, setShowForm] = useState(false)
  const {isLoading, data: cabin, error} = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins
  })
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p> Filter / Sort</p>
      </Row>
        <CabinTable cabin={cabin} isLoading={isLoading} />
        {!isLoading && <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form": "Add new Cabin"}
        </Button>}
        {showForm && <CreateCabinForm setCreateShowForm = {setShowForm}/>}
    </>
  );
}

export default Cabins;
