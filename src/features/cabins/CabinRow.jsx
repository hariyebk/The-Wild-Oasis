import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import {HiTrash, HiOutlinePencilSquare, HiDocumentDuplicate} from 'react-icons/hi2'
import useCreateAndEdit from "./useCreateAndEdit";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const StyledDiv = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
`;

function CabinRow({cabin}) {
  const [showForm , setShowForm] = useState(false)
  const {id, name, maxCapacity, regularPrice, discount, image, description} = cabin
  
  const {isDeleting, mutate} = useDeleteCabin()
  const {mutate: DuplicateCabin} = useCreateAndEdit()

  function handleDuplicate (){
    DuplicateCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      description,
      discount,
      image
    })
  }
  return <>
      <TableRow>
        <Img src = {image} />
        <Cabin>{name}</Cabin>
        <div> Fits upto {maxCapacity} guests </div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <StyledDiv>
        {/* {showForm ? "Close" : "Edit"} */}
          <Button variation = "secondary" size = "small" onClick={() => setShowForm(!showForm) } disabled = {isDeleting}> 
            <HiOutlinePencilSquare />
          </Button>
          <Button variation = "secondary" size = "small" onClick={() => handleDuplicate()} disabled = {isDeleting}>
            <HiDocumentDuplicate />
          </Button>
          <Button variation = "danger" size = "small" onClick={() => mutate(id)} disabled = {isDeleting}>
            <HiTrash />
          </Button>
        </StyledDiv>
      </TableRow>
      {showForm && <CreateCabinForm cabinTobeEdited = {cabin} setEditShowForm = {setShowForm} />}
  </>
}

export default CabinRow

