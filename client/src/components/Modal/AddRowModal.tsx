import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { addRowToTable } from '../../redux/dataSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';

const AddRowModal = ({ show, onHide }: any) => {
  const dispatch = useDispatch();
  const [sales, setSales] = useState(0);
  const [costs, setCosts] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddClick = () => {
    let formattedDate = ''
    if (selectedDate) {
      formattedDate = selectedDate.toISOString();
    }
    const taxPercentage = 0.2;
    const costsTax = costs * taxPercentage
    const salesTax = sales * taxPercentage

    console.log(formattedDate, typeof sales, costs)
    dispatch(addRowToTable({ salesAmount: sales, costsTax: costsTax, costsAmount: costs, salesTax: salesTax, month: formattedDate }));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="costs">Tržby:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="sales"
              placeholder="Tržby"
              aria-describedby="basic-addon3"
              value={sales}
              onChange={(e) => setSales(parseFloat(e.target.value))}
            />
            <InputGroup.Text id="basic-addon3">+20% daň: {(sales * 0.2).toFixed(1)}</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="costs">Naklady:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="costs"
              placeholder="Naklady"
              aria-describedby="basic-addon3"
              value={costs}
              onChange={(e) => setCosts(parseFloat(e.target.value))}
            />
            <InputGroup.Text id="basic-addon3">+20% daň {(costs * 0.2).toFixed(1)}</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="costs">Datum:</Form.Label>
          <InputGroup>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zatvoriť
        </Button>
        <Button variant="primary" onClick={handleAddClick}>
          Pridať
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRowModal;

