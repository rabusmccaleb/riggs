import React from "react";

export interface Prop {
    iconColor : string;
    dimension: number;
    zIndex: number;
}
export const PlayIcon = ({ 
        iconColor, 
        dimension, 
        zIndex 
    }: Prop) => {
    return (
        <div style={{ 
                position: "absolute",
                backgroundColor: `${ "transparent" }`, 
                height: `${ dimension }px`, 
                width: `${ dimension }px`,
                zIndex: `${ zIndex }` 
            }}>
            <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m6.73 20.93 14.05-8.54a.46.46 0 0 0 0-.78L6.73 3.07a.48.48 0 0 0-.73.39v17.07a.48.48 0 0 0 .73.4Z" fill={ `${ iconColor }` }></path>
            </svg>
        </div>
    );
}