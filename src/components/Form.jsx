import { useState, useEffect } from "react"
import Error from "./Error";

const Form = ({ setPatients, patients, patient, setPatient }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {

    const {nombre, propietario, email, alta, sintomas} = patient;

    if( Object.keys(patient).length > 0){
      setNombre(nombre);
      setPropietario(propietario)
      setEmail(email)
      setAlta(alta)
      setSintomas(sintomas)
    }
  
  }, [patient])
  

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
  
    return fecha + random
  }

  const handleSubmit = e => {
    e.preventDefault();

    // Validacion del Formulario
    if([nombre, propietario, email, alta, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio');

      setError(true)
      return;
    } 

    setError(false);

    // Objeto de paciente
    const patientObject = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    if(patient.id) {
      // Editando el registro
      patientObject.id = patient.id
      
      const updatedPatients = patients.map( patientState => patientState.id === patient.id ? patientObject : patientState );

      setPatients(updatedPatients);
      setPatient({})

    } else {
      //Nuevo registro
      patientObject.id = generarId();
      setPatients([ patientObject, ...patients]);

    }

    //Reiniciar
    setNombre('');
    setPropietario('');
    setEmail('');
    setAlta('');
    setSintomas('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="mt-5 text-center mb-5 text-lg">Añade  pacientes y {''} 
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        { error && <Error mensaje="Todos los campos son obligatorios"/> }
        
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-grey-700 uppercase font-bold">
            Nombre Mascota
          </label>

          <input 
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-grey-700 uppercase font-bold">
            Nombre Propietario
          </label>

          <input 
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-grey-700 uppercase font-bold">
            Email
          </label>

          <input 
            id="email"
            type="email"
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-grey-700 uppercase font-bold">
            Alta
          </label>

          <input 
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={alta}
            onChange={ (e) => setAlta(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-grey-700 uppercase font-bold">
            Sintomas
          </label>

          <textarea 
            id="sintomas"
            type="text"
            placeholder="Detalla todos los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ patient.id  ? "Editar paciente" : "Agregar paciente" }
        />
      </form>
    </div>
  )
}

export default Form