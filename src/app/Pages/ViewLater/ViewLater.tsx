import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import ViewItemView from "./ViewItemView";
import './ViewLater.css'

const ViewLater = () => {
    const { userData, userViewlaters } = useContext(UserContext);
    return (
        <div className="ViewLaterView">
            <div className="ViewLater-content-view">
                <div className="view-title">
                    <h1>View Later</h1>
                    <h4>A log of all the content you've added to your view later List</h4>
                </div>
                { userViewlaters.length > 0 ?
                        userViewlaters.map((vl, index) => {
                            return ( <ViewItemView post={ vl } index={ index } />)
                        })
                        :
                        <h2 style={ { marginTop: "20px" } }>🙁 Sorry, it looks like you don't have any view later items.</h2>
                }
            </div>
        </div>
    )
}

export default ViewLater;
