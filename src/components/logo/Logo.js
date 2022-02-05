import React from "react";
import Tilt from 'react-tilt'
import './Logo.css';
import brain from './brain.png';


const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt br2 shadow-2 pa2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"><img src={brain} alt={'logo'} /></div>
            </Tilt>
        </div>

        

    );
}

export default Logo;