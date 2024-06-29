import React, { useEffect, useState, useContext } from "react";
import { ArrayOfComm } from "../../Models/Models";
import { CommunityInterestDataModel, saveFilterData, SelectTopicsOfInterestModel } from "./FilterBackendController";
import "./FilterView.css";

const ArrayOfCommunityData: CommunityInterestDataModel[] = ArrayOfComm.map(item => { return { title: item, selected: false } });
const FilterView = () => {
    const [ itemsOfInterest, setItemsOfInterests ] = useState<CommunityInterestDataModel[]>(ArrayOfCommunityData);
    const [ customInterestPrompt, setCustomInterestPrompt ] = useState<string[]>([]);
    const [ topicOne, setTopicOne] = useState("");
    const [ topicTwo, setTopicTwo] = useState("");
    const [ topicThree, setTopicThree] = useState("");

    return (
        <div className="FilterView">
            <div className="scrollview">
                <div className="contentview">

                    <div className="sentence-prompt-container">
                        <div className="oneSentence-content-view">
                            <div className="oneSentence-field-and-items">
                                <h1 className="content-title">One Sentence Explaination:</h1>
                                <label className="content-description">We give you the opportunity to give an explaination of your interests in a sentence. How beautiful is modern technology</label>
                                <input className="oneSentence-field" type={"text"} placeholder={"Add a sentence..."} value={ topicOne } onChange={e => { setTopicOne(_=> { return e.target.value; })}}/>
                                <input className="oneSentence-field" type={"text"} placeholder={"Add a sentence..."} value={ topicTwo } onChange={e => { setTopicTwo(_=> { return e.target.value; })}}/>
                                <input className="oneSentence-field" type={"text"} placeholder={"Add a sentence..."} value={ topicThree } onChange={e => { setTopicThree(_=> { return e.target.value; })}}/>
                            
                            </div>
                        </div>
                    </div>

                    <div className="custom-intersts">
                        <CustomTopicsOfInterest customInterestPrompt={ customInterestPrompt } setCustomInterestPrompt={ setCustomInterestPrompt }/>
                    </div>
                    <div className="top-categories">s
                        <SelectTopicsOfInterest itemsOfInterest={itemsOfInterest} setItemsOfInterests={setItemsOfInterests}/>
                    </div>
                    <div className="disposition"></div>
                    <div className="weight-of-recommendations"></div>

                    <button className="save-button" onClick={() => {
                        saveFilterData(itemsOfInterest, customInterestPrompt, topicOne, topicTwo, topicThree);
                    }}>save</button>

                    {/* <button className="save-button" onClick={() => { testMethod(); }}>test</button> */}
                </div>
            </div>
        </div>
    )
}

export default FilterView;


interface SentencePrompModel {
    promptID: string;
    scentence: string;
    dateAdded: string;
    promptCategory: PromptCategories;
}

enum PromptCategories {
    interest = "interest",
    humor = "Humor",
    couldBeInterest = "couldBeInterest",
    meaning = "meaning",
}

const sentencePropmItem = () => {
    return (
        <div></div>
    );
}


//
//
const SelectTopicsOfInterest = ({itemsOfInterest, setItemsOfInterests }:SelectTopicsOfInterestModel) => {
    return (
        <div className="topics-of-inteterst-scrollview-view">
            <div className="topics-of-interets-content-view">
                <h2 className="topics-of-interest-title">Select Topics That Interest You</h2>
                <p className="topics-of-interest-description">The selections below will help us recommend content to you.</p>
                <div className="topics-of-interest-container">
                    {
                        itemsOfInterest.map((item, index) => {
                            return (
                                <div key={ index } className={`topic-item${ item.selected ? " active" : ""}`} onClick={() => {
                                    let list = itemsOfInterest.map((elem, i) => {
                                        if (i === index) { return { title: elem.title, selected: !elem.selected };
                                        } else { return elem; }
                                    })
                                    setItemsOfInterests(list);
                                }}>
                                    <label className="topic-title">{ item.title }</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}


//
// customInterestPrompt
interface CustomTopicsProps {
    customInterestPrompt: string[];
    setCustomInterestPrompt: React.Dispatch<React.SetStateAction<string[]>>;

}
const CustomTopicsOfInterest = ({ customInterestPrompt, setCustomInterestPrompt }: CustomTopicsProps) => {
    const [ interest, setInterest] = useState("");
    return (
        <div className="topics-of-inteterst-scrollview-view interests">
            <div className="topics-of-interets-content-view">
                <h2 className="topics-of-interest-title">Custom Categories of Interests</h2>
                <p className="topics-of-interest-description">Please attempt to keep these interest to one word.</p>


                <div className="interest-field-and-items">
                    <input className="interest-field" type={"text"} placeholder={"Add a topic of interest..."} value={ interest } onChange={e => { setInterest(_=> { return e.target.value; })}}/>
                    <button type="button" className="add-interest" onClick={() => {
                        if (interest && interest.trim() !== "") {
                            setCustomInterestPrompt(list => {
                                let newList = [...list, interest]
                                return newList;
                            });
                            setInterest(_=> { return ""; });
                        }
                    }}>add</button>
                </div>


                <div className="topics-of-interest-container remove">
                    {
                        customInterestPrompt.map((item, index) => {
                            return (
                                <div key={ index } className={`topic-item`}>
                                    <label className="topic-title">{ item }</label>
                                    <button className="remove-item" onClick={() => {
                                        let items = customInterestPrompt.filter(i => i !== item );
                                        setCustomInterestPrompt(_=>{ return items; });
                                    }}>x</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}