import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditRowModal = ({ show, onHide, selectedRow, onSave }: any) => {
  const [editedRow, setEditedRow] = useState({ ...selectedRow });

  const handleSaveClick = () => {
    onSave(editedRow);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Upraviť riadok</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label htmlFor="sales">Tržby:</label>
          <input
            type="number"
            id="sales"
            placeholder="Tržby"
            value={editedRow.salesAmount}
            onChange={(e) => setEditedRow({ ...editedRow, salesAmount: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label htmlFor="costs">Náklady:</label>
          <input
            type="number"
            id="costs"
            placeholder="Náklady"
            value={editedRow.costsAmount}
            onChange={(e) => setEditedRow({ ...editedRow, costsAmount: parseFloat(e.target.value) })}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zatvoriť
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Uložiť
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRowModal;
