import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './Global.css'
import { PagePaths } from './app/Models/Models';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductView from './app/Pages/Product/ProductView';
import AuthView from './app/Pages/Auth/AuthView';
import FilterView from './app/Pages/FilterView/FilterView';
import NewUserView from './app/Pages/NewUserPage/NewUserPage';
import TestView from './app/Pages/TestView/TestView';
import LiveSessionMobile from './app/Components/LiveSession/LiveSessionView/LiveSessionMobile';
import { MobileConstitutionView } from './app/Components/ConstitutionView/ConstitutionView';
import EditProfileMobile from './app/Pages/Profile/EditProfileMobile/EditProfileMobile';
import DesiredFeaturesMobile from "./app/Components/DesiredFeaturesMobile/DesiredFeaturesMobile";
import Careers from './app/Components/Careers/page';
import DirectMessagesMobile from './app/Pages/Messages/DirectMessagesMobile';
import AuthView_Mobile from './app/Pages/Auth/AuthViewMobile';
import MobileMoviePlayer from './app/Components/ContentComponents/MobileVideo/MobileMoviePlayer';
import NewUserViewMobile from './app/Pages/NewUserPage/NewUserPageMobile';
import NewUserViewMobile_IOS from './app/Pages/NewUserPage/NewUserPageMobile_IOS';
import CommentSectionViewMobile from './app/Components/CommentSection/CommentSectionMobile';
import { MOBILE_StartDirectMessageController_MOBILE } from './app/Components/StartDirectMessageController/StartDirectMessageController';
import TermsOfService from './app/Components/TermsOfService/TermsOfService';
import About from './app/Components/About/About';
import PrivacyPolicy from './app/Components/PrivacyPolicy/PrivacyPolicy';
import DeleteAccountRequest from './app/Components/DeleteAccountRequest/DeleteAccountRequest';
import EulaAgreement from './app/Components/EULA_Agreement/EULA_Agreement';
import SharedPost from './app/Components/SharedPost/SharedPost';
import Distributed from './app/Pages/Distributed/page';
import Poem from './app/Components/Poems/Poems';
import NewUserViewMobile_IOS_forReview from './app/Pages/NewUserPage/NewUserPageMobile_ios_for_review_';

const router = createBrowserRouter([
	{
		path: PagePaths.Home,
		element:<ProductView/>,
	},
	{
		path: PagePaths.Authenticate,
		element: <AuthView/>,
	},
	{
		path: PagePaths.filterControls,
		element: <FilterView/>,
	},
	{
		path: PagePaths.newUser ,
		element: <NewUserView/>,
	},
	{
		path: PagePaths.Test ,
		element: <TestView/>,
	},
	{
		path: PagePaths.MobileLiveSessiion,
		element: <LiveSessionMobile/>
	},
	{
		path: PagePaths.careers,
		element: <Careers/>
	},
	{
		path: PagePaths.distributed,
		element: <Distributed/>
	},
	{
		path: PagePaths.shared,
		element: <SharedPost/>
	},
	{
		path: PagePaths.authMobile,
		element: <AuthView_Mobile/>
	},
	//
	{
		path: PagePaths.mobileConstitution,
		element: <MobileConstitutionView/>
	},
	{
		path: PagePaths.editProfile,
		element: <EditProfileMobile/>
	},
	{
		path: PagePaths.desiredFeatures,
		element: <DesiredFeaturesMobile/>
	},
	{
		path: PagePaths.mobileMessageThread,
		element: <DirectMessagesMobile/>
	},
	{
		path: PagePaths.mobileVideoPlayerMVP,
		element: <MobileMoviePlayer/>
	},
	{
		path: PagePaths.newUserMobile,
		element: <NewUserViewMobile/>
	},
	{
		path: PagePaths.newUserMobileIOS,
		element: <NewUserViewMobile_IOS/> // <NewUserViewMobile_IOS_forReview/>
	},
	{
		path: PagePaths.commentSectionViewMobile,
		element: <CommentSectionViewMobile/>
	},
	{
		path: PagePaths.startDirectMessageChain,
		element: <MOBILE_StartDirectMessageController_MOBILE/>
	},
	{
		path: PagePaths.termsOfService,
		element: <TermsOfService/>
	},
	{
		path: PagePaths.about,
		element: <About/>
	},
	{
		path: PagePaths.privacyPolicy,
		element: <PrivacyPolicy/>
	},
	{
		path: PagePaths.deleteAccountRequest,
		element: <DeleteAccountRequest/>
	},
	{
		path: PagePaths.eulaAgreement,
		element: <EulaAgreement/>
	},
	{
		path: PagePaths.poem,
		element: <Poem/>
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<>
		{/* @ts-ignore */}
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
		<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Comfortaa:wght@300;400;500;600;700&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap" rel="stylesheet"/>
		<link href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Delicious+Handrawn&family=Londrina+Sketch&display=swap" rel="stylesheet"></link>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
		<React.StrictMode>
			<RouterProvider router={router}/>
		</React.StrictMode>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

