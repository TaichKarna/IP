import { useCallback, useEffect,  useState } from 'react'

function App() {
  const [length, setLength] = useState('8')
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');


  // const passGenerator = () => {useCallback(() => {
  //   let char='';
  //   let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  //   let pass='';
  //   // numAllowed? str+='0123456789': str+='';
  //   // charAllowed? str+='~!@#$%^&*()_': str+='';
  //     for(let i=1; i<=length; i++){
  //       char = Math.floor(Math.random() * str.length + 1);
  //       pass += str.charAt(char);
  //     }
  //   setPassword(pass);
  // },[length, numAllowed, charAllowed, setPassword])
  // }

  // useEffect(() => {
  //   passGenerator()
  // }, [length, numAllowed, charAllowed]);


  useEffect(() => {
    const passGenerator = () => {
      let char = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let pass = '';
      numAllowed ? (str += '0123456789') : (str += '');
      charAllowed ? (str += '~!@#$%^&*()_') : (str += '');
      for (let i = 1; i <= length; i++) {
        char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass);
    };

    passGenerator();
  }, [length, numAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className='flex flex-wrap flex-col 
        py-3 px-2 bg-slate-50 rounded-xl 
        mt-10 space-y-7 items-center'>
          <h1 className='text-black font-bold'>Password Generator</h1>
          <div>
            <input type="text" 
             className='rounded-l-lg bg-slate-100 px-2 py2 text-slate-500'
             placeholder='Password'
             size={40}
             value={password}
             name='password'
             readOnly/>
            <button className='bg-sky-400 px-2 py2 rounded-r-lg'>
              Copy
            </button>
          </div>
          <div className='space-x-2'>
            <input type="range"
            value={length} 
            min={6}
            max={40}
            onChange={(e) => {setLength(e.target.value)}}
            id='lengthAllowed'/>
            <label htmlFor="lengthAllowed">Length({length})</label>
            <input type="checkbox" 
            defaultValue={numAllowed}
            id='numberAllowed'
            onChange = { () => {
              setNumAllowed((prev) => !prev);} }
            />
            <label htmlFor="numberAllowed">Number</label>
            <input type="checkbox"
            defaultValue={charAllowed} 
            id='charAllowed'
            onChange = { () => {
              setCharAllowed((prev) => !prev);} }/>
            <label htmlFor="charAllowed">Character</label>
          </div>
        </div>
    </>
  )
}

export default App
