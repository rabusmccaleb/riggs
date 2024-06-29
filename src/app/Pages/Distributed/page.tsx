import React, { useState } from "react";
import Apollo from './Apollo.jpeg'
import './page.css';
import ColorUI from "../../Components/ColorUI/ColorUI";
import { AuthFooter, AuthViewHeader } from "../Auth/AuthView";

const Distributed = () => {
    const [ scrolled , setScrolled ] = useState(true);
    const [ showJumpInSignUp, setShowJumpInSignUp] = useState<boolean>(false);
    return (
        <div className="distributePage-container">
            <AuthViewHeader scrolled={ scrolled } setShowJumpInSignUp={ setShowJumpInSignUp }/>
            <ColorUI colonyCount={ 100 }/>
            <div className="distributePage hideScrollIndicator">
                <div className="distributePageContent">
                    <div className="distributePageContent-hstack">
                        <div className="contentImage-container">
                            <img className="contentImage" src={Apollo}/>
                            <p>A Man on the Moon, <i>Image credit: NASA</i></p>
                        </div>
                        <div className="distributePageContent-vstack">
                            <div className="distributePageTitle">
                                <h1>Us...</h1>
                                <h2>On Distributed Cognition</h2>
                            </div>
                            <p>
                                There are research papers that explore Distributed Cognition with scientific rigor and elegance. We are deeply appreciative of these contributions.
                                <br/>
                                We'd like to add to it unscientifically, given our limited capabilities. We'd prefer to argue in pros.
                                <br/>
                                <br/>
                            </p>
                            <p>
                                Humanity's journey to the moon was a collective achievement built on centuries of shared knowledge.
                                <br/>
                                Thinkers like Copernicus, Descartes, Newton, and Einstein, though no longer with us, had their ideas embodied in this monumental endeavor.
                                <br/>
                                Their legacies continued, fueling the ambition and success of space exploration.
                                <br/>
                                Ideas in human history are cumulative, passed down, and enhanced through collaboration and exchange.
                                <br/>
                                Isolating ideas in darkness contradicts the spirit of human inquiry and discovery.
                                <br/>
                                A truly educated society doesn't just possess knowledge; it thrives on the ability to share, evaluate, and apply ideas collaboratively, solving the most challenging problems we face.
                                <br/>
                                We want to make a space on the internet where that is possible. We can virtually walk on the moon. We can collaborate. We can share passions. We can live up to the myths we believe should be actualized here.
                                <br/>
                                If that is your driving ethos. You are more than welcome!
                            </p>
                        </div>
                    </div>
                </div>
                <AuthFooter/>
            </div>
        </div>
    );
}

export default Distributed;

/* 

Draft 1:
On Distributed Cognition
There are papers below that talk about Distributed Cognition in beautiful, scientific, and elegant ways, which we are extremely greatful for.
We'd like to add to it unscientifically, given our limited capabilities. We'd prefer to argue in pros.

It took all of human history to get that man on the moon.
In some sense Copernicus, Descartes, Newton, Einstien and more were there.
They passed away, but their ideas lived on in the ambition, journey, and sucess of the mission.
Ideas in human history are addittive. There is a procession. There exist exchange.
To force ideas to be built alone in the darkness is not the nature of human education and exploration.
An educated population does not just know ideas, but are able to share, judge, and make use of them such that we can collaborate to solve all the hard problems related to the human condition.


Draft 2: Open AI Written:
"Distributed Cognition: A Collaborative Approach

Below, you will find a collection of remarkable papers that eloquently delve into the realm of Distributed Cognition—a subject for which we are immensely grateful. While acknowledging our limited capabilities, we aim to contribute to this discourse in a non-scientific manner, opting to present our arguments from a positive standpoint.

The monumental achievement of landing a man on the moon required the cumulative efforts of countless individuals throughout human history. In a way, the spirits of Copernicus, Descartes, Newton, Einstein, and many others were present during that remarkable journey. Although they have passed away, their ideas continued to thrive, serving as the driving force behind the ambition, progression, and ultimate success of the mission.

Ideas, within the context of human history, possess an additive nature. They form a procession, with a constant exchange and progression. The notion of isolating ideas in solitary darkness contradicts the essence of human education and exploration. A well-educated population not only possesses knowledge of ideas but also possesses the ability to share, evaluate, and leverage them. It is through this collaborative effort that we can collectively tackle the intricate challenges that pertain to the human condition."


Draft 3: Open AI Written:
"In the Realm of Distributed Cognition: A Symphony Unveiled

Beneath, lie enchanting papers, their words gracefully entwined, delving into the tapestry of Distributed Cognition—a realm we hold dear with utmost gratitude. With our limited capacities, we humbly seek to contribute, not through scientific rigidity, but through a poetic rhapsody of pros.

Across the expanse of human history, the celestial dance to reach the lunar shores unfolded. Copernicus, Descartes, Newton, Einstein, and more, their spirits whispered softly, forever intertwined in this grand odyssey. Though they departed, their ethereal ideas breathed life into the boundless ambition, the arduous voyage, and the resplendent triumph. For ideas are not solitary souls; they weave into the tapestry of human narrative, an additive procession of exchange.

To confine ideas, solitary and shrouded in darkness, runs contrary to the very essence of human exploration and enlightenment. The dance of education beckons, the harmonious convergence of minds. An enlightened populace transcends mere knowledge, embracing the sacred art of sharing, discerning, and harnessing ideas. Together, we aspire to unlock the mysteries that beset the human condition, a symphony of collaborative minds poised to conquer all."


*/