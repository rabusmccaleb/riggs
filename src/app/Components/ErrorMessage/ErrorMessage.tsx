import React, { useState, useEffect, useContext } from "react";
import ControllerContext from "../../Contexts/ControllerContexts";
import ColorUI from "../ColorUI/ColorUI";
import './ErrorMessage.css';

export enum ErrorIconOption {
    hazard = "hazard",
    bell = "bell",
    pauseHand = "pauseHand",
}

const ErrorMessage = () => {
    const { 
        errorMessage,
        renderErrorMessagePopUp,
        showErrorPopup,
        errorMessageBackgroundColor,
        iconOption,
        errorMessageTitle,
        allowUserToCloseErrorMessage,
        errorMessageCloseTime,
     } = useContext(ControllerContext);
    const [ animateErrorMessage, setAnimateErrorMessage ] = useState<boolean>(false);
    useEffect(() => {
        if (renderErrorMessagePopUp) {
            setTimeout(()=> { setAnimateErrorMessage(_=> { return true }); }, 300); // A third of a second delay
            timeCloseErrorMessage()
        } else {
            setTimeout(()=> { setAnimateErrorMessage(_=> { return false }); }, 300); // A third of a second delay
        }
    }, [ renderErrorMessagePopUp ]);

    function closeErrorMessage() {
        showErrorPopup(false, "", undefined, undefined, undefined, undefined, true );
    }

    let timer: any;
    function timeCloseErrorMessage() {
        if (errorMessageCloseTime) {
            timer = setTimeout(() => {  closeErrorMessage(); }, errorMessageCloseTime)
        } else {
            timer = setTimeout(() => {  closeErrorMessage(); }, 2500)// 2.5 seconds
        }
    }

    function returnIconResource(icon: ErrorIconOption ): string {
        switch (icon) {
            case ErrorIconOption.hazard:
                return "";
                break;
            case ErrorIconOption.pauseHand:
                return "";
                break;
            case ErrorIconOption.bell:
                return "";
                break;
            default:
                return "";
                break;
        }
    }

    return (
        <div className="ErrorMessage" style={{ 
            transform: animateErrorMessage ? "translateY(0)" : "translateY( calc(100% + 50px))",
        }}>
            <div className="error-message-view-content" style={{ 
                opacity : animateErrorMessage ? "1" : "0",
                backgroundColor: errorMessageBackgroundColor ? errorMessageBackgroundColor : "white"
            }}> 
                { allowUserToCloseErrorMessage && <button className="close-error-message" onClick={()=> { closeErrorMessage(); }} >x</button> }
                <div className="error-message-background">
                    <ColorUI colonyCount={ 200 }/>
                </div>
                <div className="error-message-content">
                    {/* { ErrorIconOption && 
                        <div className="error-message-icon-container">
                            <img loading={"lazy"} src={returnIconResource(iconOption)}/>
                            <div className="image-cover"/>
                        </div> 
                    } */}
                    <div className="error-message-explaination">
                        { errorMessageTitle && <h4 className="message-title">{ errorMessageTitle }</h4>}
                        <p>{ errorMessage }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorMessage;