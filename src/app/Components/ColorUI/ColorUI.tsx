import React from "react"
import './ColorUI.css'
/**
 * @opacity (optional): Between 0 & 1
 * @colonyCount (optional): Determines the amout of colors
 * @transitionSpeed (optional): Defaults to 0 should be between 0 and 1 second but can be larger
 */
interface ColorUIProps {
    opacity? : number 
    colonyCount? : number
    topComponent? : { children: React.ReactNode }
    transitionSpeed? : number
}

const ColorUI = ({ opacity, colonyCount, topComponent, transitionSpeed } : ColorUIProps) => {
    let counter = colonyCount ? colonyCount : 50;
    let colors = [];
    for(let x = 0; x < counter; x++){
        colors.push(x);
    }    
    function getColorNumber() {
        return Math.floor( Math.random() * 255);
    }
    
    return (
        <div className="colors-ui-container"
            key={ Math.random() * Math.random() * Math.random() * 1000000 * Math.random()}
            style={{
                transition: `${ transitionSpeed ? transitionSpeed : 0}s ease-in-out`,
                opacity: `${ (opacity && opacity <= 1 && opacity >= 0) ? opacity : 0.3 }`,
            }}
        >
            {
                colors.map((colors, index) => {
                    return (
                        <div
                            key={ index }
                            style={{
                                position: 'absolute',
                                zIndex : `${ Math.floor( Math.random() * 1000) }`,
                                height: `${ Math.floor( Math.random() * 250) }px`,
                                width: `${ Math.floor( Math.random() * 250) }px`,
                                borderRadius: '50%',
                                left: `${ Math.floor( Math.random() * 100) }%`,
                                top: `${ Math.floor( Math.random() * 100) }%`,
                                backgroundColor: `rgba( ${ getColorNumber() }, ${ getColorNumber() }, ${ getColorNumber() }, ${ Math.floor( Math.random() * 100) } )`
                            }}
                        ></div>
                    )
                })
            }
        </div>
    )
}

export default ColorUI;