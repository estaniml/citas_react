import Patient from "./Patient"


const PatientList = ({ patients, setPatient, handleDelete }) => {
  

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-scroll">
      {
        patients && patients.length ? ( 
        <>
          <h2 className="font-black text-3xl text-center">Lista de Pacientes</h2>
          <p className="text-center mt-5 mb-5 text-xl">Administra tus {''}
            <span className=" text-indigo-600 font-bold ">Pacientes y Citas</span>
          </p> 
          { patients.map( patient => (
            <Patient 
              key={patient.id}
              patient={patient} 
              setPatient={setPatient}
              handleDelete={handleDelete}
            />
          ))}    
        </>
        )
        : (
          <>
            <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
            <p className="text-center mt-5 mb-5 text-xl">Comienza agregando pacientes {''}
              <span className=" text-indigo-600 font-bold ">y apareceran aqui</span>
            </p> 
          </>
        )
      }

      

    </div>
  )
}

export default PatientList