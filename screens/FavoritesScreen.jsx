import React from "react";
import MealList from "../components/MealList";
import {useSelector} from "react-redux";

import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import {View, StyleSheet} from "react-native";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    if (favoriteMeals.length === 0 || !favoriteMeals) {
        return (
            <View style={styles.emptyContent}>
                <DefaultText>No favorite meals found!</DefaultText>
            </View>
        );
    }
    return (
        <MealList listData={favoriteMeals} navigation={props.navigation}/>
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

const styles = StyleSheet.create({
    emptyContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default FavoritesScreen;

