import React, { useState, useEffect, useContext } from "react";
import './SideMenu.css'
import { auth } from "../../../fb/fbSetup";
import { signOut } from "firebase/auth";
// Side Menu Icons
import Home_icon from '../../../../Resources/SideMenuIcons/home.png';
import Message_icon from '../../../../Resources/SideMenuIcons/message.png';
import DunbarColony_icon from '../../../../Resources/SideMenuIcons/colony.png';
import Profile_icon from '../../../../Resources/SideMenuIcons/user.png';
import History_icon from '../../../../Resources/SideMenuIcons/history.png';
import ViewLater_icon from '../../../../Resources/SideMenuIcons/viewlater.png';
import Favorites_icon from '../../../../Resources/SideMenuIcons/favorites.png';
import ControllerContext from "../../../Contexts/ControllerContexts";

interface SideMenuProps {
	selectedItem : SideMenuOptions;
	setSelectedItem: (value: React.SetStateAction<SideMenuOptions>) => void;
	setShowSetting: React.Dispatch<React.SetStateAction<boolean>>
}
const SideMenuContainer = ({ selectedItem, setSelectedItem, setShowSetting }: SideMenuProps) => {
	return (
		<div className='side-menu'>
			<SideMenu selectedItem={ selectedItem } setSelectedItem={ setSelectedItem } setShowSetting={ setShowSetting }/>
		</div>
	);
}

export default SideMenuContainer;

interface Props {
    selectedItem : SideMenuOptions;
    setSelectedItem: (value: React.SetStateAction<SideMenuOptions>) => void;
    setShowSetting: React.Dispatch<React.SetStateAction<boolean>>
}

enum SideMenuOptions {
    BecomeMemberOfNewCommunity = "BecomeMemberOfNewCommunity",
    Home = "Home",
    Messages = "Messages",
    DunbarColony = "DunbarColony",
    Profile = "Profile",
    History = "VideoHistory",
    Favorites = "Favorites",
    ViewLater = "ViewLater",
    Settings = "Settings",
    Report = "Report",
    DesireFeatures = "DesireFeatures",
}

export { SideMenuOptions };
const SideMenu = ({ 
    selectedItem, setSelectedItem, setShowSetting
}: Props ) => {
    const reportingAndSafteyTitle = "Reporting / Safety";
    const desiredFeaturesTitle = "Desired Features";
    const { toggleDesiredFeaturesView } = useContext(ControllerContext);
    const sideMenuItems = [
        { label: "Home", icon: Home_icon, option: SideMenuOptions.Home },
        { label : "Dunbar Colony", icon : DunbarColony_icon, option: SideMenuOptions.DunbarColony },
        { label: "Messages", icon: Message_icon, option: SideMenuOptions.Messages },
        { label: "Profile", icon: Profile_icon, option: SideMenuOptions.Profile },
        { label: "Video History", icon: History_icon, option: SideMenuOptions.History },
        { label: "View Later", icon: ViewLater_icon, option: SideMenuOptions.ViewLater },
        { label: "Favorites", icon: Favorites_icon, option: SideMenuOptions.Favorites }
    ];
    return (
        <div className="dashbord-side-menu-item-container">
            <ul className="dashboard-side-menu-list-conatainer">
                    <li className={`join-another-community`}  onClick={() => { window.location.href = "#"}}>
                        <div className="label-conatainer">
                            <label>{ "Add Another Community" }</label>
                        </div>                        
                    </li>
                { 
                    sideMenuItems.map( SideMenuItem => {
                        return (
                            <li className={`dashboard-side-menu-item view-item ${ selectedItem == SideMenuItem.option ? ' active': ''}`}
                                onClick={() => {
                                    setSelectedItem(item => { return SideMenuItem.option; })
                                }}
                            >
                                <div className="icon-container">
                                    <img loading={"lazy"} alt="A House Icon" src={ SideMenuItem.icon }/>
                                    <div className="image-cover"/>
                                </div>
                                <div className="label-conatainer">
                                    <label>{ SideMenuItem.label }</label>
                                </div>
                            </li>
                        )
                    })
                }
                <li className="dashboard-side-menu-item defered-items first"  onClick={() => { 
                    setShowSetting(b => {
                        return !b;
                    })
                }} >
                    <div className="label-conatainer">
                        <label>Settings</label>
                    </div>
                </li>
                <li className="dashboard-side-menu-item defered-items d-features"  onClick={() => { toggleDesiredFeaturesView(true); }} >
                    <div className="label-conatainer">
                        <label style={{ color: 'black' }}>{ desiredFeaturesTitle }</label>
                    </div>
                </li>                
                <li className="dashboard-side-menu-item defered-items" onClick={() => { 
                    signOut(auth); 
                }} >
                    <div className="label-conatainer">
                        <label style={{ color: 'var(--app-red)' }}>Sign Out</label>
                    </div>
                </li> 
            </ul>
        </div>
    );
}
