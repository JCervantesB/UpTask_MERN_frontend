import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"


const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordMod, setPasswordMod]=useState(false)
  const params = useParams()
  const { token } = params

  useEffect(() => {
   const comprobarToken = async () => {
     try {
       //: Mover hacia un cliente axios
       await clienteAxios(`/usuarios/olvide-password/${token}`)
       setTokenValido(true)
     } catch (error) {
       setAlerta({
         msg: error.response.data.msg,
         error: true
        })
     }
   }
      comprobarToken()
  
  }, [])
  
  const handleSubmit = async e => {
    e.preventDefault()
    if(!password || password.length < 6){
      setAlerta({
        msg: 'El password debe contener al menos 6 digitos.',
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    try {
    
      const url = `/usuarios/olvide-password/${token}`   
     const {data} = await clienteAxios.post(url,{ password })
     
     setAlerta({
      msg: data.msg,
      error: false
    })

    setPassword('')
    setPasswordMod(true)
     
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setEmail('');
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }
  }

  return (
    <>
    <h1 className=' text-sky-600 font-black text-6xl capitalize'>Reestablece tu password y no pierdas acceso a tus {' '}<span className=' text-slate-700'>proyectos</span> </h1>
    {alerta.msg && <Alerta alerta={alerta}/>}
   {tokenValido && (
      <form 
      className='my-10 bg-white shadow rounded-md p-5'
      onSubmit={handleSubmit}  
    >
      <div className=' my-5'>
        <label 
        className=' uppercase text-gray-600 block text-xl font-bold'
        htmlFor='password'
        
        >Nuevo Password</label>
        <input 
          type="password"
          placeholder='Tu Nuevo Password'
          className=' w-full mt-3 p-3 border rounded-md bg-gray-50'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <input 
        type="submit" 
        value="Guardar Password"
        className=' bg-sky-700 w-full py-3 text-white uppercase font-bold rounded
        hover:cursor-pointer hover:bg-sky-800 transition-colors' 
      />

    </form> 
   )}

    {passwordMod && (
        <Link
        to='/'
        className='block text-center my-5 text-slate-500 uppercase text-sm'
      >
        Inicia Sesión
      </Link>
      )}
  </>
  )
}

export default NuevoPassword