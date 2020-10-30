import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import FavoritesScreen from "./FavoritesScreen";

const FiltersScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Filters Screen</Text>
        </View>

    );
};

FiltersScreen.navigationOptions = (navData) => { //navdata para aceder a navigation
    return {
        headerTitle: 'Filter Meals',
        headerLeft:
            <HeaderButtons
                HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer(); //abre e fecha o menu
                }}/>
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FiltersScreen;

