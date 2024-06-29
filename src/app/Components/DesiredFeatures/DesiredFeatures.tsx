import React, { useState, useContext, useEffect } from "react";
import ControllerContext from "../../Contexts/ControllerContexts";
import UserContext from "../../Contexts/UserContext";
import "./DesiredFeatures.css";
import {
    FeatureRequestModel,
    FeatureRequestType, 
    addFeatureRequest, 
} from "./DesiredFeaturesController";

const DesiredFeatures = () => {
    // Popup Logic
    const { 
        showDesiredFeaturesView, 
        toggleDesiredFeaturesView,
        showErrorPopup,
    } = useContext(ControllerContext);
    const [ renderView, setRenderView ] = useState<boolean>(false);
    const [ animateView , setAnimateView ] = useState<boolean>(false);
    useEffect(() => {
        if(showDesiredFeaturesView) {
            setRenderView(showDesiredFeaturesView);
            setTimeout(() => {
                setAnimateView(showDesiredFeaturesView);
            }, 150);
        } else {
            setAnimateView(showDesiredFeaturesView);
            setTimeout(() => {
                setRenderView(showDesiredFeaturesView);
            }, 400);
        }
    }, [ showDesiredFeaturesView ]);
    //
    //
    // Component Logic
    const { userData } = useContext(UserContext);
    const [ requestType, setRequestType ] = useState<FeatureRequestType>(FeatureRequestType.feature);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ reason, setReason ] = useState("");

    // Button
    const [ buttonDisabled, setButtonDisabled ] = useState<boolean>(false);
    return (
        <>
            { renderView &&
                <div className="DesiredFeaturesView" style={{ opacity: animateView ? "100%" :  "0%" }}>
                    <button 
                        className="close-button"
                        onClick={() => { toggleDesiredFeaturesView(false); }}
                    >x</button>
                    <div className="disired-features-container" style={{ transform: animateView ? "translateX(0)" : "translateX(150vh)",}}>
                        <div className="title-description-container">
                            <h1 className="title">Desired Features</h1>
                            <h5 className="main-description">Here to allow the community to contribute to the project.</h5>
                        </div>


                        <div className="field-items-container">
                            <div className="field-title-description">
                                <h4 className="title">*Request Type</h4>
                                <label className="description">Select a the type of request you are making.</label>
                                <select className="request-type" defaultValue={ requestType } onChange={e => {
                                    console.log("- Feature request type has changed: ", e.target.value);
                                    setRequestType( (curr) => {
                                        const type = e.target.value as FeatureRequestType;
                                        const returnType = type ? type : curr;
                                        console.log("1 Feature request type has changed: ", returnType);
                                        return returnType;
                                    })
                                }}>
                                    <option value={ FeatureRequestType.feature }>Feature</option>
                                    <option value={ FeatureRequestType.bug }>Bug Fix</option>
                                </select>
                            </div>
                        </div>
                        <div className="field-items-container">
                            <div className="field-title-description">
                                <h4 className="title">Title</h4>
                                <label className="description">{"(option) please give a title to your request"}</label>
                                <input 
                                    className="field title-field" 
                                    type={ "text" }
                                    value={ title }
                                    placeholder="Title"
                                    onChange={e => {
                                        setTitle(_=> { return e.target.value; })}
                                    }
                                />
                            </div>
                        </div>
                        <div className="field-items-container">
                            <div className="field-title-description">
                                <h4 className="title">*Request Description</h4>
                                <label className="description">{
                                    (requestType === FeatureRequestType.feature) ?
                                    "Allows you to describe your feature request." :
                                    "Allows you to describe the bug in question and tell us where to find it."
                                }</label>
                                <textarea 
                                    className="field request"
                                    value={ description }
                                    onChange={e => {setDescription(_=> { return e.target.value; })}} 
                                    placeholder={ (requestType === FeatureRequestType.feature) ? "Describe your request..." : "Describe the bug..."}
                                />
                            </div>
                        </div>
                        { (requestType === FeatureRequestType.feature) && 
                            <div className="field-items-container">
                                <div className="field-title-description">
                                    <h4 className="title">Reason For Feature Request</h4>
                                    <label className="description">The helps us determine the urgeny or the utilitu of the feature to the user experience</label>
                                    <textarea 
                                        className="field reason"
                                        value={ reason }
                                        onChange={e => {setReason(_=> { return e.target.value; })}} 
                                        placeholder="Explain your reasoning for the request..."
                                    />
                                </div>
                            </div>
                        }

                        <button 
                            className="submit-button"
                            disabled={ buttonDisabled }
                            onClick={() => {
                                if (description.trim() !== "") {
                                    const requestField = document.querySelector(".DesiredFeaturesView .disired-features-container .field-items-container .field.request");
                                    // @ts-ignore
                                    requestField.style.border = "none";
                                    //
                                    //
                                    setButtonDisabled(_=> { return true; });
                                    const obj: FeatureRequestModel = {
                                        userID: userData.userID,
                                        requestType: requestType,
                                        title: title ,
                                        description: description,
                                        reason: (requestType === FeatureRequestType.feature) ? reason : "" ,
                                        requestID: undefined,
                                    }
                                    addFeatureRequest(obj, (completedWithoutError) => {
                                        if (completedWithoutError) {
                                            toggleDesiredFeaturesView(false);
                                            showErrorPopup(
                                                true, "🎉 You've added feedback sucessfully! We'll take a look shortly!", 
                                                undefined, "var(--app-green-50)", 
                                            );
                                            setButtonDisabled(_=> { return false; });
                                        } else {
                                            showErrorPopup(
                                                true, "☹️ Error: There seems to be an error uploading your there seems to be an error uploading your feedback back. It may help to try again.", 
                                                undefined, "var(--app-red-50)");
                                                setButtonDisabled(_=> { return false; }
                                            );
                                        }
                                    })
                                } else {
                                    const requestField = document.querySelector(".DesiredFeaturesView .disired-features-container .field-items-container .field.request");
                                    // @ts-ignore
                                    requestField.style.border = "2px solid var(--app-red-80)"
                                    showErrorPopup(
                                        true, "☹️ You seem to be missing a request description", 
                                        undefined, "var(--app-red-50)");
                                        setButtonDisabled(_=> { return false; }
                                    );
                                }
                            }}
                            >{ (requestType === FeatureRequestType.feature) ? "request" : "inform"}</button>

                    </div>
                </div>
            }
        </>
   )
}

export default DesiredFeatures;