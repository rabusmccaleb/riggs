import React, { useState, useEffect, useContext, useRef } from "react";
import './Dunbar_Ad.css'; // Grabbing the Ad Model

interface DunbarAdModel { index: number; }
const Dunbar_Ad = ({ index }: DunbarAdModel ) => {
    return (
        <>
            { (  (index >= 5 && ((index % 5) === 0)) || (index >= 7 && ((index % 7) === 0))  ) &&  
             <div className="d-c-a-d-item">
                <span style={{ position: "absolute", color: "var(--app-green-80)", padding: "2px", fontSize: "10px", left: "8px", top: "8px", zIndex: "10000", backgroundColor: "white"}}>Ad</span>
                <ActualAd/>
            </div>
            }
        </>
    )
}

export default Dunbar_Ad;

const ActualAd = () => {
    useEffect(()=> {
        // @ts-ignore
        // (adsbygoogle = window.adsbygoogle || []).push({});
    }, []);
    return (
        <>
            {/* @ts-ignore */}
        <ins className="adsbygoogle"
            style={{display:"block"}}
            data-ad-format="fluid"
            data-ad-layout-key="-fh+5x+48-cv+7p"
            data-ad-client="ca-pub-5619224767870187"
            data-ad-slot="8393163868"
            data-adbreak-test="on"
            ></ins>
        </>
    )
}