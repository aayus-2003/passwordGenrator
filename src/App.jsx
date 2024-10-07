import { useCallback, useEffect, useState ,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numberAllow, setNumberAllow] = useState(false)
  const [symbolallow, setSymbolallow] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ''
    let str = 'qwertyuioplkjhgfdsazcxvbnm'
    if(lowercase) str += str 
    if(uppercase) str += 'QWERTYUIOPLKJHGFDSAZXCVBNM';
    if(numberAllow) str += '1234567890';
    if(symbolallow) str += '`~!@#$%^&*()_-+={}[]:;"<>?/';

    for(let i = 0; i < length; i++){
      let ran = Math.floor(Math.random() * str.length)
      pass += str[ran]
    }
    setPassword(pass)

  }, [length, uppercase, lowercase, numberAllow, symbolallow, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenrator()
  }, [length, numberAllow, symbolallow, lowercase, uppercase, passwordGenrator])


  return (
    <>
     <body className="bg-gray-900 text-white flex items-center justify-center h-screen">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">

        <div className="flex items-center justify-between mb-4">
            <input type="text" id="password"
             ref={passwordRef}
            className="w-full bg-gray-700 p-2 rounded text-lg text-green-300" value={password} readonly />
            <button className="ml-2 text-green-500">
            <i className="fa-regular fa-copy text-3xl ml-2" 
               onClick={copyPasswordToClipboard}
            ></i>
            </button>
        </div>
        
 
        <div className="mb-4">
            <label className="block text-sm font-medium">Character Length</label>
            <input type="range" id="length" min={8} max={18} value={length}
            onChange={(e) => {
              setLength(e.target.value)
            }}
            className="w-full mt-1 accent-green-500" />
            <div className="text-right text-2xl font-semibold text-green-500">{length}</div>
        </div>

  
        <div className="space-y-2">
            <div className="flex items-center">
                <input type="checkbox" id="uppercase"
                onChange={() => {
                  setUppercase((prev) => !prev)
                }}
                className="accent-green-500" />
                <label for="uppercase" className="ml-2">Include Uppercase Letters</label>
            </div>
            <div className="flex items-center">
                <input type="checkbox"
                onChange={() => {
                  setLowercase((prev) => !prev)
                }}
                id="lowercase" className="accent-green-500" checked/>
                <label for="lowercase" className="ml-2">Include Lowercase Letters</label>
            </div>
            <div className="flex items-center">
                <input type="checkbox"
                 onChange={() => {
                  setNumberAllow((prev) => !prev)
                }}
                id="numbers" className="accent-green-500" />
                <label for="numbers" className="ml-2">Include Numbers</label>
            </div>
            <div className="flex items-center">
                <input type="checkbox"
                 onChange={() => {
                  setSymbolallow((prev) => !prev)
                }}
                id="symbols" className="accent-green-500" />
                <label for="symbols" className="ml-2">Include Symbols</label>
            </div>
        </div>


        {/* <div className="mt-4">
            <div className="flex justify-between items-center">
                <span className="text-sm">Strength</span>
                <span className="text-lg font-semibold text-yellow-400">Medium</span>
            </div>
            <div className="flex mt-2">
                <div className="w-1/4 h-2 bg-yellow-400 mr-1 rounded"></div>
                <div className="w-1/4 h-2 bg-yellow-400 mr-1 rounded"></div>
                <div className="w-1/4 h-2 bg-yellow-400 mr-1 rounded"></div>
                <div className="w-1/4 h-2 bg-gray-600 rounded"></div>
            </div>
        </div> */}

 
        <button
        onClick={copyPasswordToClipboard}
        className="mt-6 w-full bg-green-500 text-gray-900 p-2 rounded-lg font-semibold hover:bg-green-600">
            Copy →
        </button>
    </div>

</body>
    </>
  )
}

export default App
