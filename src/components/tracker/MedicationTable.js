import React, { useState } from 'react';

function MedicationTable() {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin', dose: 100, timesTaken: 0 },
    { id: 2, name: 'Ibuprofen', dose: 200, timesTaken: 0 },
    { id: 3, name: 'Lisinopril', dose: 10, timesTaken: 0 },
    { id: 4, name: 'Simvastatin', dose: 20, timesTaken: 0 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const [doseAmount, setDoseAmount] = useState('');

  const handleAddMedication = () => {
    // Handle the logic for adding medication
    const newMedication = {
      id: medications.length + 1,
      name: medicationName,
      dose: parseInt(doseAmount, 10),
      timesTaken: 0,
    };

    setMedications((prevMedications) => [...prevMedications, newMedication]);

    // Close the modal
    setShowAddModal(false);
    // Reset the input fields
    setMedicationName('');
    setDoseAmount('');
  };

  const handleCheckboxChange = (medicationId) => {
    setMedications((prevMedications) =>
      prevMedications.map((medication) =>
        medication.id === medicationId
          ? { ...medication, timesTaken: medication.timesTaken + 1 }
          : medication
      )
    );
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Dose Amount (mg)</th>
            <th>Times Taken</th>
            <th>Taken Today?</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication.id}>
              <td>{medication.name}</td>
              <td>{medication.dose}</td>
              <td>{medication.timesTaken}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(medication.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-3">
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Add Medication
        </button>
      </div>

      <img
        src="Project-Draft/img/medication.png"
        alt="Medication"
        className="header-image"
      />

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h2>Add Medication</h2>
            <label htmlFor="medicationName">Medication Name:</label>
            <input
              type="text"
              id="medicationName"
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
            />
            <label htmlFor="doseAmount">Dose Amount (mg):</label>
            <input
              type="text"
              id="doseAmount"
              value={doseAmount}
              onChange={(e) => setDoseAmount(e.target.value)}
            />
            <button onClick={handleAddMedication}>Add Medication</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicationTable;
