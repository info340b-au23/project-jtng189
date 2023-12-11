import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';

function MedicationTable() {
  const { id } = useParams();
  const [medications, setMedications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const [doseAmount, setDoseAmount] = useState('');
  const medicationsRef = useRef(null);

  const db = getDatabase();
  const auth = getAuth();

  const fetchData = useCallback(async () => {
    try {
      console.log('Fetching data...');
      const firebaseUser = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user);
        });
      });

      if (!firebaseUser) {
        console.log('User not found.');
        setMedications([]);
      } else {
        console.log('User found:', firebaseUser.uid);
        const userMedicationsRef = ref(db, `medications/${firebaseUser.uid}`);

        medicationsRef.current = userMedicationsRef;

        onValue(userMedicationsRef, (snapshot) => {
          const medicationsValue = snapshot.val();
          const medicationsArray = medicationsValue ? Object.values(medicationsValue) : [];

          console.log('Medications array:', medicationsArray);

          const filteredMedications = id
            ? medicationsArray.filter((med) => med.id === parseInt(id, 10))
            : medicationsArray;

          console.log('Filtered medications:', filteredMedications);

          setMedications(filteredMedications);
        });
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [auth, db, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddMedication = async () => {
    try {
      if (medicationsRef.current) {
        const newMedication = {
          name: medicationName,
          dose: parseInt(doseAmount, 10),
          timesTaken: 0,
        };

        const newMedicationRef = push(medicationsRef.current);
        const newMedicationSnapshot = await newMedicationRef;
        const newMedicationId = newMedicationSnapshot.key;

        // Assign the generated key as the id
        newMedication.id = newMedicationId;

        await set(newMedicationRef, newMedication);

        setShowAddModal(false);
        setMedicationName('');
        setDoseAmount('');

        // Call fetchData to update the medications array
        fetchData();
      } else {
        console.error('Error: medicationsRef is undefined');
      }
    } catch (error) {
      console.error('Error adding medication: ', error);
    }
  };

  const handleButtonClick = (medicationId) => {
    console.log('Clicked medicationId:', medicationId);

    setMedications((prevMedications) => {
      const updatedMedications = prevMedications.map((medication) => {
        if (medication.id === medicationId) {
          const updatedMedication = { ...medication, timesTaken: medication.timesTaken + 1 };
          console.log(`Updating medication with ID ${medicationId}:`, updatedMedication);
          return updatedMedication;
        }
        return medication;
      });

      console.log('Updated medications:', updatedMedications);

      return updatedMedications;
    });
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
          {medications.map((medication) =>
            typeof medication === 'object' ? (
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
            ) : null
          )}
        </tbody>
      </table>

      <div className="text-right mt-3">
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Add Medication
        </button>
      </div>

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
