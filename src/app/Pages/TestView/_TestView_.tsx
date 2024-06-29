import React, { useState, useEffect } from "react";
import './TestView.css';
import { MultiSelect, MultpleChoice, TestModel, TrueOrFalse, QuestionType, ApplicationName } from "../../Models/Models";
import { physics_multipleChoice } from "../../Models/TestData";
import ColorUI from "../../Components/ColorUI/ColorUI";
import logo from "../../../Resources/AppIcon.png";
import InvitationExamOptionView from "./InvitationExamOptionView";
import CompletedView from "./CompletedView";

const exampleModel : TestModel = {
    multipleChoiceQuestion: physics_multipleChoice,//exampleMultpleChoice,
    multiSelectQuestions: [], // exampleMultiSelect,
    trueOrFalseQuestions: [], // exampleTrueFalse,
};

// ✅
export interface _TestViewModel_ {
    submitPressed: boolean; 
    setSubmitPressed: React.Dispatch<React.SetStateAction<boolean>>;
    endExam: boolean;
    setEndExam: React.Dispatch<React.SetStateAction<boolean>>;
    startExam: boolean;
    setStartExam: React.Dispatch<React.SetStateAction<boolean>>;
    showInitationView: boolean;
    setShowInitiaionView: React.Dispatch<React.SetStateAction<boolean>>;
}
const _TestView_ = ({ submitPressed, setSubmitPressed, endExam, setEndExam, startExam, setStartExam, showInitationView, setShowInitiaionView }: _TestViewModel_) => {
    const [ testPostionPointer, setTestPositionPointer ] = useState<number>(0);
    const [ testItems, setTestItems ] = useState< TestModel | undefined >(exampleModel);
    const [ assembledTestItems, setAssembledTestItems ] = useState< { question: (MultpleChoice | TrueOrFalse | MultiSelect); answer: string; }[] >(undefined);

    function JoinTestQuestions(){
        if (testItems) {
            let initialTestList: { 
                question: (MultpleChoice | TrueOrFalse | MultiSelect);
                answer: string;
            }[]  = [];
            if (testItems.multipleChoiceQuestion.length) {
                for(let x = 0; x < testItems.multipleChoiceQuestion.length; x++ ) {
                    initialTestList.push(
                        {
                            question: testItems.multipleChoiceQuestion[x],
                            answer: ""
                        }
                    );
                }
            }
            if (testItems.multiSelectQuestions.length) {
                for(let x = 0; x < testItems.multiSelectQuestions.length; x++ ) {
                    initialTestList.push(
                        {
                            question: testItems.multiSelectQuestions[x],
                            answer: ""
                        }
                    );
                }
            }
            if (testItems.trueOrFalseQuestions.length) {
                for(let x = 0; x < testItems.trueOrFalseQuestions.length; x++ ) {
                    initialTestList.push(
                        {
                            question: testItems.trueOrFalseQuestions[x],
                            answer: ""
                        }
                    );
                }
            }
            
            let finalList = [];
            if (initialTestList.length) {
                // Randomly sort
                initialTestList.forEach(item => {
                    const randomNumber: number = (Math.random() * (initialTestList.length - 1));
                    item.question.randomIndexer = randomNumber;
                })
                finalList = initialTestList.sort((a, b) => {
                    return a.question.randomIndexer - b.question.randomIndexer;
                });
            }

            setAssembledTestItems(_=> { return finalList; });
        }
    }

    useEffect(() => { JoinTestQuestions (); }, []);

    return (
        <>
        <div className="test-view">
            <div className="background-container">
                <ColorUI/>
            </div>
            { (showInitationView === false && !endExam && !submitPressed) &&
                <div className="test-view-container">
                    <div className="title-logo-container">
                        <div className="logo-container">
                            <img src={ logo }/>
                            <div className="image-cover"/>
                        </div>
                        <h1 className="exam-app-title">{ ApplicationName }</h1>
                        <h1 className="exam-view-title">Entrance Exam</h1>
                    </div>
                    <TimerComponent setEndExam={ setEndExam }  startExam={ (showInitationView === false) ? true : false }/>
                    <div className="test-content-container">
                        { (assembledTestItems && assembledTestItems.length && !submitPressed) &&
                            <div className="test-view-v-stack">
                                { (assembledTestItems[testPostionPointer].question.questionType === QuestionType.MultpleChoice) &&
                                    <MultpleChoiceElement 
                                        question={ assembledTestItems[testPostionPointer].question as MultpleChoice } 
                                        pointer={ testPostionPointer }
                                        selectedAnswer={ assembledTestItems[testPostionPointer].answer }
                                        setSelectedAnswer={ setAssembledTestItems }
                                    />
                                }
                                {
                                    (assembledTestItems[testPostionPointer].question.questionType === QuestionType.MultiSelect) &&
                                    <MultiSelectElement question={ assembledTestItems[testPostionPointer].question as MultiSelect }/>
                                }
                                {
                                    (assembledTestItems[testPostionPointer].question.questionType === QuestionType.TrueOrFalse) &&
                                    <TrueOrFalseElement question={ assembledTestItems[testPostionPointer].question as TrueOrFalse }/>
                                }
                            </div>
                        }
                    </div>
                    {/* navigation */}
                    <div className="navigation-buttons-style">
                        {
                            ( !submitPressed && testPostionPointer > 0 && assembledTestItems && assembledTestItems.length > 1) &&
                            <button className="previous" onClick={() => { 
                                setTestPositionPointer((v) => { return v - 1 });
                            }}>Previous</button>

                        }
                        
                        { 
                            (assembledTestItems && (assembledTestItems.length - 1 ) === testPostionPointer) ?
                            <>{ !submitPressed && <button className="submit" onClick={()=>{ setSubmitPressed(b=>{ return true; }); }}>submit</button> }</>
                            :
                            <button className="next" onClick={() => { setTestPositionPointer((v) => { return v + 1 })}}>Next</button>
                        }
                        
                    </div>
                </div>
            }
        </div>
        <InvitationExamOptionView setStartExam={ setStartExam } showInitationView={ showInitationView } setShowInitiaionView={ setShowInitiaionView }/>
        { submitPressed && <CompletedView submitPressed={ submitPressed } setSubmitPressed={ setSubmitPressed } assembledTestItems={ assembledTestItems }/> }
        </>  
    );
};
export default _TestView_;

// ✅
interface timerProps {
    setEndExam: React.Dispatch<React.SetStateAction<boolean>>;
    startExam: boolean;
}
const TimerComponent = ({ setEndExam, startExam }: timerProps) => {
    const examLength = ( 7 * 60 ); // 60 seconds * 7 = 7 minutes + (animating option view off screen).
    const [ timeElapsed, setTimeElapsed ] = useState<number>(0);

    function returnTime(counter: number): string {
        const val = examLength - counter;
        const minute = Math.floor(val / 60);
        const second = val - (minute * 60);
        const transFormedSecond = (second < 10) ? `0${ second }`: `${ second }`;
        const stringtime = `${minute}:${transFormedSecond}`
        return stringtime;
    }

    

    useEffect(() => {
        if (startExam) {
            console.log("TimerComponent Rendered: before start exam called", startExam);
            let timer;
            timer = setInterval(()=> { setTimeElapsed( c => { return c + 0.5 }); }, 1000);
            // Close the exam after the timer has concluderd
            setTimeout(() => {
                setTimeElapsed( c => { return examLength; });
                clearInterval(timer);
                setEndExam(_=> { return true; });
            }, ((examLength * 1000) - 0.000000001));
        }
    }, [ startExam ])

    return (
        <div className="timerView">
            <h6 className="timer-view-title">Time Elapsed:</h6>
            <div className="time-container">
                <label style={{color: "black"}}>{ returnTime( timeElapsed )}</label>
            </div>
        </div>
    ) 
}

// ✅
interface multipleChoiceElemModel {
    question: MultpleChoice;
    pointer: number;
    selectedAnswer: string;
    setSelectedAnswer: React.Dispatch<React.SetStateAction<{ question: (MultpleChoice | TrueOrFalse | MultiSelect); answer: string; }[]>>;
};
const MultpleChoiceElement = ({ question, pointer, selectedAnswer, setSelectedAnswer }: multipleChoiceElemModel) => {
    const [ temp_selected, setTemp_Selected ] = useState< string >("");
    const [ answerOptions, setAnswersOptions ] = useState< { answerTitle: string , answer: string}[] >([]);
    let anserStaticList: { answerTitle: string , answer: string}[] = [];
    useEffect(() => {
        anserStaticList = [];
        anserStaticList.push( { answerTitle: "a", answer: question.a } );
        anserStaticList.push( { answerTitle: "b", answer: question.b } );
        if (question.c && question.c !== undefined) { 
            anserStaticList.push( { answerTitle: "c", answer: question.c } ); 
        }
        if (question.d && question.d !== undefined) { 
             anserStaticList.push( { answerTitle: "d", answer: question.d } );
        }
        //
        if (question.e && question.e !== undefined) { 
            anserStaticList.push( { answerTitle: "e", answer: question.e } ); 
        }
        if (question.f && question.f !== undefined) { 
            anserStaticList.push( { answerTitle: "f", answer: question.f } );
        }
        setTemp_Selected(_=> { return ""; });
        setAnswersOptions(_=> { return anserStaticList; });
    }, [ pointer ]);
    return ( 
        <div className="question-item">
            <div className="question-title-container">
                <h4>{ question.question }</h4>
            </div>
            <div className="image-items-container">
                {
                    question.exampleImages.map( (item, index) => {
                        return (
                            <div className="image-item" key={ index }>
                                <img loading={"lazy"} className="image" src={ item.imageURL }/>
                                <label className="image-label">{ item.imageTitle } </label>
                            </div>
                        )
                    })
                }
            </div>
            <div className="answer-options-container">
                { answerOptions.length &&
                    answerOptions.map((item, index) => {
                        return (
                            <div className={ `answer-options${ ((item.answer === selectedAnswer) || (item.answer === temp_selected)) ? " active" : ""}` } key={ index }
                                onClick={() => {
                                    setSelectedAnswer( list => {
                                        let newList = list;
                                        newList[ pointer ] = { question: list[ pointer ].question, answer: item.answer }
                                        return newList;
                                    });
                                    setTemp_Selected(_=> { return item.answer; });
                                }}
                            >
                                <div className="option-selection" aria-label={ `Option ${ item.answerTitle }: ${ item.answer }` }></div>
                                <h5 className="answer-title">{ `${item.answerTitle}).` }</h5>
                                <h6 className="answer-answer">{ item.answer }</h6>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

// ✅
interface multiSelectElemModel {
    question: MultiSelect;
};
const MultiSelectElement = ({ question, }: multiSelectElemModel) => {
    const [ selectedIndex, setSelectedIndex ] = useState< number | undefined >(undefined);
    const [ answerOptions, setAnswersOptions ] = useState< { answerTitle: string , answer: string}[] >([]);
    let anserStaticList: { answerTitle: string , answer: string}[] = [];
    anserStaticList.push( { answerTitle: "a", answer: question.a } );
    anserStaticList.push( { answerTitle: "b", answer: question.b } );
    if (question.c) anserStaticList.push( { answerTitle: "c", answer: question.c } );
    if (question.d) anserStaticList.push( { answerTitle: "d", answer: question.d } );
    if (question.e) anserStaticList.push( { answerTitle: "e", answer: question.e } );
    if (question.f) anserStaticList.push( { answerTitle: "f", answer: question.f } );
    useEffect(() => {
        setAnswersOptions(_=> { return anserStaticList; });
    }, []);
    return ( 
        <div className="question-item">
            <div className="question-title-container">
                <h4>{ question.question }</h4>
            </div>
            <div className="image-items-container">
                {
                    question.exampleImages.map( (item, index) => {
                        return (
                            <div className="image-item" key={ index }>
                                <img loading={"lazy"} className="image" src={ item.imageURL }/>
                                <label className="image-label">{ item.imageTitle } </label>
                            </div>
                        )
                    })
                }
            </div>
            <div className="answer-options-container">
                {
                    answerOptions.map((item, index) => {
                        return (
                            <div className={ `answer-options${index === selectedIndex ? " active" : ""}` } key={ index }
                                onClick={() => {
                                    setSelectedIndex(_=> { return index });
                                }}
                            >
                                <div className="option-selection" aria-label={ `Option ${ item.answerTitle }: ${ item.answer }` }></div>
                                <label className="answer-title">{ `${item.answerTitle}).` }</label>
                                <label className="answer-answer">{ item.answer }</label>
                            </div>                        
                        )
                    })
                }
            </div>
        </div>
    );
}

// ✅
interface trueOrFalseElemModel {
    question: TrueOrFalse;
};
const TrueOrFalseElement = ({ question, }: trueOrFalseElemModel) => {
    const possibleAnswers = [ true, false ];
    return ( 
        <div className="question-item">
            <div className="question-title-container">
                <h4>{ question.question }</h4>
            </div>
            <div className="image-items-container">
                {
                    question.exampleImages.map( (item, index) => {
                        return (
                            <div className="image-item" key={ index }>
                                <img loading={"lazy"} className="image" src={ item.imageURL }/>
                                <label className="image-label">{ item.imageTitle } </label>
                            </div>
                        )
                    })
                }
            </div>
            <div className="answer-options-container">
                {
                    possibleAnswers.map((item, index) => {
                        return (
                            <div className="answer-options" key={ index }><label>{`${item}`}</label></div>
                        )
                    })
                }
            </div>
        </div>
    );
}
