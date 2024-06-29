import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import './VideoHistory.css'

const VideoHistory = () => {
    const { userData, userVideoHistory } = useContext(UserContext);
    return (
        <div className="ViewLaterView">
            <div className="ViewLater-content-view">
                <div className="view-title">
                    <h1>Video History</h1>
                    <h4>A log of all the videos you have watched</h4>
                </div>
                {/* { userVideoHistory.length > 0 ?
                        userVideoHistory.map((vl, index) => {
                            return ( <VideoHistoryItemView post={ vl } index={ index } />)
                        })
                        : */}
                        <h2 style={ { marginTop: "20px" } }>🙁 Sorry, it looks like you don't have any items in your video history.</h2>
                {/* } */}
            </div>
        </div>
    )
}

export default VideoHistory;