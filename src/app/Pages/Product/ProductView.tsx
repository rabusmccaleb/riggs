import { useState, useEffect, useContext } from 'react';
import { auth } from '../../fb/fbSetup';
import UserContext, { UserContextProvider } from '../../Contexts/UserContext';
import './ProductView.css';
import ProductHeader from '../../Components/ProductHeader/ProductHeader';
import SideMenuContainer, { SideMenuOptions } from './SideMenu/SideMenu';
import BackgroundUI, { BackgroundTypes } from '../../Components/BackgroundUI/BackgroundUI';
import TestView from '../TestView/TestView';
import ProductMainConent from '../Home/Home';
import DirectMessages from '../Messages/DirectMessages';
import Profile from '../Profile/Profile';
import '../../Components/TextTransformers/MathModeStyles.css'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ApplicationName } from '../../Models/Models';
import { ControllerContextProvider } from '../../Contexts/ControllerContexts';
import CommentSectionView from '../../Components/CommentSection/CommentSection';
import FavoritesView from '../FavoritesView/FavoritesView';
import DunbarColony from '../DunbarColony/DunbarColony';
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage';
import ViewLater from '../ViewLater/ViewLater';
import ConstitutionView, { ImageCloserLook } from '../../Components/ConstitutionView/ConstitutionView';
import AnonymousPostController from '../../Components/Anonymous/AnonymousPostController/AnonymousPostController';
import EditProfile from '../Profile/EditProfile/EditProfile';
import LiveSessionView from '../../Components/LiveSession/LiveSessionView/SimpleLiveSession';
import Theater from '../../Components/Theater/Theater';
import NotificationView from '../../Components/NotificationView/Notification';
import DesiredFeatures from '../../Components/DesiredFeatures/DesiredFeatures';
import StartDirectMessageController from '../../Components/StartDirectMessageController/StartDirectMessageController';
import VideoHistory from '../VideoHistory/VideoHistory';

function ProductView() {
	const [ userID, setUserID ] = useState<string | undefined>(undefined);
	useEffect(function(){
        onAuthStateChanged(auth, (user) => {
            if (user && user.uid && user.uid !== "undefined") {
				console.log(`ProductView -> user.uid: ${user.uid}`);
				setUserID(user.uid);
			} else {
				signOut(auth)
				.then(val => {
					window.location.href = "/auth"
				})
				.catch(err => {
					window.location.href = "/auth"
				})
			}
        });
	}, []);

	enum DeviceType {
		Mobile,
		Tablet,
		Desktop,
		Unknown,
	}
	  
	  function detectDeviceType(): DeviceType {
		const screenWidth = window.innerWidth;
		const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		const userAgent = navigator.userAgent.toLowerCase();

		if ((screenWidth < 768 && isTouchDevice) || /iphone|android|webos|blackberry|bb10|iemobile|opera mini/i.test(userAgent)) {
		  return DeviceType.Mobile;
		} else if (screenWidth < 1024 || /ipad|tablet|kindle|playbook|silk/i.test(userAgent)) {
		  return DeviceType.Tablet;
		} else {
		  return DeviceType.Desktop;
		}
	}
	  
	return (
		<>
			{ userID &&
				<UserContextProvider>
					<div className='product-with-color-ui'>
						<BackgroundUI type={ BackgroundTypes.ColorUI } color={ undefined } imageUrl={ undefined }/>
						{ detectDeviceType() === DeviceType.Desktop ?
							<ProductItems/>
							:
							<h1 
								className='mvp-web-value'
								style={{
									position:"absolute",
									top: "50%", left: "50%",
									height: "fit-content",
									width: "calc(100% - 80px)",
									zIndex: "10000000000000000",
									color: "var(--app-blue)",
									fontFamily: `'Cabin Sketch'`,
									textAlign: "center",
									transform: "translate(-50%, -50%)",
									fontSize: "34px", 
									fontWeight: "600",
									background: "rgba(255,255,255, 0.15)",
									padding: "40px 20px",
									borderRadius: "20px",
									border: "0px solid rgba(0,0,0,0.05)",
									backdropFilter: "blur(10px)",
									boxShadow: "rgba(0, 0, 0, 0.025) 0px 48px 100px 0px"
								}}
							>{ ApplicationName } <br/> <span style={{ color: "var(--app-green)"}}>Web-Beta</span> <br/> Currently Must <br/>Be Viewed <br/>On Desktop.</h1>
						}
					</div>
				</UserContextProvider>
			}
		</>
	);
}

export default ProductView;


const ProductItems = () => {
	const { userData, init } = useContext(UserContext);
	const [ selectedItem , setSelectedItem ]  = useState<SideMenuOptions>(SideMenuOptions.Home);
	const [ showSettings, setShowSetting ] = useState(false);
	useEffect(() => {
		if (auth.currentUser && auth.currentUser.uid) { init(auth.currentUser.uid); } else { signOut(auth); }
	}, [])
	return (
		<>
			{ userData &&
				<ControllerContextProvider>
					<>
						<div className="product">
							<ProductHeader appName={ ApplicationName }/>
							<div className="content-view">
								<SideMenuContainer selectedItem={ selectedItem } setSelectedItem={ setSelectedItem } setShowSetting={ setShowSetting }/>
								{ (selectedItem === SideMenuOptions.Home) && <ProductMainConent/> }
								{ (selectedItem === SideMenuOptions.DunbarColony) && <DunbarColony/>}
								{ (selectedItem === SideMenuOptions.Messages) && <DirectMessages/> } 
								{ (selectedItem === SideMenuOptions.Profile) && <Profile/> }
								{ (selectedItem === SideMenuOptions.History) && <VideoHistory/>}
								{ (selectedItem === SideMenuOptions.ViewLater) && <ViewLater/>}
								{ (selectedItem === SideMenuOptions.Favorites) && <FavoritesView/> }
								{ (selectedItem === SideMenuOptions.BecomeMemberOfNewCommunity) && <TestView/> }
							</div>
						</div>
						<CommentSectionView/>
						<ErrorMessage/>
						<ConstitutionView/>
						<ImageCloserLook/>
						<AnonymousPostController/>
						<EditProfile/>
						<LiveSessionView/>
						<Theater/>
						<NotificationView/>
						<DesiredFeatures/>
						<StartDirectMessageController/>
					</>
				</ControllerContextProvider>
			}
		</>
	)
}