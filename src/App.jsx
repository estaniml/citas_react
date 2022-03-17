import { useState, useEffect } from 'react'
import Form from './components/Form'
import Header from './components/Header'
import PatientList from './components/PatientList'


function App() {

  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({}); 

  useEffect(() => {
    
    const getLS = () => {
      const patientsLS = JSON.parse(localStorage.getItem('patients')) ?? [];
    
      setPatients(patientsLS);
    }

    getLS();
  }, [])

  useEffect(() => {
    
    localStorage.setItem('patients', JSON.stringify( patients ));

  }, [patients])
  

  const handleDelete = id => {
    const updatedPatients = patients.filter( patiente => patiente.id !== id);

    setPatients(updatedPatients); 
  }

  return (
    <div className='container mx-auto mt-10'>
      <Header />

      <div className='mt-12 md:flex'>
        <Form 
          setPatients={setPatients}
          patients={patients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientList 
          patients={patients}
          setPatient={setPatient}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App
