import React, { useState, useEffect, useContext } from "react";
import ControllerContext from "../../Contexts/ControllerContexts";
import { ApplicationName } from "../../Models/Models";
import ColorUI from "../ColorUI/ColorUI";
import './ConstitutionView.css';

const freeSpeech : ConstitutionItemProps = { 
    title: "On Free Speech...", 
    content: `
    Free speech is a cornerstone of democracy, preserving individual liberty and promoting societal progress. It guards against tyranny, fosters innovation, and enables open dialogue essential for personal development, accountability, and cultural enrichment. While limited in cases of harm, free speech's vital role in informed decision-making and the exchange of diverse ideas makes it a fundamental and necessary right. This means we lean in favor of free speech, but will absolutely look into egregious dialogue. Your voice matters; if you disagree with what you consider bad ideas, share your opinion. In general, we hope this community cares less about politics and more about exciting ideas from every field and industry.
    `
}
const onRespect : ConstitutionItemProps = { 
    title: "On Censorship...", 
    content: `
    To promote sincere and meaningful conversations and the exchange of ideas, our inclination leans toward upholding free speech. However, if something is unmistakably severe or intended to cause harm, we will make an effort to investigate and consider appropriate disciplinary measures.
    ` 
}

const onPolitics : ConstitutionItemProps = { 
    title: "On Politics...", 
    content: `
    Political conversations are certainly allowed, but they are far less interesting than physics. Given the insight of the community, it would be interesting to experiment with a bias toward dialogue about things that could rapidly change the world. In general, we still leave it up to you.
    ` 
}

const constitutionItems : ConstitutionItemProps[] = [
    freeSpeech,
    onRespect,
    onPolitics,
]

const ConstitutionView = () => {
    const { showConstitution, setShowConstitutionView } = useContext(ControllerContext);
    const [ renderView, setRenderView ] = useState<boolean>(false);
    const [ animateView, setAnimateView ] = useState<boolean>(false);
    useEffect(() => {
        if(showConstitution) {
            setRenderView(showConstitution);
            setTimeout(() => {
                setAnimateView(showConstitution);
            }, 150);
        } else {
            setAnimateView(showConstitution);
            setTimeout(() => {
                setRenderView(showConstitution);
            }, 400);
        }
    }, [ showConstitution ]);

    return (
        <>
            { renderView && 
                <div className="ConstitutionView" style={{ backdropFilter: animateView ? "blur(2px)" : "none" }}>
                    <div className="Constitution-View hideScrollIndicator" style={{ transform: animateView ? "translateY(0)" : "translateY(110vh)" }}>
                        <div style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                        }}>
                            <ColorUI/>
                        </div>
                        <div className="close-button" onClick={() => { setShowConstitutionView(false); }}>
                            <button onClick={() => { setShowConstitutionView(false); }}>x</button>
                        </div>
                        <div className="constitution-content-view" >
                            <h1>{ `${ ApplicationName } Constitution:` }</h1>
                            {/* Constitution Items */}
                            <ul>
                                {
                                    constitutionItems.map((i, index) => {
                                        return <CustiutionItems title={ i.title } content={ i.content } index={ index }/>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ConstitutionView;

interface ConstitutionItemProps {
    title: string;
    content: string;
    index?: number;
}
const CustiutionItems = ({ title, content, index }: ConstitutionItemProps) => {
    return (
        <li key={ index }>
            <h4>{ title }</h4>
            <p>{ content }</p>
        </li>
    )
}


export const MobileConstitutionView = () => {
    return (
        <div className="ConstitutionView mobile mobileApp" style={{ backdropFilter:"blur(2px)", backgroundColor: "white" }}>
            <ColorUI/>
            <div className="Constitution-View hideScrollIndicator" style={{ transform: "translateY(0)" }}>
                <div style={{ position: "absolute", left: 0,  top: 0 }}>
                </div>
                <div className="constitution-content-view" >
                    <h1>{ `${ ApplicationName } Constitution:` }</h1>
                    {/* Constitution Items */}
                    <ul>
                        {
                            constitutionItems.map((i, index) => {
                                return <CustiutionItems title={ i.title } content={ i.content } index={ index }/>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}



/*

To promote sincere and meaningful conversations and the exchange of ideas, our inclination leans toward upholding free speech. However, if something is unmistakably severe or intended to cause harm, we will make an effort to investigate and consider appropriate measures for disciplinary action.

*/

export const ImageCloserLook = () => {
    const { imageUrl , showImageCloserLook, toggleImageCloserLook } = useContext(ControllerContext);
    return (
        <div style={{
            position: "absolute",
            transition: "0.75s ease-in-out",
            // @ts-ignore
            "-webkit-transition": "0.75s ease-in-out",
            top: showImageCloserLook ? "0px" : "1000vh",
            opacity: showImageCloserLook ? "100%" : "0%",
            right: "0",
            zIndex: "400000000000000000000000000",
            width: "100vw",
            height: "100vh",
            display: "grid",
            placeItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)"
        }}

        onClick={()=> {
            toggleImageCloserLook("", false)
        }}
        >
        <label 
            style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "0",
                zIndex: "500000000000000000000000000",
                width: "fit-content",
                height: "fit-content",
                display: "grid",
                placeItems: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "24px",
                fontFamily: "M PLUS Rounded 1c"
            }}
            onClick={()=> { toggleImageCloserLook("", false) }}>X</label>

            { showImageCloserLook &&
                <img loading={"lazy"} src={ imageUrl } style={{
                    position: "relative",
                    height: "fit-content",
                    minHeight: "calc(100% - 200px)",
                    maxHeight: "calc(100% - 50px)",
                    width: "fit-content",
                    maxWidth: "calc(100% - 100px)",
                    objectFit: "contain",
                    borderRadius: "20px",
                    border: "2px solid black",
                }}/>
            }
        </div>
    )
}