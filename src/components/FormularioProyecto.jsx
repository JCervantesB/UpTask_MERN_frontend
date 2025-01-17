import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    const [id, setId] = useState(null)
    const params = useParams()
  
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
      if(params.id){
          
        setId(params.id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
        setCliente(proyecto.cliente)
       
      }
    }, [params])
    

    const handleSubmit = async e => {
        e.preventDefault()
        
        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //Pasar Datos al provider

        await submitProyecto({
            id, nombre, descripcion, fechaEntrega, cliente
        })
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

  return (
    <form 
        className=' bg-white py-10 px-5 lg:w-2/3 rounded-lg shadow'
        onSubmit={handleSubmit}    
    >
        {alerta.msg && <Alerta alerta={alerta}/>}

        <div className=" mb-5">
            <label htmlFor="nombre" className=' text-gray-700 uppercase font-bold text-sm'>Nombre Proyecto</label>
            <input 
                id='nombre'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Proyecto'
                type="text" 
                value={nombre}
                onChange={e=>setNombre(e.target.value)}

            />
        </div>

        <div className=" mb-5">
            <label htmlFor="descricion" className=' text-gray-700 uppercase font-bold text-sm'>Descripción del Proyecto</label>
            <textarea 
                id='descricion'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Descripción del Proyecto'
                value={descripcion}
                onChange={e=>setDescripcion(e.target.value)}

            />
        </div>

        <div className=" mb-5">
            <label htmlFor="fecha-entrega" className=' text-gray-700 uppercase font-bold text-sm'>Fecha de entrega</label>
            <input 
                id='fecha-entrega'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                type="date" 
                value={fechaEntrega}
                onChange={e=>setFechaEntrega(e.target.value)}

            />
        </div>

        <div className=" mb-5">
            <label htmlFor="cliente" className=' text-gray-700 uppercase font-bold text-sm'>Cliente Proyecto</label>
            <input 
                id='cliente'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Cliente del Proyecto'
                type="text" 
                value={cliente}
                onChange={e=>setCliente(e.target.value)}

            />
        </div>

        <input 
            type="submit"
            value={params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            className=" bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" 
        
        />

    </form>
  )
}

export default FormularioProyecto