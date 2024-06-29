import React, { useContext } from "react";
import ControllerContext from "../../Contexts/ControllerContexts";
import { PostImageModel } from "../../fb/dbMethods";
import "./ImageItemsView.css";


interface Props {
    imageList? : PostImageModel[];
}

const ImageItemsView = ({ imageList }: Props) => {
    const { toggleImageCloserLook } = useContext(ControllerContext)
    return (
        <>
            { imageList ?
                <div className="image-view-scrollview hideScrollIndicator">
                   { imageList.length === 1 && <div className="imagview-single-bkg"><img loading={"lazy"} className="single-image-bkg" src={ imageList[ 0 ].url }/> </div> }
                    <div className={ `image-view-content-view${ imageList.length === 1 ? " single" : "" }` }>
                        { imageList.length === 1 ?
                            <img loading={"lazy"} className="single-image" src={ imageList[ 0 ].url }
                            onClick={() => {
                                toggleImageCloserLook(imageList[ 0 ].url, true);
                            }}
                            />
                            :
                            <>
                                {   
                                    imageList.map( (imageObj, index) => {
                                        return ( 
                                                    <img loading={"lazy"}
                                                        src={ imageObj.url }
                                                        onClick={() => {
                                                            toggleImageCloserLook(imageObj.url, true);
                                                        }}
                                                    /> 
                                                )
                                    })
                                }
                            </>
                        }
                    </div>
                </div>
            :
            <></>
            }
        </>
    );
}

export default ImageItemsView;