import React, { useState, useEffect, useContext, useRef } from "react";
import { storage } from "../../../fb/fbSetup";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import UserContext from "../../../Contexts/UserContext";
import { CurrentUserDataModel, MessageRelationModel } from "../../../Models/Models";
import './DunbarChatContainer.css';
import uuidGenerator from "../../../../SharedItems/UUIDGenerator";
import { AddANewMessage, DunbarThreadItemModel, getImagePathRef, getMessageObject, getProfileImageRef } from "../DunbarBackend/DunbarBackend";
import Dunbar_Ad from "./Dunbar_Ads/Dunbar_Ad";
import DunbarContext, { ChatThreadType } from "../DunbarContext/DunbarContext";
import { sizePostPendObj, userprofile_storage_path } from "../../../fb/dbMethods";
import sendIcon from "../../../../Resources/send_white.png";
import mediamodeIcon from "../../../../Resources/image.png";
import Compressor from "compressorjs";
import ControllerContext from "../../../Contexts/ControllerContexts";

export interface ChatContainerProps {
    messageRelationModel?: MessageRelationModel;
}

const DunbarChatContainer = ({ messageRelationModel }: ChatContainerProps) => {
    const listUserProfileImageUrls = useRef<{ userID: string , profileImageURL: string }[]>([]);
    function addANewProfileImageUrl(newItem: { userID: string , profileImageURL: string }) {
        const newItemList = [ { userID: newItem.userID, profileImageURL: newItem.profileImageURL } ];
        const itemsList: { userID: string; profileImageURL: string }[] = [ ...listUserProfileImageUrls.current, ...newItemList ];
        listUserProfileImageUrls.current = itemsList;
    }

    const { dunbarThreadList, threadType, selectedSubThreadID } = useContext(DunbarContext);
    const { userData } = useContext(UserContext);
    const [ chatMode, setChatMode ] = useState<ChatMode>(ChatMode.Default);
    const [ threadItems, setThreadItems ] = useState<DunbarThreadItemModel[]>([]);
    const [ message, setMessage ] = useState<string>("");
    const [ imageFile, setImageFile ] = useState<File | undefined>(undefined);

    function getDaysAgo(messages: DunbarThreadItemModel[]): string[] {
        let DaysAgoObj = {};
        messages.forEach(mess => {
            let mDate : any = mess.messageTime;
            mDate = mDate.toDate();
            const mDateTime = new Date(mDate);
            const dateJS_messageDate_m = dayjs(mDateTime);
            let currDate = new Date();
            const dateJS_messageDate_curr = dayjs(currDate);

            const library_DateDiff = dateJS_messageDate_curr.diff(dateJS_messageDate_m, 'days');
            
            if(DaysAgoObj[`${ library_DateDiff }`] === undefined) {
                //@ts-ignore
                DaysAgoObj[`${ library_DateDiff }`] = `${mess.message}${mess.date.seconds}`;
            }
            
        });
        
        let daysAgo: string[] = Object.keys(DaysAgoObj);
        return daysAgo;
    }

    function isNewSession(prevMessage: DunbarThreadItemModel, currentMessage: DunbarThreadItemModel): {hour: boolean, twentyFourHours: boolean} {
        const daysAgo: string[] = getDaysAgo(threadItems);
        let isNewSession : { hour: boolean, twentyFourHours: boolean } = { hour: false, twentyFourHours: false };
        let prevDate : any = prevMessage.messageTime
        let currDate : any = currentMessage.messageTime
        // @ts-ignore
        prevDate = prevDate.toDate();
        // @ts-ignore
        currDate = currDate.toDate();
        const prevMessageDate = new Date(prevDate);
        const currentDateTime = new Date(currDate);
        const dateJS_messageDate_prev = dayjs(prevMessageDate);
        const dateJS_messageDate_curr = dayjs(currentDateTime);
        const dateDiffernce = Math.floor(
            (
                (
                    (
                        currentDateTime.getTime() -  prevMessageDate.getTime()
                    ) / 1000
                ) / 60
            ) / 60
        );

        const library_DateDiff = dateJS_messageDate_curr.diff(dateJS_messageDate_prev, 'hour');
        //
        const todaysDate = new Date();
        const dateJS_todaysDate = dayjs(todaysDate);
        const library_daysAgoDiff = dateJS_messageDate_curr.diff(dateJS_todaysDate, "day");

        if ( (dateDiffernce >= 1) || (library_DateDiff >= 1) ) {
            isNewSession = { ...isNewSession, hour: true};
        }
        return isNewSession;
    }

    function getDate(threadItem: DunbarThreadItemModel): string {
        let prevDate : any = threadItem.messageTime
        // @ts-ignore
        prevDate = prevDate.toDate();
        const prevMessageDate = new Date(prevDate);
        let dateStr = dayjs(prevMessageDate).format('ddd, MMM D, YYYY h:mm A');
        return dateStr;
    }

    function clearAll() {
        setImageFile(_=> { return undefined; });
        setChatMode(_=> { return ChatMode.Default; });
        setMessage(_=> { return ""; });
    }

    async function sendMessage_Potentially_WithImage() {
        if (imageFile) {
            const storageRef = ref(storage, getImagePathRef());
            const compressImageFile = new Compressor(imageFile, 
                { 
                    quality: 0.15, 
                    success: async (compressedFile) => {
                        const uploadImage = await uploadBytes(storageRef, imageFile)
                        .then((snapshot) => {
                            getDownloadURL(snapshot.ref).then((url) => {
                                sendMessage([ url ]);
                              });
                        }).catch(err => {
                            console.log("Error Uploading Message Image: ", err);
                        })
                    } 
                });
        } else {
            sendMessage();
        }
    }

    function sendMessage(imageURLs?: string[], ats? : string[]) {
        const messageItem = getMessageObject(message, userData.userID, imageURLs, ats);
        AddANewMessage(userData.DunbarColonyID, messageItem, (sucess) => { clearAll(); }, threadType !== ChatThreadType.default ? true : false, selectedSubThreadID);
    }

    useEffect(()=> {
        const chatHistory = document.querySelector("#chat-scrollview");
        const chatContentView = document.querySelector("#chat-contentview");
        if (chatHistory && chatContentView) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }, [ dunbarThreadList ]);

    return (
        <div className="dunbar-chat-container">
            <div className="chat-content-and-control-container">
                <div className="chat-content-and-controls">
                    <ChatBox mode={ chatMode } setChatMode={ setChatMode } message={ message } setMessage={ setMessage } setImageFile={ setImageFile }/>
                    <SendAndMediaMode mode={ chatMode } setChatMode={ setChatMode } sendMessage={ sendMessage_Potentially_WithImage } message={ message } setMessage={ setMessage }/>
                </div>
            </div>

            <div className="chat-content-messeges-container">
                <div className="chat-container-scrollview" id="chat-scrollview">
                    <div className="chat-container-contentview" id="chat-contentview">
                        { dunbarThreadList.length > 0 ?
                            dunbarThreadList.map((message, index) => {
                                let isNewSessionObj : { hour: boolean, twentyFourHours: boolean } = { hour: false, twentyFourHours: false }; 
                                const prevMess = threadItems[index - 1];
                                if (prevMess) {
                                    isNewSessionObj = isNewSession(threadItems[index - 1], message);
                                }
                                return  (
                                    <>
                                        <div className="chat-time-session-container">
                                            {/* @ts-ignore */}
                                            { (
                                                (isNewSessionObj.hour === true) ||
                                                ( index === 0)
                                            ) && <label className="chat-session-time">{ getDate(message) }</label> }
                                        </div>
                                        <DunbarMessageItem message={ message } index={ index } listUserProfileImageUrls={ listUserProfileImageUrls } addANewProfileImageUrl={ addANewProfileImageUrl } />
                                        <Dunbar_Ad index={ index }/>
                                    </>
                                );
                            })
                            :
                            <p style={{ position: "absolute", margin: "60px 0 0 0", left: "50%", transform: "translateX(-50%)"}}>{`😕 No messages in ${ threadType !== ChatThreadType.default ? "this sub-thread" : "the colony"} yet`}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

interface DunbarMessageItemProps {
    message: DunbarThreadItemModel;
    index: number;
    listUserProfileImageUrls: React.MutableRefObject<{ userID: string; profileImageURL: string; }[]>
    addANewProfileImageUrl: (newItem: { userID: string , profileImageURL: string }) => void;
}
const DunbarMessageItem = ({ message, index, listUserProfileImageUrls, addANewProfileImageUrl }: DunbarMessageItemProps) => {
    const { userData, userProfileImageURL,} = useContext(UserContext);
    const { dunbarColonyObj, profileImageURLLookUpTable } = useContext(DunbarContext);
    const { toggleImageCloserLook } = useContext(ControllerContext);
    useEffect(()=>{ 
        getPostUserData();
        getCommentUserProfileImage();
    }, [])
    const [ ContentUser, setContentUser ] = useState< CurrentUserDataModel | undefined >(undefined);
    const [ imageSrc, setImageSrc ] = useState< string | undefined >(undefined);
    function getPostUserData() {
        const postUserDataList = dunbarColonyObj.colonyMembers.filter((obj) => {
            if (obj.userID ===  message.from) {
                return obj;
            }
        });
        
        if (postUserDataList.length > 0) {
            setContentUser(_=> { return postUserDataList[0]; });
        }
    }

    async function getCommentUserProfileImage() {
        const userIDFromLookUpTable: { lookUpIndex: number; userID: string; }[] = profileImageURLLookUpTable.filter((lookup) => { if (lookup.userID === message.from) { return lookup; } })
        const lookUpID : number | undefined = userIDFromLookUpTable.length ? userIDFromLookUpTable[0].lookUpIndex : undefined; 
        const userProfileImagePrepend = "dun_u_prof_im";
            const storageID = `${ userProfileImagePrepend }${ lookUpID }`;
            const storedURL = localStorage.getItem(storageID);
            if (message.from === userData.userID) {
                setImageSrc(userProfileImageURL)
            } else if (storedURL) {
                setImageSrc(storedURL);
            } else {
                const userProfileStorageRef = ref(storage, getProfileImageRef(message.from));
                getDownloadURL(userProfileStorageRef)
                .then((url) => {
                    localStorage.setItem(storageID, url);
                    setImageSrc(url);
                })
                .catch((error) => {
                    // No need for catch the gray circle will work fine for now.
                });
            }
    }

    function GetContentDate(threadItem: DunbarThreadItemModel): string {
		let dateString: string = "";
		let mDate : any = threadItem.messageTime;
		mDate = mDate.toDate();
		const mDateTime = new Date(mDate);
        dayjs.extend(relativeTime);
		dateString = dayjs(mDateTime).fromNow();

		return dateString;
	}

    return  (
        <div className="message-item-container">
            <div className='thread-post-by-container'>
                <div className='userProfile-img-content-container img-container'>
                    {(imageSrc && ContentUser) && <img loading={"lazy"} alt={ `${ ContentUser.firstName } ${ ContentUser.lastName } Profile Image` } src={ imageSrc } /> }
                    <div className='cover'></div>
                </div>
                <div className="profile-name-container">
                    { ContentUser && <label className='userProfile-name'>{ `${ ContentUser.firstName } ${ ContentUser.lastName }` }</label> }
                    { ContentUser && <label className='userProfile-nick-name'>{ `@${ ContentUser.customUserName }` }</label> }
                </div>
                <div className="date-of-addition">
                    <p>{ GetContentDate(message) }</p>
                </div>
                <MoreButton item={ message }/>
            </div>

            <div key={ index } className={`message-item`}>
                { (message.imageURLs.length) ? <img loading={"lazy"} className="message-item-image" src={ message.imageURLs[0] } onClick={() => {
                    toggleImageCloserLook(message.imageURLs[0], true);
                }}/> : <></> }
                <div className="message-container">
                    <p>{ message.message }</p>
                </div>
            </div>
        </div>
    );
}

interface MoreButtonProps { item: DunbarThreadItemModel }
const MoreButton = ({ item }: MoreButtonProps) => {
    const [ showMoreOptions, setShowMoreOptions ] = useState<boolean>(false);
    return (
        <button className="more-button" onClick={() => { setShowMoreOptions(b => { return !b; }); }}>
            <span className="dot"/><span className="dot"/><span className="dot"/>
            { showMoreOptions &&
                <>
                    <div className="more-button-pop-up">
                        <div className="more-button-comtent">
                            <button className="options" onClick={() => {
                            }}>Copyrights</button>
                            <button className="options red" onClick={() => {
                            }}>Report</button>
                        </div>
                    </div>
                </>
            }
        </button>
    )
}

export default DunbarChatContainer;

interface MessageControlsProps {
    mode : ChatMode;
    setChatMode? : React.Dispatch<React.SetStateAction<ChatMode>>;
    sendMessage? : () => void;
    message? : string;
    setMessage? : React.Dispatch<React.SetStateAction<string>>;
}

const SendAndMediaMode = ( { mode, setChatMode, sendMessage, message }: MessageControlsProps ) => {
    return (
        <div className="send-and-media-mode-container">
            <div className={`media-mode${ mode === ChatMode.MediaMode ? ' active' : ''}`}
                onClick={() => {
                    setChatMode(mode => {
                        return mode === ChatMode.MediaMode ? ChatMode.Default : ChatMode.MediaMode;
                    })
                }}
            >
                <img src={ mediamodeIcon }/>
                <label>Media Mode</label>
            </div>

            <div className="send-button" onClick={() => {
                sendMessage();
            }}>
                <div className="send-icon-container">
                    <img src={ sendIcon }/>
                    <div className="image-cover"/>
                </div>
                <label className="send-message">send</label>
            </div>

        </div>
    );
};

enum ChatMode {
    Default,
    MediaMode
}

interface ChatProps {
    mode : ChatMode;
    setChatMode?: React.Dispatch<React.SetStateAction<ChatMode>>
    message?: string;
    setMessage?: React.Dispatch<React.SetStateAction<string>>;
    setImageFile?: React.Dispatch<React.SetStateAction<File>>;
}

const ChatBox = ({ mode, setChatMode, message, setMessage, setImageFile, }: ChatProps) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

    function SelectMessageImage () {
        const input = document.querySelector('.chat-box-media-mode input#image-input-id.image-input');
        if (input) {
            // @ts-ignore
            input.click();
        }
    }

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files: File[] = Array.from(e.target.files)
        const file: File = files[0];
        const fileType = files[0].type;
        const src = URL.createObjectURL(files[0]);
        setImageFile(_=> { return file; });
        setImgSrc(src);
    }

    return (
        <div className="chat-box-container">
            { (mode === ChatMode.Default) && 
            <textarea className="chat-box"  placeholder="Write something..."
                value={ message }
                onChange={ e => {
                    setMessage(m => {
                        return e.target.value;
                    })
                }}
            />}
            { (mode === ChatMode.MediaMode) && 
                <div className="chat-box-media-mode">
                    <div className="image-select" onClick={() => { SelectMessageImage(); }}>
                        { imgSrc ? <img loading={"lazy"} className="media-mode-image-input" src={ imgSrc }/> : <></> }
                        <input className="image-input" id="image-input-id" type="file" onChange={ handleFileSelected } accept="image/x-png,image/jpeg"/>
                    </div>
                    <textarea className="chat-box-image-mode-textarea"  placeholder="Write something..."
                        value={ message }
                        onChange={ e => {
                            setMessage(m => {
                                return e.target.value;
                            })
                        }}
                    />
                </div> 
            }

        </div>
    );
}
