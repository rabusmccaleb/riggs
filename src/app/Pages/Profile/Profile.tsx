import { useState, useEffect, useContext } from "react";
import './Profile.css';
import { ContentModel } from "../../fb/dbMethods";
import UserContext from "../../Contexts/UserContext";
import "../../Pages/Product/ProductView.css";
import { 
    ContentViewOptions, 
    StateOfProject, 
    CurrentProjectItems,
 } from "../../Models/Models";
import ControllerContext from "../../Contexts/ControllerContexts";
import { PostItem } from "./PostItem";

const Profile = () => {
    const {  toggleShowEditProfileView } = useContext(ControllerContext);
    const { userData, userProfileImageURL, userLandingImageURL } = useContext(UserContext);
    const { toggleImageCloserLook } = useContext(ControllerContext)
    const [ contentViewOptions, setContentViewOptions ] = useState<ContentViewOptions>( ContentViewOptions.Posts );
    const visitingMyOwnProfile: boolean = true;
    const [ DraftItems, setDraftItems ] = useState<ContentModel[]>([]);

    function getProjectState(state: StateOfProject):string {
        let retString: string = "";
        switch (state) {
            case StateOfProject.done:
                retString = "Done"
                break;
            case StateOfProject.mostlyDone:
                retString = "Mostly Done"
                break;
            case StateOfProject.inprogress:
                retString = "In Progress"
                break;
            case StateOfProject.mostlyDoneOnHold:
                retString = "Mostly Done But On Hold"
                break;
            case StateOfProject.onHold:
                retString = "On Hold"
                break;
            case StateOfProject.notTouchingAgain:
                    retString = "Not Touching Again"
                break;
        }

        return retString;
    }

    return (
        <div className="Profile-View">
            <div className="profile-view-content-container">
                <div className="top-view-container">
                    <div className="profile-landing-image">
                        <img loading={"lazy"} className={ `landing-image` } src={ 
                            userLandingImageURL ? userLandingImageURL : "" 
                            } onClick={() => { 
                                toggleImageCloserLook(userLandingImageURL ? userLandingImageURL : "", true);
                            }}/>
                    </div>
                    <div className="profile-image-user-profile-container-follow">
                        <div className="profile-image-container">
                            <img loading={"lazy"} className={ `profile-image` } src={ userProfileImageURL ? userProfileImageURL : "" } 
                            onClick={() => {
                                toggleImageCloserLook(userProfileImageURL ? userProfileImageURL : "", true);
                            }}    
                            />
                        </div>
                        <div className="username-container">
                            <h1 className="username">{`${ userData.firstName } ${ userData.lastName }` }</h1>
                            <h5 className="nickname">{`@${ userData.customUserName }` }</h5>
                        </div>
                        <div className="follower-following-container">
                            <div className="following-container">
                                <div className="title">following</div>
                                <div className="count">
                                    <p>{ userData.followingCount }</p>
                                </div>
                            </div>
                            <div className="follower-container">
                                <div className="title">followers</div>
                                <div className="count">
                                    <p>{ userData.followerCount }</p>
                                </div>
                            </div>
                        </div>
                        <div className="follow-and-edit-button-container">
                            { !visitingMyOwnProfile && 
                                <div className="profile-action-buttons follow-container">
                                    <button>follow</button>
                                </div>                    
                            }
                            { visitingMyOwnProfile && 
                                <div 
                                    className="profile-action-buttons edit-container" 
                                    onClick={() => {
                                        toggleShowEditProfileView(true);
                                    }}
                                >
                                    <button><label><span className="material-symbols-outlined">edit</span> edit</label></button>
                                </div> 
                            }
                        </div>

                    </div>
                    <div className="bio-container">
                        <p className="bio">{ (userData.bio.trim().length > 0) ? userData.bio : "No Bio (In order to add a Bio click the edit button in the below the header image)" }</p>
                    </div>

                    <div className="professional-and-project-history-container-scrollview hideScrollIndicator">
                        <div className="professional-and-project-history-container-content-view">
                            { userData.projectExpience.length > 0 ?
                                userData.projectExpience.map((expItem, index) => {
                                    return (
                                        <div className="project-and-experience-item">
                                            <h3 className="project-name">{ expItem.projectName }</h3>
                                            <h4 className="eighty-characters">{ expItem.ideaInEightyCharacters }</h4>
                                            <h5 className="summary">{ expItem.summaryOfIdea }</h5>
                                            <h6 className="state">{ getProjectState(expItem.stateOfProject) }</h6>
                                            <a className="link-refs" href={ expItem.websiteOrLink } target="_blank" >link</a>
                                        </div>
                                    )
                                })
                                :
                                <h5>No Project History (In order to add projects you would like others to see, click the edit button in the below the header image)</h5>
                            }
                        </div>
                    </div>

                    <div className="bottom-view-selection-items">
                        <div 
                            className={`content-select-items${ contentViewOptions === ContentViewOptions.Posts ? " active": ""} ` }
                            onClick={_=> { setContentViewOptions(ContentViewOptions.Posts);}}
                        >
                            <p>Posts</p>
                        </div>
                        <div 
                            className={`content-select-items${ contentViewOptions === ContentViewOptions.Drafts ? " active": ""} ` }
                            onClick={_=> { setContentViewOptions(ContentViewOptions.Drafts);}}
                        >
                            <p>Drafts</p>
                        </div>
                        <div 
                            className={`content-select-items${ contentViewOptions === ContentViewOptions.ContentColony ? " active": ""} ` }
                            onClick={_=> { setContentViewOptions(ContentViewOptions.ContentColony);}}
                        >
                            <p>Content Colony</p>
                        </div>
                        <div 
                            className={`content-select-items${ contentViewOptions === ContentViewOptions.Interactions ? " active": ""} ` }
                            onClick={_=> { setContentViewOptions(ContentViewOptions.Interactions);}}
                        >
                            <p>Interactions</p>
                        </div>
                    </div>
                </div>
                <div className="bottom-view-container">
                    { contentViewOptions === ContentViewOptions.Posts && 
                        <div className="user-posts">
                            { userData.posts.length ?
                                userData.posts.map((item, index) => {
                                    return (
                                        <>
                                            <PostItem index={ index } postID={ item.postID }/>
                                        </>
                                    )
                                })
                                :
                                <div className="profile-no-items">
                                    <p>🙁 You don't have any posts</p>
                                </div>
                            }
                        </div>
                    }
                    { contentViewOptions === ContentViewOptions.Drafts  && 
                        <div className="user-drafts">
                            <div className="content-item">
                                { DraftItems.length ?
                                    DraftItems.map(items => {
                                        return <></>
                                    })
                                    :
                                    <div className="profile-no-items">
                                        <p>🙁 You don't have any drafts</p>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    { contentViewOptions === ContentViewOptions.ContentColony  && 
                        <div className="content-colony">
                            <div className="profile-no-items">
                                <p>🙁 You don't have any content colonies</p>
                            </div> 
                        </div>
                    }
                    { contentViewOptions === ContentViewOptions.Interactions  && 
                        <div className="content-colony">
                            <div className="profile-no-items">
                                <p>🙁 You don't have any interactions</p>
                            </div> 
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}


export default Profile;

interface ProjectProgressModel {
    currentProjects : CurrentProjectItems[];
}

const ProjectProgress = ({ currentProjects }: ProjectProgressModel) => {
    const [ projectIndex, setProjectIndex ] = useState< number >(0);
    const [ project, setProject ] = useState< CurrentProjectItems | undefined >(currentProjects[ 0 ]);
    const [ progress, setProgress ] = useState<number>( project ? ((project.checkPoints.filter(e => e.completed === true).length / project.checkPoints.length) * 100) : 0);

    function updateProject( position : number ) {
        if (currentProjects[position]) {
            setProjectIndex(_=> { return position});
        }
    }
    
    useEffect(() => {
        setProject(_=>{ return currentProjects[ projectIndex ]; });
        setProgress(_=> { 
            const val = currentProjects[ projectIndex ] ? ((currentProjects[ projectIndex ].checkPoints.filter(e => e.completed === true).length / currentProjects[ projectIndex ].checkPoints.length) * 100) : 0;
            return val;
        });
    }, [ projectIndex ]);

    return (
        <>
            {
                (project && project.checkPoints.length) && 
                <div className="project-progress">
                    <div className="profile-project-progress-content-view">
                        {/* Title Container */}
                        <div className="project-progress-title-container">
                            <h3>Project Progress</h3>
                        </div>
                        {/* Project Select */}
                        <div className="project-select"></div>

                        <div className="project-details">
                            <h3 className="project-name">{ project.projectTitle }</h3>
                            <h4 className="eighty-characters">{ project.projectInEightyCharacters }</h4>
                            <h5 className="description">{ project.projectDescription }</h5>
                        </div>
                        {/* Progress & Checkpoints */}
                        <div className="project-progress-ui">
                            <div className="project-progress-bar">
                                <div className="progress" style={{ height: `${ progress }%`}}/>
                            </div>
                            <div className="project-progress-check-points">
                                {
                                    // @ts-ignore
                                    project.checkPoints.sort((a,b) => a.completed - b.completed).map((checkPointItem, index) => {
                                        return (
                                            <div className="check-point-items" key={ index }>
                                                <div className={`check-point-ui${ checkPointItem.completed ? " complete" : ""}`}/>
                                                <div className="check-point-ui-text">
                                                    <h5>{ checkPointItem.checkPointTitle }</h5>
                                                    <p>{ checkPointItem.checkPointDescription }</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
