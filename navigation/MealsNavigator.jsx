import React from "react";
import {Platform} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
// import { } from " react-native-paper";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
}, {
    initialRouteName: 'Categories', // primeira pagina a ser apresentada (senao é a pagina que aparece em primeiro no stack)
    mode: "modal", // efeito de como as paginas mudam
    defaultNavigationOptions: defaultStackNavOptions, // opçoes aplicadas em todos os ecras
});

const FavoritesNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
}, {
    initialRouteName: 'Favorites',
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions,
});

const tabScreenConfig = {
        Meals: {
            screen: MealsNavigator,
            navigationOptions: {
                tabBarLabel: 'Meals',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons name={'ios-restaurant'} size={25} color={tabInfo.tintColor} />)
                }
            },
            tabBarColor: Colors.primaryColor,
            },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                tabBarLabel: 'Favorites',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons name={'ios-star'} size={25} color={tabInfo.tintColor} />)
                },
                tabBarColor: Colors.secondaryColor,
            }},
};


const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true, //faz zoom in
        // barStyle: {  //define cor do fundo se shifting for false
        //     backgroundColor: Colors.primaryColor,
        // }
    })
    : createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
    });

export default createAppContainer(MealsFavTabNavigator);