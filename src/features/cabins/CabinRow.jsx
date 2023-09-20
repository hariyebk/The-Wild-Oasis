import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import {HiTrash, HiOutlinePencilSquare, HiDocumentDuplicate, HiMiniTrash, HiMiniPencilSquare} from 'react-icons/hi2'
import useCreateAndEdit from "./useCreateAndEdit";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete"
import Menus from "../../ui/Menus"
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
  
  const {isDeleting, deletecabin} = useDeleteCabin()
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
        <Cabin>{id}</Cabin>
        <div> Fits upto {maxCapacity} guests </div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <StyledDiv>
          <Modal>
                <Menus>
                    <Menus.Menu>
                        <Menus.Toggle id = {id} />
                            <Menus.List id={id}>
                                <Menus.Button icon = {<HiDocumentDuplicate />} onClick= {() => handleDuplicate()} >
                                        <span> Duplicate cabin </span>
                                </Menus.Button>
                                <Modal.Open opensWindowName= "delete-cabin" >
                                    <Menus.Button icon = {<HiMiniTrash/>}>
                                        <span> Delete cabin </span>
                                    </Menus.Button>
                                </Modal.Open>
                                <Modal.Open opensWindowName= "edit-cabin">
                                    <Menus.Button icon = {<HiMiniPencilSquare />}>
                                        <span> Edit cabin </span>
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>
                    </Menus.Menu>
                </Menus>
                    <Modal.Window name = "delete-cabin">
                        <ConfirmDelete resourceName= {`cabin #${id}`} id= {id} disabled={isDeleting} onConfirm={() => deletecabin(id)}/>
                    </Modal.Window>
                    <Modal.Window name = "edit-cabin">
                        <CreateCabinForm cabinTobeEdited={cabin}/>
                    </Modal.Window>
            </Modal>
        </StyledDiv>
      </Table.Row>
}

export default CabinRow

