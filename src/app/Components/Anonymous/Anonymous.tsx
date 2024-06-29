import React, { useState, useEffect, useContext } from "react";
import { ResponseTypesList } from "../../Pages/Home/ContentView/ContentView";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import ColorUI from "../ColorUI/ColorUI";
import "./Anonymous.css";
import ControllerContext from "../../Contexts/ControllerContexts";
import { AnonymousPostModel, _GetAnonymousContent } from "./AnonymousPostController/AnonymousPost_cotrol";
dayjs.extend(relativeTime);
const AnonymousPosts = () => {
    const [ _posts, set_posts ] = useState<AnonymousPostModel[]>( [] );
    const [ returnNoItems, setReturnNoItems ] = useState<Boolean>(false);

    useEffect(() => {
        _GetAnonymousContent(items => {
            if (items) {
                set_posts(_=> { return items; })
            } else {
                setReturnNoItems(true)
            }
        })
    }, [])

    return (
        <div className="anonymous-posts hideScrollIndicator">
            <div className="anonymous-content-view">
                    <div className="view-title">
                        <label>A</label>
                        <label>N</label>
                        <label>O</label>
                        <label>N</label>
                        <label>Y</label>
                        <label>M</label>
                        <label>O</label>
                        <label>U</label>
                        <label>S</label> 
                    </div>
                    <AddAnanymousPostButton/>
                    {
                        _posts.map( (post, index) => {
                            return <AnonymousPostCard post={ post } index={index}/>
                        })
                    }

                    { returnNoItems &&
                        <div style={{ position: "relative", height: "fit-content", width: "fit-content", margin: "auto 24px auto 24px", color: "white" }}>
                            <h3>😕 Sorry it looks like there aren't any new anonymous posts.</h3>
                        </div>
                    }
            </div>
        </div>
    )
}

const AddAnanymousPostButton = () => {
    const { toggleShowAnonymousPostController } = useContext(ControllerContext);
    return (
        <button className="add-anonymous-post-button" onClick={() => { toggleShowAnonymousPostController(true); }}>
            <div className="add-anonymous-post-container">
                <h1 className="add-icon">+</h1>
                <h1>Add One</h1>
            </div>
        </button>
    )
}

export default AnonymousPosts;

export interface AnonymousCardProps {
    index: number;
    post: AnonymousPostModel;
} 
const AnonymousPostCard = ({ index, post }: AnonymousCardProps) => {
    let relativeDate = dayjs(`${ post.date_of_post }`).fromNow();
    return (
        <div className="ananomous-post-card" key={ index }>
            <div className="background-container">
                <div className="background-image-container">
                    { post.backgroundImageURL && <img loading={"lazy"} src={ post.backgroundImageURL }/> }
                    <div className="image-cover"/>
                </div>
            </div>

        <div className="content-container hideScrollIndicator">
            <div className="content-view">
                <div className="date-container">
                    <label>{ relativeDate }</label>
                    <button style={{ 
                        position: "relative", 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        background: "rgba(255, 255, 255, 0.3)", 
                        margin: "0 0 0 8px", 
                        border: "none", 
                        color: "white", 
                        borderRadius: "4px" 
                    }}>
                        <label style={{ position: "relative", height: "fit-content", width: "fit-content" }}>...</label>
                    </button>
                </div>
                <div className="title-container">
                    <h3>{ post.title }</h3>
                </div>
                <div className="text-content-container">
                    <p>{ post.content }</p>
                </div>
                <div className="anonymous-response-container">
                    <div className="response-options">
                        { 
                            ResponseTypesList.map((item, index) => {
                                return (
                                    <span className="emoji-response-item">
                                        <label>{ item.repsonseIcon }</label>
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}