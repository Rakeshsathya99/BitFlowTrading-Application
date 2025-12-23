import React, { useState } from "react";
import { Button } from "../ui/button";


const DarkMode = ({handleDarkModeToggle }) => {

    const [isClicked, setIsClicked] = useState(false);
    
    const handleClick = () => {
        setIsClicked(!isClicked);
        handleDarkModeToggle();
    }

    return(
        <>
        <div className="ToogleButton">
            <Button onClick= {handleClick}>
              {
                isClicked ? 'LightMode' : 'DarkMode'
              } 
            
            </Button>

        </div>
        </>
    )
}

export default DarkMode;