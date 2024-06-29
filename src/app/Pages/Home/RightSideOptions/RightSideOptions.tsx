import React, { useState, useEffect, useContext } from "react";
import ColorUI from "../../../Components/ColorUI/ColorUI";
import ControllerContext from "../../../Contexts/ControllerContexts";
import { ApplicationName } from "../../../Models/Models";
import './RightSideOptions.css'

export interface RightSideOptionsProps { setCallPostController: React.Dispatch<React.SetStateAction<boolean>> }

const RightSideOptions = ({ setCallPostController }: RightSideOptionsProps ) => {
	return (
        <div className='other-options hideScrollIndicator'>
			<div className="other-options-content-view">
				<PostContentButtonOption setCallPostController={ setCallPostController }/>
				<LiveChatSession/>
				<GamesCard/>
				<InstructionBounty/>
			</div>
        </div>
    );
};

export default RightSideOptions

const styleObject: React.CSSProperties = {
	position: "absolute",
	bottom: "34px",
	right: "-28px",
	padding: "2px 28px",
	backgroundColor: "var(--app-yellow-80)",
	background: "linearGradient(-90deg, rgba(0,0,0, 0.0), rgba(0,0,0, 0.15) )",
	transform: "rotate(-45deg)",
	fontSize: "12px",
	zIndex: "10000",
}

const InstructionBounty = () => {
	const cardTitle = "💰 Instruction Bounty";
	const desciption = `Get Paid or Ask a question you've always wanted the answer to from the braud ${ ApplicationName } Community`;
	return (
		<div className='live-chat-session-container'>
			<div className="live-chat-card-container" onClick={() => { }}>
				<div className="background-container"><ColorUI/></div>

				<div className="live-chat-content">
					<div className="card-content">
						<h2 className="live-chat-title">{ cardTitle }</h2>
						<h6 className="live-chat-desciption">{ desciption }</h6>
					</div>
				</div>
				<div style={ styleObject }>⏰ coming soon!</div>
			</div>
		</div>
	);
}

const LiveChatSession = () => {
	const { toggleLiveSessionView } = useContext(ControllerContext);
	const cardTitle = "💬 Live Chat Session";
	const desciption = "Jump into a live chat with bright people from around the world.";
	return (
		<div className='live-chat-session-container'>
			<div className="live-chat-card-container" onClick={() => { toggleLiveSessionView(true); }}>
				<div className="background-container"><ColorUI/></div>
				<div className="live-chat-content">
					<div className="card-content">
						<h2 className="live-chat-title">{ cardTitle }</h2>
						<h6 className="live-chat-desciption">{ desciption }</h6>
					</div>
				</div>
			</div>
		</div>
	);
}

const GamesCard = () => {
	const cardTitle = "🎮 GAMES";
	const desciption = `Jump into a session for "World Builder", Model UN, Chess, Dungeons And Dragons, and more`;
	return (
		<div className='live-chat-session-container'>
			<div className="live-chat-card-container" onClick={() => {}}>
				<div className="background-container"><ColorUI/></div>
				<div className="live-chat-content">
					<div className="card-content">
						<h2 className="live-chat-title">{ cardTitle }</h2>
						<h6 className="live-chat-desciption">{ desciption }</h6>
					</div>
				</div>
				<div style={ styleObject }>⏰ coming soon!</div>
			</div>
		</div>
	);
}

const PostContentButtonOption = ({ setCallPostController }: RightSideOptionsProps ) => {
	const postText = "post";
	return (
		<div className='post-content-option-container' onClick={() => { setCallPostController(b => { return !b; }); }}>
			<div className='post-content-option'>
				<label className="post-content-icon">+</label>
				<label>{ postText }</label>
			</div>
		</div>
	);
};