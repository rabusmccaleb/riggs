import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import scroll from "../../../Resources/scroll.png";
import ControllerContext from "../../Contexts/ControllerContexts";
import "./ProductHeader.css"
import bell from "../../../Resources/bell.png";
import logo from "../../../Resources/AppIcon.png"
export interface ProductHeader_Type {
	appName: string;
	username?: string;
	userID?: string;
}

const ProductHeader = ({ appName }: ProductHeader_Type) => {
	const { showConstitution, setShowConstitutionView, showNotificationView, toggleNotificationView } = useContext(ControllerContext);
	const { userProfileImageURL, userData } = useContext(UserContext)
	return (
		<div className="header">
			{/* title and logo */}
			<div className='titolo-and-logo' onClick={ () => { window.location.reload(); } }>
				<div className='logo-container img-container'>
					<img src={ logo } />
					<div className='cover'></div>
				</div>
				<label>{ appName }</label>
			</div>
			<h6 style={{ marginLeft: "8px" }}>A great place on the internet for nerds.</h6>
			{/* Constution */}
			<div className="app-constitution-button" onClick={() => { setShowConstitutionView(!showConstitution); }}>
				<img src={ scroll }/>
				<div className="image-cover"/>
			</div>
			{/* Search Bar */}
			<div className='search'>
				{/* Will be it's own component to reduce re-rendering */}
				<div className='product-search-container'>
					<input 
						id="search-input" 
						type={"search"} 
						autoComplete="off" 
						autoCorrect="off" 
						autoCapitalize="off"
						spellCheck="false"
						placeholder="Search"
					/>
					<button id='search-button'>
						<span className="material-symbols-outlined">search</span>
					</button> 
				</div>
			</div>
			{/* Notifications */}
			<div className='profile-img-username-notifications' onClick={() => { toggleNotificationView(true); }}>
				<div className='userProfile-img-container img-container'>
					<img loading={"lazy"} className={``} alt="" src={ userProfileImageURL ? userProfileImageURL : "" } />
					<div className='cover'></div>
				</div>
				<label className='userproile-name'>{ `${ userData.firstName } ${ userData.lastName }` }</label>
				<div className='notifications'>
					<img src={ bell }/>
					<div className="image-cover"/>
				</div>
			</div>
		</div>
	)
}

export default ProductHeader;
