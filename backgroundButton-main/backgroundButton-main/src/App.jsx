                                                                                                             import { useState } from 'react'
import './index.css'

function App() {
  const [color, setColor] = useState(null);

  const changeColor = (event) => {
    let newColor = event.target.value;
    setColor(newColor);
  };
  return (
    <>
    <div className='container' style={{backgroundColor: color}}>
      <button
      className='button'
      onClick={changeColor}
      value='purple'
      >Violet
      </button>
      <button
      className='button'
      onClick={changeColor}
      value='grey'
      >Indigo
      </button>
      <button
      className='button'
      onClick={changeColor}
      value='blue'
      >Blue
      </button>
      <button
      className='button'
      onClick={changeColor}
      value='green'
      >Green
      </button>
      <button
      className='button'
      onClick={changeColor}
      value='yellow'
      >Yellow
      </button>
      <button
      className='button'
      onClick={changeColor}
      value='orange'
      >Orange
      </button>
      <button
      className='button'
      onClick={changeColor}
      value='red'
      >Red
      </button>
    </div>
    </>
  )
}
export default App


// {color && <Color color={color} />}