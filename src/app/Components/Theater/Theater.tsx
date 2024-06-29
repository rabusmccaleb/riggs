import React, { useContext, useState, useEffect } from "react";
import uuidGenerator from "../../../SharedItems/UUIDGenerator";
import ControllerContext from "../../Contexts/ControllerContexts";
import UserContext from "../../Contexts/UserContext";
import { AddInteraction, AddItemToYourInteraction, InteractionsModel, InteractionTypeOptions, intereraction_DecrementField, intereraction_IncrementField } from "../../Controller/like_db_controller";
import { NotifyUser } from "../../Controller/notify_user_db_controller";
import { AddItemToYourViewlater } from "../../Controller/ViewLater_db_controller";
import { ContentModel } from "../../fb/dbMethods";
import { ApplicationName } from "../../Models/Models";
import { ResponseTypesList } from "../../Pages/Home/ContentView/ContentView";
import ColorUI from "../ColorUI/ColorUI";
import { CommentItem } from "../CommentSection/CommentSection";
import { AddComment, CommentModel, getAllComments } from "../CommentSection/Comments_DB_Methods";
import MoviePlayer from "../ContentComponents/MoviePlayer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./Theater.css";

const Theater = () => {
    const { theaterPostModelData, showTheaterView, toggleTheaterView } = useContext(ControllerContext);
    // 
    const [ renderView, setRenderView ] = useState<boolean>(false);
    const [ animateView, setAnimateView ] = useState<boolean>(true);
    useEffect(() => {
        if(showTheaterView) {
            setRenderView(showTheaterView);
            setTimeout(() => {
                setAnimateView(showTheaterView);
            }, 150);
        } else {
            setAnimateView(showTheaterView);
            setTimeout(() => {
                setRenderView(showTheaterView);
            }, 400);
        }
    }, [ showTheaterView ]);

    function GetContentDate(content: ContentModel): string {
		let dateString: string = "";
		// Do Work With Date
		let mDate : any = content.dateOfPost;
		mDate = mDate.toDate();
		const mDateTime = new Date(mDate);
		let dayjs_ = dayjs.extend(relativeTime);
		dateString = dayjs(mDateTime).fromNow();//.format('ddd, MMM D, YYYY h:mm A');
		//const english = new Intl.RelativeTimeFormat("en-us");
		// Return String
		return dateString;
	}

    return (
        <>
        { (renderView) &&
            <div className="TheaterView" style={{ opacity: animateView ? "100%" : "0%" }}>
                <div className="theater-vStack">
                    <div className="close-title-descrip-more-container">
                        <button className="close-button" onClick={()=> { toggleTheaterView( undefined, false); }}>x</button> 
                        <h1 className="app-name">{ ApplicationName }</h1>
                        <h4 className="theater-mode-name"> Theater Mode</h4>
                        <h4 className="description-container">Theater Mode helps you focus on the video content</h4>
                        { theaterPostModelData && <MoreButton item={ theaterPostModelData }/>}
                    </div>
                    <div className="theater-contentview">
                        <div className="content-container">           
                            { (theaterPostModelData && theaterPostModelData.videoPlaybackID) &&
                                <MoviePlayer id={ uuidGenerator() } playbackId={ theaterPostModelData.videoPlaybackID ? theaterPostModelData.videoPlaybackID : "" }/>
                            }
                            { (theaterPostModelData && theaterPostModelData.title) && <h1 className="content-title">{ theaterPostModelData.title }</h1>}
                            { (theaterPostModelData) && <EmojiViewContainer item={ theaterPostModelData } showEmojiResponse={ true }/>}
                            { (theaterPostModelData && theaterPostModelData.dateOfPost) && <label style={{ color: "rgba(255,255,255, 0.75)", fontSize: "12px", marginLeft: "0px" }}>{ GetContentDate(theaterPostModelData) }</label> }
                            { (theaterPostModelData && theaterPostModelData.textContent) && <p className="content-text-content">{ theaterPostModelData.textContent }</p> }
                        </div>
                        <div className="theater-comments-container">
                            <CommentSectionView contentModel={ theaterPostModelData }/>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}

interface EmojiViewContainerProps { item: ContentModel, showEmojiResponse: boolean }
const EmojiViewContainer = ({ item, showEmojiResponse }: EmojiViewContainerProps) => {
    const { userData, userInteractions } = useContext(UserContext);
    const [ responded, setResponded ] = useState<InteractionTypeOptions | undefined>(undefined);

    
	function hasInteracted(): (InteractionTypeOptions | undefined) {
		let type : InteractionTypeOptions | undefined = undefined;
		userInteractions.forEach(inter => {
			if (inter.postID === item.documentID) { type = inter.type; }
		})
		return type;
	}

    function getInteractionObject(): (InteractionsModel | undefined)  {
		let interaction : InteractionsModel | undefined = undefined;
		userInteractions.forEach(inter => {
			if (inter.postID === item.documentID) { interaction = inter; }
		})
		return interaction;
	}

    return (
        <div className='like-and-emoji-responses-container hideScrollIndicator'>
        <div className='like-and-emoji-responses-hstack'>
            {
                ResponseTypesList.map((resp, index) => {
                    return (
                        <div 
                            key={ index } 
                            className={`emoji-response-options ${ ((hasInteracted() && hasInteracted() === resp.type)) ? " active" : "" }`}
                            title={ resp.text }
                            onClick={() => {
                                if (showEmojiResponse) {
                                    // Adding a value to user interactions
                                    const interactionStatus = hasInteracted();
                                    if (interactionStatus && interactionStatus === resp.type) {
                                        // Removing the interaction behavoir all together
                                        const dec_obj = intereraction_DecrementField(resp.type);
                                        AddInteraction(
                                            userData.userID,
                                            item,
                                            undefined,
                                            dec_obj,
                                            getInteractionObject()
                                        );
                                        setResponded(_=> { return undefined });
                                    } else if(interactionStatus && interactionStatus !== resp.type){
                                        // Updating the interaction to be the changed interaction value
                                        const dec_obj = intereraction_DecrementField(interactionStatus);
                                        const inc_obj = intereraction_IncrementField(resp.type);
                                        AddInteraction(
                                            userData.userID,
                                            item,
                                            inc_obj,
                                            dec_obj,
                                            getInteractionObject(),
                                            (status) => {
                                                if (status) {
                                                    AddItemToYourInteraction(userData.userID, item.documentID, resp.type, (sucess) => {
                                                        if (sucess) {
                                                            console.log(`Interaction ${resp.text} added`);
                                                            // Notifying the user once we have interacted with their content
                                                            const notusText = `👋 Hi, You recieved a ${ resp.repsonseIcon } (${ resp.text }) from ${ userData.firstName } ${ userData.lastName }.`;
                                                            NotifyUser( item.userID, userData.userID, item, resp.type,notusText, 
                                                                (sucess) => {
                                                                    if (sucess) {
                                                                        console.log(`User Notified of interaction ${resp.text} added`);
                                                                    }
                                                            });
                                                        }
                                                    });
                                                    setResponded(_=> { return resp.type });
                                                }
                                            }
                                        );
                                    } else {
                                        // Adding interaction for an item a user has not interacted with
                                        const inc_obj = intereraction_IncrementField(resp.type);
                                        AddInteraction( userData.userID, item, inc_obj, undefined);
                                        AddItemToYourInteraction(userData.userID, item.documentID, resp.type, (sucess) => {
                                            if (sucess) {
                                                console.log(`Interaction ${resp.text} added`);
                                                // Notifying the user once we have interacted with their content
                                                const notusText = `👋 Hi, You recieved a ${ resp.repsonseIcon } (${ resp.text }) from ${ userData.firstName } ${ userData.lastName }.`;
                                                NotifyUser( item.userID, userData.userID, item, resp.type,notusText, 
                                                    (sucess) => {
                                                        if (sucess) {
                                                            console.log(`User Notified of interaction ${resp.text} added`);
                                                        }
                                                });
                                            }
                                        });
                                        setResponded(_=> { return resp.type });
                                    }
                                }
                            }}
                        >
                                <label>{ resp.repsonseIcon }</label>
                        </div>
                    )
                })
            }
        </div>
    </div>
    );
}

interface CommentSectionViewProps {
    contentModel: ContentModel; 
}
const CommentSectionView = ({ contentModel }: CommentSectionViewProps ) => {
    const { userData } = useContext(UserContext);
    const [ comment, setComment ] = useState<string>("");
    const [ thereAreComments , setThereAreComments ] = useState<boolean>(true);
    const [ comments, setComments ] = useState<CommentModel[]>([]);

    useEffect(() => {
        getAllComments(contentModel, (status, commentList) => {
            if (status) {
                setComments(_=> { return commentList});
                if (commentList.length < 1) setThereAreComments( b => { return false });
                if (commentList.length > 0) setThereAreComments( b => { return true });
            }
        });
    }, []);

    return (
        <div className='comment-section-container'>
            <h2 className="comment-section-title">Comments:</h2>
            { (contentModel && contentModel.title) &&
                <div className="comment-container">
                    <div className='comment-send-button-container'>
                        <textarea className='comment-area' placeholder='Comment...' value={ comment } onChange={e=> { setComment(_=> { return e.target.value; })}} />
                        <button className='comment-area-send-button' onClick={()=> { 
                            AddComment(contentModel, comment, userData);
                            setComment(_=> { return ""; })
                        }}>send</button>
                    </div>
                </div>
            }
            <div className="comment-section-content">
                <div className="comment-list-container">
                    { (thereAreComments === true) ?
                        comments.map((comment, index) => {
                            return ( 
                                <CommentItem contentModel={ contentModel } commentModel={ comment } index={ index }/>
                            )
                        })
                        :
                        <h4 style={{ 
                            color: "gray", 
                            fontSize: "14px",
                            marginTop: "8px",
                        }}>😕 Sorry, there are no comments for this post.</h4>
                    }
                </div>
            </div>   
        </div>
    );
}

interface MoreButtonProps { item: ContentModel }
const MoreButton = ({ item }: MoreButtonProps) => {
    const { userData } = useContext(UserContext);
    const { showErrorPopup } = useContext(ControllerContext);
    const [ showMoreOptions, setShowMoreOptions ] = useState<boolean>(false);
    const { toggleStartDirectMessageView } = useContext(ControllerContext);
    return (
        <button className="more-button" onClick={() => { setShowMoreOptions(b => { return !b; }); }}>
            <span className="dot"/><span className="dot"/><span className="dot"/>
            { showMoreOptions &&
                <>
                    <div className="focus-view"><div className="control-focus-view"/></div>
                    <div className="more-button-pop-up">
                        <div className="more-button-comtent">
                            <button className="options" onClick={() => {
                                AddItemToYourViewlater(userData.userID, item.documentID, (_) => {
                                    showErrorPopup(true, "Item was sucessfully added to your 'View Later' list", "View Later","var(--app-green-90)", undefined, true);
                                })
                            }}>Add To View Later</button>
                            <button className="options">Add To A Content Colony</button>
                            <button className="options">Copyrights</button>
                            <button className="options red">Report</button>
                        </div>
                    </div>
                </>
            }
        </button>
    )
}

export default Theater;