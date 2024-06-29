import React, { useState, useEffect, useContext } from "react";
import "./DunbarColony.css";
import owned from "../../../Resources/CityExamples/owned/free_3.jpg"
import DunbarChatContainer from "./DunbarColonyComponents/DunbarChatContainer";
import DunbarContext, { ChatThreadType, DunbarContextProvider } from "./DunbarContext/DunbarContext";
import UserContext from "../../Contexts/UserContext";
import { DunbarSubThreadModel, test_CreateDunbarNewColony } from "./DunbarBackend/DunbarColonyMangament";
import DunbarSubThreadPopUp from "./DunbarColonyComponents/DunbarSubThreadPopUp/DunbarSubThreadPopUp";
import DunbarSubThreadVoting from "./DunbarColonyComponents/DunbarSubThreadPopUp/DunbarSubThreadVoting/DunbarSubThreadVoting";

const DunbarColony = () => {
    const [ showDunbarTelos, setShowDunbarTelos ] = useState<boolean>(false);
    const [ toggleSubThread, setToggleSubThread ] = useState<boolean>(false);

    return (
        <DunbarContextProvider>
            <div className="DunbarColony">
                <div className="dunbar-colony-enviorment" style={{ backgroundImage: `url("${ owned }")`}}>
                    <div className="dunbar-colony-spirit-"></div>
                </div>
                <div className="dunbar-colony-content">
                    <DunbarHeader setShowDunbarTelos={ setShowDunbarTelos } />
                    <DunbarSubThreadPopUp toggleSubThread={ toggleSubThread } setToggleSubThread={ setToggleSubThread }/>
                    { showDunbarTelos && <DunbarTelos showDunbarTelos={ showDunbarTelos } setShowDunbarTelos={ setShowDunbarTelos }/> }
                    <DunbarChatViewContainer toggleSubThread={ toggleSubThread } setToggleSubThread={ setToggleSubThread }/>
                    <DunbarSubThreadVoting/>
                </div>
            </div>
        </DunbarContextProvider>
    );
}

export default DunbarColony;

const linkToDunbarWikiPage = "https://en.wikipedia.org/wiki/Dunbar's_number";

interface DunbarHeaderProps {
    setShowDunbarTelos: React.Dispatch<React.SetStateAction<boolean>>
}
const DunbarHeader = ({ setShowDunbarTelos }: DunbarHeaderProps) => {
    const { dunbarColonyObj } = useContext(DunbarContext);
    const ViewHeaderTitle = "Dunbar Colony"; 
    return (
        <div className="dunbar-header">
            <div className="view-header-title">
                <h2>{ ViewHeaderTitle }</h2>
            </div>
            <div className="colony-pupose-butto-container">
                <button className="show-long-explaination-button" onClick={()=> { setShowDunbarTelos(b=> { return !b }); }}>?</button>
            </div>
            <DunbarColonyController setShowDunbarTelos={ setShowDunbarTelos } />
        </div>
    );
}


interface DunbarColonyControllerProps {
    setShowDunbarTelos: React.Dispatch<React.SetStateAction<boolean>>
}
const DunbarColonyController = ({ setShowDunbarTelos }: DunbarColonyControllerProps) => {
    const { userData } = useContext(UserContext);
    const { dunbarColonyObj, checkToSeeIfSubThreadDataExist_and_grabDoc, threadType, selectedSubThreadID } = useContext(DunbarContext);
    const [ dunbarAcceptedSubThreads, setDunbarAcceptedSubThreads ] = useState<DunbarSubThreadModel[]>([]);
    useEffect(()=> {
        if (dunbarColonyObj) {
            const acceptedSubThreads = dunbarColonyObj.subthreads.filter(item => {
                const list = item.votes.filter(i => { if (i.shouldExist) { return i; } });
                if (list.length > 1) { return item };
            });
            setDunbarAcceptedSubThreads(_=> { return acceptedSubThreads; });
        }
    }, [ dunbarColonyObj ]);
    return (
        <div className="colony-controller">
            {(dunbarColonyObj && dunbarColonyObj.subthreads.length > 0) &&
                <div className="colony-sub-threads hideScrollIndicator">
                <div className="colony-sub-thread-content-view">
                    <>
                        <div className={`subthread-options default ${threadType === ChatThreadType.default ? " active" : ""}`} onClick={() => { checkToSeeIfSubThreadDataExist_and_grabDoc(ChatThreadType.default, undefined, undefined) } }>
                        <div className="subthread-image-container"/><label>Default</label></div>
                        { 
                            dunbarAcceptedSubThreads.map((subthread, index) => {
                                return (
                                    <div 
                                        className={`subthread-options${
                                        ((threadType !== ChatThreadType.default) && (selectedSubThreadID === subthread.thread_doc_id)) 
                                        ? " active" : ""
                                        }`}
                                        onClick={() => { checkToSeeIfSubThreadDataExist_and_grabDoc(ChatThreadType.subThread, subthread.thread_doc_id, subthread) }}
                                    >
                                        <div className="subthread-image-container">
                                            <img loading={"lazy"} src={ subthread.imagURL }/>
                                            <div className="image-cover"/>
                                        </div>
                                        <label>{ subthread.title }</label>
                                    </div>
                                )
                            })
                        }
                    </>
                </div>
            </div>
            }
        </div>
    )
}

interface DunbarTelosType { showDunbarTelos: boolean; setShowDunbarTelos: React.Dispatch<React.SetStateAction<boolean>>; }

const realExplaination = `
    Dunbar Colony represents an exciting innovation designed specifically for a community of this nature. While many of you may be familiar with the concept of Dunbar's number, let's provide a brief recap:
    <br/>
    <b>Dunbar's number signifies the estimated threshold of around 150 significant social connections a person can effectively manage due to cognitive limitations.</b>
    <br/>
    This feature pays tribute to this concept and explores the notion of creating a community with a maximum group size of 150 individuals.
    <br/>
    <a href="${linkToDunbarWikiPage}" target="_blank" rel="noopener noreferrer">Link To The Wikipedia Page.</a>
    <br/>
    <br/>
    <h4>Dunbar Colony Subthreads: </h4>
    <p>We enabled a subthread feature to allow nested conversations about something specific within the colony. You can initiate a subthread within Dunbar Colony by click on the plus icon in the bottom right of the view.</p>
`;

const DunbarTelos = ({ showDunbarTelos, setShowDunbarTelos }: DunbarTelosType) => {
    useEffect(()=> {}, [ showDunbarTelos ])
    return (
        <div className="dunbar-telos" style={{ height : showDunbarTelos ? 'fit-content' : 0 }}>
            <div className="dunbar-content-container">
                <div className="close-and-title-container">
                    <button className="close-telos-button" aria-label="close-explaination-button" onClick={() => { setShowDunbarTelos(_=> { return false }); }}>
                        <div>x</div>
                    </button>
                    <h4 className="dunbar-description-title">{ "Purpose of Dunbar Colony: " }</h4>
                </div>

                <div className="dunbar-telos-content">
                    <p className="dunbar-text-content" dangerouslySetInnerHTML={{__html: realExplaination }} />
                </div>
            </div>
        </div>
    )
}


// Dunbar Chat View Container
interface DunbarChatViewContainerProps { toggleSubThread : boolean; setToggleSubThread: React.Dispatch<React.SetStateAction<boolean>>; }
const DunbarChatViewContainer = ( { toggleSubThread, setToggleSubThread }: DunbarChatViewContainerProps ) => {
    const { dunbarColonyObj } = useContext(DunbarContext);

    return (
        
        <div className="dunbar-colony-chat-view-container">
            { dunbarColonyObj && <DunbarChatContainer/> }
            { dunbarColonyObj && <DunbarCreatationContoller toggleSubThread={ toggleSubThread } setToggleSubThread={ setToggleSubThread }/> }
        </div>
    )
};

// More buttons at the side of a message to handle reporting and other responses to a post
interface DunbarCreatationContollerProps { toggleSubThread : boolean; setToggleSubThread: React.Dispatch<React.SetStateAction<boolean>>; }
const DunbarCreatationContoller = ({ toggleSubThread, setToggleSubThread }: DunbarCreatationContollerProps) => {
    return (
        <div 
            className="dunbar-creation-conotroller" 
            style={{ right: toggleSubThread ? "-40vw" : "20px" }}
            onClick={() => { setToggleSubThread(_=> { return true; }) }}
        >
            <div className="add-icon">
                <span className="h"/>
                <span className="v"/>
            </div>
        </div>
    )
}