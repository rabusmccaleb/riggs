import React, { useState } from "react";
import CommunityItems from "./CommunityItems";
import ContentView from "./ContentView/ContentView";
import RightSideOptions from "./RightSideOptions/RightSideOptions";
import PostController from "../PostController/PostController";

const ProductMainConent = () => {
	const [ scrolled, setScrolled ] = useState(false);
	const [ callPostController, setCallPostController ] = useState(false);
	return (
		<>
			<div className='content'>
				<CommunityItems scrolled={ scrolled } withFilterButton={ true }/>
				<ContentView setScrolled={ setScrolled } isMobile={ false }/>
			</div>
			<RightSideOptions setCallPostController={ setCallPostController }/>
			<PostController showMe={ callPostController }  setCallPostController={ setCallPostController }/>
		</>
	);
}

export default ProductMainConent;

