import { useState } from 'react';
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message'

function App() {

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowerCase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  
  const handleGeneratePassword = (e) => {
    let characterList = ''

    if(!includeUppercase && !includeLowerCase && !includeNumbers && !includeSymbols){
      notify("Porfavor seleccione alguna opción para continuar", true)
    }

    if(includeLowerCase) {
      characterList = characterList + lowerCaseLetters
    }

    if(includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if(includeNumbers) {
      characterList = characterList + numbers
    }

    if(includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for(let i=0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }
  }
  const handleCopyPassword = (e) => {
    if(password === '') {
      notify('No hay nada para copiar', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }
  }

  return (
    <div className="App">
        <div className="container">
          <div className="generator">
            <h2 className="generator_header">
              Generador de Contraseñas
            </h2>
            <div className="generator_password">
              <h3>{password}</h3>
              <button onClick={handleCopyPassword} className="copy_btn">
                <i className="far fa-clipboard"></i>  
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor='passsword-strenght'>N° carácteres</label>
              <input 
              defaultValue={passwordLength} 
              onChange={(e) => setPasswordLength(e.target.value)}
              name="password-strenght" 
              id="password-strenght" 
              max="20" 
              min="10" />
            </div>

            <div className="form-group">
            <label htmlFor='uppercase-letters'>Incluir mayúsculas</label>
              <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox" 
              name="uppercase-letters" 
              id="uppercase-letters"/>
            </div>

            <div className="form-group">
            <label htmlFor='lowercase-letters'>Incluir minúsculas</label>
              <input 
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox" 
              name="lowercase-letters" 
              id="lowercase-letters"/>
            </div>

            <div className="form-group">
            <label htmlFor='include-numbers'>Incluir números</label>
              <input 
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox" 
              name="include-numbers" 
              id="include-numbers"/>
            </div>

            <div className="form-group">
            <label htmlFor='include-symbols'>Incluir símbolos</label>
              <input 
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox" 
              name="include-symbols" 
              id="include-symbols"/>
            </div>

            <button onClick={handleGeneratePassword} className="generator_btn"> Generar </button>

            <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />

          </div>
        </div> 
    </div>
  );  
}

export default App;
