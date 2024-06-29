import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { FavoritesModel, _GetAllOfUsersFavorites } from "../../Controller/favorites_db_controller";
import { ContentModel, Posts_Coll_And_Doc_Path, PostType } from "../../fb/dbMethods";
import { db } from "../../fb/fbSetup";
import { ContentCard } from "../Home/ContentView/ContentView";
import './FavoritesView.css';
import FavoritesItemView from "./FavoritesItemView";

const FavoritesView = () => {
    const { userFavorites } = useContext(UserContext);
    return (
        <div className="favoritesView">
            <div className="favorites-content-view">
                <div className="view-title">
                    <h1>Favorites</h1>
                    <h4>A log of all the content you've added to your favorites</h4>
                </div>
                { userFavorites.length > 0 ?
                        userFavorites.map((fav, index) => {
                            return ( <FavoritesItemView favorite={ fav } index={ index } />)
                        })
                        :
                        <h2 style={{ marginTop: "20px"}}>🙁 Sorry, it looks like you don't have any favorited items.</h2>
                }
            </div>
        </div>
    )
}

export default FavoritesView;