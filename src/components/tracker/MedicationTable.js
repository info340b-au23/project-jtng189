import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';

function MedicationTable() {
  const { id } = useParams();
  const [medications, setMedications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const [doseAmount, setDoseAmount] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);

  const db = getDatabase();
  const auth = getAuth();
  let medicationsRef;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firebaseUser = await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
          });
        });

        if (!firebaseUser) {
          setMedications([]);
          medicationsRef = ref(db, 'medications/' + null);
        } else {
          medicationsRef = ref(db, 'medications/' + firebaseUser.uid);
          onValue(medicationsRef, (snapshot) => {
            const medicationsValue = snapshot.val();
            if (medicationsValue) {
              setMedications(medicationsValue);

              setSelectedMedication(
                id ? medicationsValue.find((med) => med.id === parseInt(id, 10)) : null
              );
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [auth, db, id]);

  const handleAddMedication = async () => {
    try {
      if (medicationsRef) {
        const newMedication = {
          id: medications.length + 1,
          name: medicationName,
          dose: parseInt(doseAmount, 10),
          timesTaken: 0,
        };

        await set(medicationsRef, [...medications, newMedication]);
        setShowAddModal(false);
        setMedicationName('');
        setDoseAmount('');
      } else {
        console.error('Error: medicationsRef is undefined');
      }
    } catch (error) {
      console.error('Error adding medication: ', error);
    }
  };

  const handleButtonClick = (medicationId) => {
    setMedications((prevMedications) =>
      prevMedications.map((medication) =>
        medication.id === medicationId
          ? { ...medication, timesTaken: medication.timesTaken + 1 }
          : medication
      )
    );
  };

  return (
    <div className="table-responsive" style={{ position: 'relative' }}>
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

      <button
        className="btn btn-success"
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
        onClick={() => setShowAddModal(true)}
      >
        Add Medication
      </button>

      {selectedMedication ? (
        <div>
          <h2>{selectedMedication.name}</h2>
          <p>Dose: {selectedMedication.dose} mg</p>
          <p>Times Taken: {selectedMedication.timesTaken}</p>
        </div>
      ) : (
        <>
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
                    <button
                      onClick={() => handleButtonClick(medication.id)}
                      className="btn btn-sm btn-take"
                    >
                      Take
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <img src="/img/medication.png" alt="Medication" className="smaller-image" />
        </>
      )}
    </div>
  );
}

export default MedicationTable;
