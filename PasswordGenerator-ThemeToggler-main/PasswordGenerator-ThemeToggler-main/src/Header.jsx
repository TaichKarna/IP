import React, { useState } from 'react'
import { BsFillSunFill } from "react-icons/bs";
import useTheme from './conext/ThemeContext';

const Header = () => {
    const {lightTheme, darkTheme} = useTheme();
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        const newClicked = !clicked;
     setClicked(newClicked);
        if(clicked){
            lightTheme()
        }else{
            darkTheme()
        }
    };
  return (
    <header className='bg-pink-500 flex dark:bg-gray-500'>
        <div className='font-serif font-bold flex ml-auto'>
            <h3 className='2xs:m-0 xs:m-2 dark:text-white'>
                Secure your eyes
            </h3>
            <button className='mr-8 ml-3 2xs:m-0 2xs:ml-1 2xs:mr-1 xs:m-2 xs:mr-8'
               onClick={handleClick} >
                <BsFillSunFill className='icon' />
            </button>
        </div>
    </header>
  )
}

export default Header