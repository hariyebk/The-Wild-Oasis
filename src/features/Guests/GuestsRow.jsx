import styled from "styled-components"
import Table from "../../ui/Table"
import {Stacked} from "../bookings/BookingRow"
import Tag from "../../ui/Tag"
import { useDarkMode } from "../../context/DarkModeContext"
import Menus from "../../ui/Menus"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2"
import useDeleteGuest from "./useDeleteGuest"
import CreateGuestForm from "./CreateGuestForm"

const Name = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--color-grey-600);
    /* font-family: "Sono"; */
`
const Img = styled.img`
    width: 3.6rem;
    height: 1.5rem;
    padding-left: 1.2rem;
`
function GuestsRow({guest}) {
    const {isDarkMode} = useDarkMode()
    const {isDeleting, deleteGuest} = useDeleteGuest()
    const {id, fullName, address, Age, Diet, nationality, countryFlag, Gender} = guest
    return (
        <Table.Row>
            <Name> {fullName} </Name>
            <p> {id} </p>
            <Stacked>
                <span> {address} </span>
            </Stacked>
            <Stacked>
                <p> {Gender} </p>
            </Stacked>
            <Stacked>
                <p> {Age} </p>
            </Stacked>
            <Tag  type = {isDarkMode ? "grey" : "green"}> {Diet} </Tag>
            <Stacked>
                <span> 
                    {nationality} 
                    <Img src= {countryFlag} alt={`Flag of ${nationality}`}  />
                </span>
            </Stacked>
            <Modal>
                <Menus>
                    <Menus.Menu>
                        <Menus.Toggle id = {id} />
                            <Menus.List id={id}>
                                <Modal.Open opensWindowName= "delete-guest" >
                                    <Menus.Button icon = {<HiMiniTrash/>}>
                                        <span> Delete guest </span>
                                    </Menus.Button>
                                </Modal.Open>
                                <Modal.Open opensWindowName= "edit-guest">
                                    <Menus.Button icon = {<HiMiniPencilSquare />}>
                                        <span> Edit guest </span>
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>
                    </Menus.Menu>
                </Menus>
                    <Modal.Window name = "delete-guest">
                        <ConfirmDelete resourceName= {`guest #${id}`} id={id} disabled={isDeleting} onConfirm={() => deleteGuest(id)}/>
                    </Modal.Window>
                    <Modal.Window name = "edit-guest">
                        <CreateGuestForm Guest={guest} isEditing={true}/>
                    </Modal.Window>
            </Modal>
        </Table.Row>
    )
}

export default GuestsRow
