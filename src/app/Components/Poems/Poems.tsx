import React, { useState } from "react";
import { AuthFooter, AuthViewHeader } from "../../Pages/Auth/AuthView";
import ColorUI from "../ColorUI/ColorUI";

function Poem() {
    const [ scrolled , setScrolled ] = useState(true);
    const [ showJumpInSignUp, setShowJumpInSignUp] = useState<boolean>(false);
    return (
        <>
            <ColorUI/>
            <div className="poem" style={
                { 
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(255,255,255, 0.65)",
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    padding: "0",
                }
            }>
                <AuthViewHeader scrolled={ scrolled } setShowJumpInSignUp={ setShowJumpInSignUp }/>
                <div style={
                        { 
                            position: "relative",
                            width: "fit-content",
                            height: "fit-content",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: "100px",
                            minHeight: "100vh",
                        }
                }>
                    <Content/>
                    <div style={{
                    position: "relative",
                    width: "100vw",
                    height: "150px",
                    bottom: "0",
                    zIndex: "1",
                    }}>
                    <AuthFooter/>
                    </div>
                </div>
            </div>
        </>
    );
}


const Content = () => {
    return (
        <div style={
        { 
            position: "relative",
            width: "fit-content",
            maxWidth: "90%",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            marginBottom: "auto",
            padding: "0 20px",
            paddingBottom: "150px"
        }
        }>
            <div className="poem-content">
                <h1 style={{fontSize: "20px", color: "rgba(0,0,0,0.45)"}}>Our Favorite Poem</h1>
                <br/>
                <h1 style={{fontSize: "40px"}}>If—</h1>
                <br/>
                <h2 style={{fontSize: "28px", color: "rgba(0,0,0,0.75)"}} >By Rudyard Kipling</h2>
                <br/>
                <br/>
                <p style={{fontSize: "20px"}}>
                    If you can keep your head when all about you<br />
                    Are losing theirs and blaming it on you;<br />
                    If you can trust yourself when all men doubt you,<br />
                    But make allowance for their doubting too;<br />
                    If you can wait and not be tired by waiting,<br />
                    Or being lied about, don't deal in lies,<br />
                    Or being hated, don't give way to hating,<br />
                    And yet don't look too good, nor talk too wise:
                </p>
                <br/>
                <br/>
                <p style={{fontSize: "20px"}}>
                    If you can dream—and not make dreams your master;<br />
                    If you can think—and not make thoughts your aim;<br />
                    If you can meet with Triumph and Disaster<br />
                    And treat those two impostors just the same;<br />
                    If you can bear to hear the truth you've spoken<br />
                    Twisted by knaves to make a trap for fools,<br />
                    Or watch the things you gave your life to, broken,<br />
                    And stoop and build 'em up with worn-out tools:
                </p>
                <br/>
                <br/>
                <p style={{fontSize: "20px"}}>
                    If you can make one heap of all your winnings<br />
                    And risk it on one turn of pitch-and-toss,<br />
                    And lose, and start again at your beginnings<br />
                    And never breathe a word about your loss;<br />
                    If you can force your heart and nerve and sinew<br />
                    To serve your turn long after they are gone,<br />
                    And so hold on when there is nothing in you<br />
                    Except the Will which says to them: 'Hold on!'
                </p>
                <br/>
                <br/>
                <p style={{fontSize: "20px"}}>
                    If you can talk with crowds and keep your virtue,<br />
                    Or walk with Kings—nor lose the common touch,<br />
                    If neither foes nor loving friends can hurt you,<br />
                    If all men count with you, but none too much;<br />
                    If you can fill the unforgiving minute<br />
                    With sixty seconds' worth of distance run,<br />
                    Yours is the Earth and everything that's in it,<br />
                    And—which is more—you'll be a Man, my son.
                </p>
            </div>

    </div>
    );
}

export default Poem;