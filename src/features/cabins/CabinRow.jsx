import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import {HiTrash, HiOutlinePencilSquare, HiDocumentDuplicate} from 'react-icons/hi2'
import useCreateAndEdit from "./useCreateAndEdit";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete"
import Table from "../../ui/Table";

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
  return <Table.Row>
        <Img src = {image} />
        <Cabin>{name}</Cabin>
        <div> Fits upto {maxCapacity} guests </div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <StyledDiv>
          <Button variation = "secondary" size = "small" title = "Duplicate cabin" onClick={() => handleDuplicate()} disabled = {isDeleting}>
            <HiDocumentDuplicate />
          </Button>
          <Modal>

            <Modal.Open opensWindowName = "edit-form">
                <Button variation = "secondary" size = "small" title = "Edit cabin"> 
                    <HiOutlinePencilSquare />
                </Button>
            </Modal.Open>
            <Modal.Window name = "edit-form">
                <CreateCabinForm cabinTobeEdited = {cabin}/>
            </Modal.Window>

            <Modal.Open opensWindowName= "confirm-delete">
                <Button variation = "danger" size = "small" title = "Delete cabin">
                    <HiTrash />
                </Button>
            </Modal.Open>
            <Modal.Window name = "confirm-delete">
                  <ConfirmDelete resourceName= "cabin" disabled={isDeleting} onConfirm={() => mutate(id)}/>
            </Modal.Window>
          </Modal>
        </StyledDiv>
        {/* <Menus.Menu>
            <Menus.Toggle id = {id}/>
            <Menus.List id = {id}>
                <Menus.Button> Duplicate </Menus.Button>
                <Menus.Button> Edit </Menus.Button>
                <Menus.Button> Delete </Menus.Button>
            </Menus.List>
        </Menus.Menu> */}
      </Table.Row>
}

export default CabinRow

