import React, { useState } from "react";
import { Openess, Conscientiousness, Extraversion, Agreeableness, Neuroticism } from "../../Recomendations/Recomendations";

export interface PersonalityThumbSliderModel_Openess {
    type: Openess;
    options: string[];
    setValue: React.Dispatch<React.SetStateAction<Openess>>
}
export const PersonalityThumbSlider_Openess = ({type, options, setValue}: PersonalityThumbSliderModel_Openess) => {
    const [ selectedIndex, setSelectedIndex] = useState<{0: number; 1: number;}>({ "0": 2, "1": 2}); // Default value set to the middle
    return (
        <>
            {
                type.spectrum.map((spectrum, mainIndex) => {
                    return (
                        <div key={ mainIndex } className="thumb-slider-view">
                            <div className="thumb-slider-track">
                                {
                                    options.map((option, index) => {
                                        return (
                                            <div key={ index } className="thumb-slider-option" style={{left : `${( (25 * index) ) }%` }}>
                                                <div 
                                                    className={`thumb-select ${ selectedIndex[`${ mainIndex }`] === index ? " active" : ""}`}
                                                    onClick={() => {
                                                        if (spectrum["one"] === "inventive") {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => {
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });
                                                            setValue(curr => { return { ...curr, inventive_v_consistent: newValue, avgValue: ((curr.curious_v_cautious + newValue) / 2) } });
                                                        } else {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });

                                                            setValue(curr => { return { ...curr, inventive_v_consistent: newValue, avgValue: ((curr.curious_v_cautious + newValue) / 2) } });
                                                        }
                                                    }} 
                                                />

                                                <div className="thumb-label-options-container">
                                                    <label className="thumb-option-item-label">{ option }</label>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="slider-poles">
                                <div className="pole-item left">
                                <label className="pole-item-label">{ spectrum["one"] }</label>
                                </div>
                                <div className="pole-item right">
                                    <label className="pole-item-label">{ spectrum["two"] }</label>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export interface PersonalityThumbSliderModel_Conscientiousness {
    type:  Conscientiousness ;
    options: string[];
    setValue: React.Dispatch<React.SetStateAction<Conscientiousness>>
}
export const PersonalityThumbSlider_Conscientiousness = ({type, options, setValue}: PersonalityThumbSliderModel_Conscientiousness) => {
    const [ selectedIndex, setSelectedIndex] = useState<{0: number; 1: number;}>({ "0": 2, "1": 2}); // Default value set to the middle
    return (
        <>
            {
                type.spectrum.map((spectrum, mainIndex) => {
                    return (
                        <div key={ mainIndex } className="thumb-slider-view">
                            <div className="thumb-slider-track">
                                {
                                    options.map((option, index) => {
                                        return (
                                            <div key={ index } className="thumb-slider-option" style={{left : `${( (25 * index) ) }%` }}>
                                                <div 
                                                    className={`thumb-select ${ selectedIndex[`${ mainIndex }`] === index ? " active" : ""}`}
                                                    onClick={() => {
                                                        if (spectrum["one"] === "efficient") {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });
                                                            setValue(curr => { return { ...curr, efficient_v_easyGoing: newValue, avgValue: ((curr.organized_v_careless + newValue) / 2) } });
                                                        } else {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });

                                                            setValue(curr => { return { ...curr, organized_v_careless: newValue, avgValue: ((curr.efficient_v_easyGoing + newValue) / 2) } });
                                                        }
                                                    }} 
                                                />

                                                <div className="thumb-label-options-container">
                                                    <label className="thumb-option-item-label">{ option }</label>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="slider-poles">
                                <div className="pole-item left">
                                <label className="pole-item-label">{ spectrum["one"] }</label>
                                </div>
                                <div className="pole-item right">
                                <label className="pole-item-label">{ spectrum["two"] }</label>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}


export interface PersonalityThumbSliderModel_Extraversion {
    type:  Extraversion;
    options: string[];
    setValue: React.Dispatch<React.SetStateAction<Extraversion>>
}
export const PersonalityThumbSlider_Extraversion = ({type, options, setValue}: PersonalityThumbSliderModel_Extraversion) => {
    const [ selectedIndex, setSelectedIndex] = useState<{0: number; 1: number;}>({ "0": 2, "1": 2}); // Default value set to the middle
    return (
        <>
            {
                type.spectrum.map((spectrum, mainIndex) => {
                    return (
                        <div key={ mainIndex } className="thumb-slider-view">
                            <div className="thumb-slider-track">
                                {
                                    options.map((option, index) => {
                                        return (
                                            <div key={ index } className="thumb-slider-option" style={{left : `${( (25 * index) ) }%` }}>
                                                <div 
                                                    className={`thumb-select ${ selectedIndex[`${ mainIndex }`] === index ? " active" : ""}`}
                                                    onClick={() => {
                                                        if (spectrum["one"] === "outgoing") {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });
                                                            setValue(curr => { return { ...curr, outgoing_v_solitary: newValue, avgValue: ((curr.energetic_v_reserved + newValue) / 2) } });
                                                        } else {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });

                                                            setValue(curr => { return { ...curr, energetic_v_reserved: newValue, avgValue: ((curr.outgoing_v_solitary + newValue) / 2) } });
                                                        }
                                                    }} 
                                                />

                                                <div className="thumb-label-options-container">
                                                    <label className="thumb-option-item-label">{ option }</label>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="slider-poles">
                                <div className="pole-item left">
                                <label className="pole-item-label">{ spectrum["one"] }</label>
                                </div>
                                <div className="pole-item right">
                                <label className="pole-item-label">{ spectrum["two"] }</label>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export interface PersonalityThumbSliderModel_Agreeableness {
    type: Agreeableness;
    options: string[];
    setValue: React.Dispatch<React.SetStateAction<Agreeableness>>
}
export const PersonalityThumbSlider_Agreeableness = ({type, options, setValue}: PersonalityThumbSliderModel_Agreeableness) => {
    const [ selectedIndex, setSelectedIndex] = useState<{0: number; 1: number;}>({ "0": 2, "1": 2}); // Default value set to the middle
    return (
        <>
            {
                type.spectrum.map((spectrum, mainIndex) => {
                    return (
                        <div key={ mainIndex } className="thumb-slider-view">
                            <div className="thumb-slider-track">
                                {
                                    options.map((option, index) => {
                                        return (
                                            <div key={ index } className="thumb-slider-option" style={{left : `${( (25 * index) ) }%` }}>
                                                <div 
                                                    className={`thumb-select ${ selectedIndex[`${ mainIndex }`] === index ? " active" : ""}`}
                                                    onClick={() => {
                                                        if (spectrum["one"] === "friendly") {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });
                                                            setValue(curr => { return { ...curr, friendly_v_challenging: newValue, avgValue: ((curr.compassionate_v_detached + newValue) / 2) } });
                                                        } else {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });

                                                            setValue(curr => { return { ...curr, compassionate_v_detached: newValue, avgValue: ((curr.friendly_v_challenging + newValue) / 2) } });
                                                        }
                                                    }} 
                                                />

                                                <div className="thumb-label-options-container">
                                                    <label className="thumb-option-item-label">{ option }</label>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="slider-poles">
                                <div className="pole-item left">
                                <label className="pole-item-label">{ spectrum["one"] }</label>
                                </div>
                                <div className="pole-item right">
                                    <label className="pole-item-label">{ spectrum["two"] }</label>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}


export interface PersonalityThumbSliderModel_Neuroticism {
    type: Neuroticism ;
    options: string[];
    setValue: React.Dispatch<React.SetStateAction<Neuroticism>>
}
export const PersonalityThumbSlider_Neuroticism = ({type, options, setValue}: PersonalityThumbSliderModel_Neuroticism) => {
    const [ selectedIndex, setSelectedIndex] = useState<{0: number; 1: number;}>({ "0": 2, "1": 2}); // Default value set to the middle
    return (
        <>
            {
                type.spectrum.map((spectrum, mainIndex) => {
                    return (
                        <div key={ mainIndex } className="thumb-slider-view">
                            <div className="thumb-slider-track">
                                {
                                    options.map((option, index) => {
                                        return (
                                            <div key={ index } className="thumb-slider-option" style={{left : `${( (25 * index) ) }%` }}>
                                                <div 
                                                    className={`thumb-select ${ selectedIndex[`${ mainIndex }`] === index ? " active" : ""}`}
                                                    onClick={() => {
                                                        if (spectrum["one"] === "sensitive") {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });
                                                            setValue(curr => { return { ...curr, sensitive_v_secure: newValue, avgValue: ((curr.nervous_v_confident + newValue) / 2) } });
                                                        } else {
                                                            const newValue = ((25 * index) / 100);
                                                            setSelectedIndex(curr => { 
                                                                let obj = curr;
                                                                obj[`${mainIndex}`] = index;
                                                                return obj; 
                                                            });

                                                            setValue(curr => { return { ...curr, nervous_v_confident: newValue, avgValue: ((curr.sensitive_v_secure + newValue) / 2) } });
                                                        }
                                                    }} 
                                                />

                                                <div className="thumb-label-options-container">
                                                    <label className="thumb-option-item-label">{ option }</label>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="slider-poles">
                                <div className="pole-item left">
                                    <label className="pole-item-label">{ spectrum["one"] }</label>
                                </div>
                                <div className="pole-item right">
                                    <label className="pole-item-label">{ spectrum["two"] }</label>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

