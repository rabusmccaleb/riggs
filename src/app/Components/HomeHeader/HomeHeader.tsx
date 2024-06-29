import React, { useState, useEffect, useContext } from "react";
import "./HomeHeader.css";
import filtering from '../../../Resources/filtering.jpg';

export interface HeaderItemAndAppBigComModel {
    title: string;
    description: string;
    callToActionTitle: string;
    callToActionLink: string;
}

const HeaderItemAndAppBigCom = (
    {
        title,
        description,
        callToActionTitle,
        callToActionLink,
    }
    : HeaderItemAndAppBigComModel
) => {
    const placeholderImage = "https://picsum.photos/500/300"
	return (
		<div className="HeaderItem">
            <div className="header-card">

                <div className="header-card-image-container" 
                    // style={{ backgroundImage : `url(${ filtering /* placeholderImage */ })` }} 
                />
                <div className="header-card-content-container">
                    <div className="header-card-title">
                        <h1>{ title }</h1>
                    </div>
                    <div className="header-card-description">
                        <h5>{ description }</h5>
                    </div>
                    <a className="header-card-call-to-action-button" href={ callToActionLink }>
                        <label>{ callToActionTitle }</label>
                    </a>
                </div>


            </div>
        </div>
	)
}

export default HeaderItemAndAppBigCom;
