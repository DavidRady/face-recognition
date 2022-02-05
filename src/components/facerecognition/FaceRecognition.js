import React from "react";
import './FaceRecognition.css'


const FaceRecognition = ({ imageURL, box }) => {
    return (
        <div className="center ma"> 
            <div className="absolute mt2">
                <img id='inputImage' src={imageURL} width='500px' height='auto' />  
                {box ? 
                    (box.map(draw => 
                        (<div 
                            key={draw.topRow}
                            className='bounding-box'
                            style={{top: draw.topRow, right: draw.rightCol, bottom: draw.bottomRow, left: draw.leftCol}}></div>
                        ))
                    ) : (
                        <div></div>
                        )}
            </div>
        </div>
    );
}

export default FaceRecognition;