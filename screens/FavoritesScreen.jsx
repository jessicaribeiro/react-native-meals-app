import React from "react";
import MealList from "../components/MealList";

import {MEALS} from "../data/dummy-data";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import CategoriesScreen from "./CategoriesScreen";

const FavoritesScreen = props => {
    const fav = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');
    return (
        <MealList listData={fav} navigation={props.navigation} />
    );
};

FavoritesScreen.navigationOptions = (navData) => { //navdata para aceder a navigation
    return {
        headerTitle: 'My Favorites',
        headerLeft: () =>
            <HeaderButtons
                HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer(); //abre e fecha o menu
                }}/>
            </HeaderButtons>
    }
};

export default FavoritesScreen;

