import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'

function App() {
  const [password, setPassword] = useState('password')
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  })

  const passwordMaker = useCallback(() => {
    let pass ='';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(charAllowed){
      str += '!@#$%&^*_~`<>?\/!@#$%&'
    }
    if(numAllowed){
      str +='0123456789'
    }
    for(let i=1; i<length; i++){
      let char = Math.floor(Math.random()*str.length) + 1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[charAllowed, length, numAllowed])

  useEffect(() =>{
    passwordMaker()
  },[charAllowed, length, numAllowed]);

  return (
    <>
    <div className="flex flex-col h-screen">
      <Header/>
      <div className='flex flex-col justify-center items-center flex-grow  
        p-5+- bg-blue-200 dark:bg-gray-900 '>
        <div className='w-full rounded p-2 m-5 bg-white font-serif max-w-[calc(100%-10px)]
         sm:max-w-xl md:max-w-2xl dark:bg-gray-500 dark:text-white'>
          <h1 className='text-center font-bold'>
            Password Generator with Theme toggler
          </h1>
          <div className='flex flex-col items-center'>
            <input type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className='bg-slate-100 p-1 rounded w-full mt-5 max-w-[calc(100%-40px)]
            mr-20 ml-20 text-center font-sans dark:text-black' 
            />
            <button
              className='bg-green-300 m-2 w-20 p-1 rounded border-0 dark:bg-yellow-300
              hover:bg-green-200 transition duration-100 transform hover:scale-110 dark:text-black'
              onClick={copyPassword}>
                Copy
            </button>
          </div>
          <div className='hidden xs:flex justify-center mb-10 mt-5'>
            <input
              type="range"
              id="length"
              value={length}
              min={8}
              max={20}
              onChange={(e) => { setLength(e.target.value) }}
              className='m-1 w-20'
            />
            <label htmlFor="length"
              className='mr-1'>
              Length: {length}
            </label>
            <input
              type="checkbox"
              id="number"
              value={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              className='m-1'
            />
            <label htmlFor="number">
              Number
            </label>
            <input
              type="checkbox"
              id="symbol"
              value={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className='m-1'
            />
            <label htmlFor="symbol">
              Symbols
            </label>
          </div>
          <div className='flex flex-col items-center mb-10 mt-5 xs:hidden'>
            <div className='flex justify-center mb-5'>
              <input
                type="range"
                id="length"
                value={length}
                min={8}
                max={20}
                onChange={(e) => { setLength(e.target.value) }}
                className='m-1 w-20 mr-2'
              />
              <label htmlFor="length">
                Length: {length}
              </label>
            </div>
            <div className='flex justify-center'>
              <input
                type="checkbox"
                id="number"
                value={numAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className='m-1'
              />
              <label htmlFor="number"
                className='mr-1'>
                Number
              </label>
              <input
                type="checkbox"
                id="symbol"
                value={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className='m-1'
              />
              <label htmlFor="symbol">
                Symbols
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
