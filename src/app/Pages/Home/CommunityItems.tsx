import { useState, useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import FilterViewButton from "../FilterView/FilterViewButton/FilterViewButton";

/// TO DO:  Hook Up To Call Recommend API Omce Community Is Selected. This is availble on native mobile but not web.

export interface CommunityProps {
	scrolled: boolean;
	withFilterButton? : boolean;
}

const CommunityItems = ({ scrolled, withFilterButton } : CommunityProps) => {
	const [ itemsScrolled, setItemsScrolled ] = useState(false);
	const { userData } = useContext(UserContext);
	const [ selectedCommunityItem, setSelectedCommunityItem ] = useState<string>("Default");
	// @ts-ignore
	function handleScroll (e) {
		if (e.currentTarget.scrollLeft >= 12) {
			setItemsScrolled(b => { return true; });
		} else {
			setItemsScrolled(b => { return false; });
		}
	};

	return (
	<>
		<div className='community-options hideScrollIndicator' style={{ 
				transition: '0.3s', 
				// @ts-ignore
				"-webkit-transition": "0.3s",
				top: scrolled ? '-60px' : '0px', 
				opacity: scrolled ? '0' : '1' 
			}}  onScroll={ handleScroll }>
			<div className='community-options-contentview'>
				<div 
					className={`community-item-option img-container${ (selectedCommunityItem.toLocaleLowerCase() === "default") ? " active" : ""}`} 
					onClick={() => {
						setSelectedCommunityItem(_ => { return "Default"; });
					}}
				>
					<label className='community-name'>Default</label>
				</div>
				{
				userData.TopicsOfInterest.map( comItem => {
					return (
						<div 
							className={`community-item-option img-container${ (selectedCommunityItem.toLocaleLowerCase() === comItem.toLocaleLowerCase()) ? " active" : ""}`} 
							onClick={() => {
								setSelectedCommunityItem(_ => { return comItem; });
							}}
						>
							<label className='community-name'>{ comItem }</label>
						</div>
					);
				})
				}
				<div className='community-item-option' style={{ width: "30px", height: "0", opacity: "0" }}/>
			</div>
		</div>
		{  (withFilterButton && !scrolled) && 
			<div className="community-options-filter-button-container">
				<FilterViewButton/>
			</div>
		} 
	</>
	);
}

export default CommunityItems;
