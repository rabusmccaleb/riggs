import React, { useState, useEffect, useContext } from "react";
import Filter_icon from '../../../../Resources/filter.png';
import "./FilterViewButton.css";

const FilterViewButton = () => {
    return (
        <div className="filter-button" onClick={() => { window.location.href = "/filter-controls";}}>
            <div className="filter-icon">
                <img src={ Filter_icon }/>
                <div className="cover"/>
            </div>

            <div className="filter-text">
                <label>Filter</label>
            </div>
        </div>
    )
}

export default FilterViewButton;