import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';

interface EditRowModalProps {
  show: boolean;
  onHide: () => void;
  selectedRow?: any;
  onSave: (data: FormData) => void;
}
const EditRowModal = ({ show, onHide, selectedRow, onSave }: EditRowModalProps) => {
  const [editedRow, setEditedRow] = useState({ ...selectedRow });

  const handleSaveClick = () => {
    onSave(editedRow);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title>Upraviť riadok</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='costs'>Tržby:</Form.Label>
          <InputGroup>
            <Form.Control
              type='number'
              id='sales'
              placeholder='Tržby'
              value={editedRow.salesAmount}
              onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  salesAmount: parseFloat(e.target.value),
                })
              }
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='costs'>Náklady:</Form.Label>
          <InputGroup>
            <Form.Control
              type='number'
              id='costs'
              placeholder='Náklady'
              aria-describedby='basic-addon3'
              value={editedRow.costsAmount}
              onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  costsAmount: parseFloat(e.target.value),
                })
              }
            />
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Zatvoriť
        </Button>
        <Button variant='primary' onClick={handleSaveClick}>
          Uložiť
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRowModal;
