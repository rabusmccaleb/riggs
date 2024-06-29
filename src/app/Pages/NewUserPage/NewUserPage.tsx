import React, { useState, useEffect, useContext } from "react";
import ColorUI from "../../Components/ColorUI/ColorUI";
import { AddNewUser, uploadUserProfileImage, } from "../../fb/dbMethods";
import { auth, db  } from "../../fb/fbSetup";
import { onAuthStateChanged } from "firebase/auth";
import { ArrayOfComm, CurrentUserDataModel, PagePaths } from "../../Models/Models";
import "./NewUserPage.css";
import { ApplicationName } from "../../Models/Models";
import { 
    EastWestRegion, NorthSouthRegion, // Region
    Openess, Conscientiousness, Extraversion, Agreeableness, Neuroticism, // Personality Type
    PsychTypeGradient_default, OpenessPsychType_default, ConscientiousnessPsychType_default, ExtraversionPsychType_default, AgreeablenessPsychType_default, NeuroticismPsychType_default, UserPersonalModel,
 } from "../../Recomendations/Recomendations";
import logo from "../../../Resources/AppIcon.png";
import { PersonalityThumbSlider_Agreeableness, PersonalityThumbSlider_Conscientiousness, PersonalityThumbSlider_Extraversion, PersonalityThumbSlider_Neuroticism, PersonalityThumbSlider_Openess } from "./PersonalityTypes";
import SelectTopicsOfInterest from "./TopicsOfInterests";

export interface CommunityInterestDataModel { title: string; selected: boolean; }
const ArrayOfCommunityData: CommunityInterestDataModel[] = ArrayOfComm.map(item => { return { title: item, selected: false } })
const NewUserView = () => {
    const [ newUserData, setNewUserData ] = useState<CurrentUserDataModel | undefined >(undefined);
    const [ openess, setOpenness ] = useState<Openess>(OpenessPsychType_default);
    const [ conscientiousness, setConscientiousness ] = useState<Conscientiousness>(ConscientiousnessPsychType_default);
    const [ extraversion, setExtraversion ] = useState<Extraversion>(ExtraversionPsychType_default);
    const [ agreeableness, setAgreeableness ] = useState<Agreeableness>(AgreeablenessPsychType_default);
    const [ neuroticism, setNeuroticism ] = useState<Neuroticism>(NeuroticismPsychType_default);
    // Community Items Of Interest
    const [ itemsOfInterest, setItemsOfInterests ] = useState<CommunityInterestDataModel[]>(ArrayOfCommunityData);

    const [ allowSave, setAllowSave ] = useState<boolean>(true);
	useEffect(function(){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // 
            } else { window.location.href = '/auth'; }
        });
	}, []);

    const [ fake, setFake ] = useState(false);
    return (
        <div className="newUserView">
            <div className="new-user-bckg-view">
                <ColorUI colonyCount={ 300 }/>
            </div>
            <div className="new-user-main-content-scrollview">
                <div className="new-user-content-view">
                    <div className="logo-title-container">
                        <div className="logo-container">
                            <img src={ logo }/>
                            <div className="image-cover"/>
                        </div>
                        <h1 className="auth-app-title">{ ApplicationName }</h1>
                    </div>
                    <h1 className="view-title">Setup Profile</h1>
                    <AddBasicUserDataField setUserData={ setNewUserData }/>
                    <PersonalityThumbSlider_Openess type={ OpenessPsychType_default } options={ PsychTypeGradient_default } setValue={ setOpenness }/>
                    <PersonalityThumbSlider_Conscientiousness type={ ConscientiousnessPsychType_default } options={ PsychTypeGradient_default } setValue={ setConscientiousness }/>
                    <PersonalityThumbSlider_Extraversion type={ ExtraversionPsychType_default } options={ PsychTypeGradient_default } setValue={ setExtraversion }/>
                    <PersonalityThumbSlider_Agreeableness type={ AgreeablenessPsychType_default } options={ PsychTypeGradient_default } setValue={ setAgreeableness }/>
                    <PersonalityThumbSlider_Neuroticism type={ NeuroticismPsychType_default } options={ PsychTypeGradient_default } setValue={ setNeuroticism }/>
                    <SelectTopicsOfInterest itemsOfInterest={ itemsOfInterest } setItemsOfInterests={ setItemsOfInterests }/>
                    { allowSave &&
                        <button className="save-user-data-button" onClick={() => {
                            // Purifying topics which is just turning array of objects into an array of strings
                            const cleanTopics: string[] = itemsOfInterest.filter(i => i.selected === true ).map(item => { return item.title });
                            const userPersonalModel: UserPersonalModel = {
                                age: newUserData.age ? newUserData.age : 0,
                                country: "",
                                region: { ew: EastWestRegion.east, ns: NorthSouthRegion.south },
                                disclosedPsychType: {
                                    openess: openess,
                                    conscientiousness: conscientiousness,
                                    extraversion: extraversion,
                                    agreeableness: agreeableness,
                                    neuroticism: neuroticism,
                                }
                            }
                            AddNewUser(
                                auth.currentUser.uid, 
                                newUserData.firstName, 
                                newUserData.lastName, 
                                newUserData.customUserName,
                                userPersonalModel,
                                cleanTopics,
                            (bool) => {
                                if (bool) {
                                    window.location.href = PagePaths.Test;
                                }
                            });
                        }}>save</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default NewUserView;

interface AddBasicUserDataModel { setUserData: React.Dispatch<React.SetStateAction<CurrentUserDataModel>> };
const AddBasicUserDataField = ({setUserData }: AddBasicUserDataModel) => {
    const [ imgSrc, setImgSrc ] = useState<string | undefined>(undefined);
    function SelectMessageImage () {
        const input = document.querySelector('.newUserView input#image-input-id.image-input');
        if (input) {
            // @ts-ignore
            input.click();
        }
    }

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files: File[] = Array.from(e.target.files)
        const file: File = files[0];
        uploadUserProfileImage(file, "jpg", auth.currentUser.uid, (sucess, urlsObject) => {
            if (sucess) setImgSrc(_=> { return urlsObject.mediumImageUrl; });
        }, undefined)
    }

    return (
        <div className="add-basic-user-data-view-and-profile-image">
            {/* Add Profile Image */}
            <div className="proflie-image-container" onClick={()=>{ SelectMessageImage() }}>
                { imgSrc && <img loading={"lazy"} src={ imgSrc } /> }
                { !imgSrc && <span className="plusSign"><span className="hdash"/><span className="vdash"/></span> }
                <input className="image-input" id="image-input-id" type="file" onChange={ handleFileSelected } accept="image/x-png,image/jpeg" style={{ display: "none" }}/>
            </div>
            {/* Add Basic User Data */}
            <div className="add-basic-user-data-view">
                <div className="first-last-name field-container">
                    <div className="text-field-cont">
                        <label className="field-label" htmlFor="firstName">First Name</label>
                        <input name="firstName" type={"text"} placeholder="first name" onChange={e=> { setUserData(curr => {
                            return { ...curr, firstName: e.target.value }
                        }) }}/>
                    </div>
                    <div className="text-field-cont">
                        <label className="field-label" htmlFor="lastName">Last Name</label>
                        <input className="field-input" placeholder="last name" name="lastName" type="text"  onChange={e=> { setUserData(curr => { return { ...curr, lastName: e.target.value } }) }}/>
                    </div>
                </div>
                <div className="username-age field-container">
                    <div className="text-field-cont">
                        <label className="field-label" htmlFor="username">Username</label>
                        <input className="field-input" placeholder="username" name="username" type="text"   onChange={e=> { setUserData(curr => { return { ...curr, customUserName: e.target.value } }) }}/>
                    </div>
                    
                    <div className="text-field-cont">
                        <label className="field-label" htmlFor="age">Age</label>
                        <input className="field-input" placeholder="24" name="age" type="number"   onChange={e=> { setUserData(curr => { return { ...curr, age: Number(e.target.value) } }) }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

