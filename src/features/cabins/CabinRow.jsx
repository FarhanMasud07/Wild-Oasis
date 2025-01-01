import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from '../../ui/Modal';
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


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


function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { id: cabinId, image, name, maxCapacity, regularPrice, discount, description } = cabin;
  const { createCabinMutate } = useCreateCabin();

  function handleDuplicate() {
    createCabinMutate({
      name: `Copy of ${name}`,
      regularPrice,
      discount,
      maxCapacity,
      image,
      description
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Maximum capacity {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <section>

        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Modal>
              <Menus.List id={cabinId}>
                <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                  duplicate
                </Menus.Button>
                <Modal.Open opens="cabin-edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="cabin-delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="cabin-edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="cabin-delete">
                <ConfirmDelete
                  resourceName={name}
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Modal>
          </Menus.Menu>
        </Menus>

      </section>
    </Table.Row>
  )
}

export default CabinRow;