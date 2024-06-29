import React from "react";
import { CommunityInterestDataModel } from "./NewUserPage";

interface SelectTopicsOfInterestModel { 
    itemsOfInterest : CommunityInterestDataModel[]; 
    setItemsOfInterests : React.Dispatch<React.SetStateAction<CommunityInterestDataModel[]>>
}
const SelectTopicsOfInterest = ({itemsOfInterest, setItemsOfInterests }:SelectTopicsOfInterestModel) => {
    return (
        <div className="topics-of-inteterst-scrollview-view">
            <div className="topics-of-interets-content-view">
                <h2 className="topics-of-interest-title">Select Topics That Interest You</h2>
                <p className="topics-of-interest-description">The selections below will help us recommend content to you and help set the stage for the general exam in the next section.</p>
                <div className="topics-of-interest-container">
                    {
                        itemsOfInterest.map((item, index) => {
                            return (
                                <div key={ index } className={`topic-item${ item.selected ? " active" : ""}`} onClick={() => {
                                    let list = itemsOfInterest.map((elem, i) => {
                                        if (i === index) { return { title: elem.title, selected: !elem.selected };
                                        } else { return elem; }
                                    })
                                    setItemsOfInterests(list);
                                }}>
                                    <label className="topic-title">{ item.title }</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SelectTopicsOfInterest;