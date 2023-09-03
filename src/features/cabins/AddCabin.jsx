import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm"
import Button from "../../ui/Button"
import CabinTable from "./CabinTable"


function AddCabin() {
    return <>
    <Modal>
        <Modal.Open opens = "cabin-form">
            <Button> Add New Cabin </Button>
        </Modal.Open>
        <Modal.Window>
            <CreateCabinForm name = "cabin-form"/>
        </Modal.Window>
    </Modal>
    <Modal>
        <Modal.Open opens = "cabin-table">
            <Button> Show Cabin table </Button>
        </Modal.Open>
        <Modal.Window>
            <CabinTable name = "cabin-table" />
        </Modal.Window>
    </Modal>
    </>
}



// function AddCabin({isFetching}) {
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     return (
//         <div>
//             {!isFetching && <Button onClick={() => setIsModalOpen(!isModalOpen)}>
//             {isModalOpen ? "Hide Form": "Add new Cabin"}
//             </Button>}
//             {isModalOpen && <Modal onClose={setIsModalOpen} >
//                 <CreateCabinForm setIsModalOpen = {setIsModalOpen}/>
//             </Modal>}
//         </div>
//     )
// }

export default AddCabin
