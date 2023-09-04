import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm"
import Button from "../../ui/Button"

function AddCabin() {
    return <>
    <Modal>
        <Modal.Open opensWindowName = "cabin-form">
            <Button> Add New Cabin </Button>
        </Modal.Open>
        <Modal.Window name = "cabin-form">
            <CreateCabinForm/>
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
