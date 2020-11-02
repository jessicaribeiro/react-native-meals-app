import React from "react";
import {Platform, Text} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons} from "@expo/vector-icons";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";
import { Icon } from 'react-native-elements';
// import { } from " react-native-paper";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitle: 'A Screen',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    }
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
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: Platform.OS === 'android' ? <Text
                style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals',
            tabBarIcon: (tabInfo) => {
                return (
                    <Icon type='ionicon' name='ios-restaurant' size={25}
                              color={tabInfo.tintColor}/>)
            }
        },
        tabBarColor: Colors.primaryColor,
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarLabel: Platform.OS === 'android' ? <Text
                style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Favorites',
            tabBarIcon: (tabInfo) => {
                return (
                    <Icon type='ionicon' name={'ios-star'} size={25}
                              color={tabInfo.tintColor}/>)
            },
            tabBarColor: Colors.secondaryColor,
        },
    },
};


const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true, //faz zoom in
        // barStyle: {  //define cor do fundo se shifting for false
        //     backgroundColor: Colors.primaryColor,
        // }
    })
    : createBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.primaryColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen,
}, {
    // navigationOptions: {
    //     drawerLabel: 'Filters', // nome da seccao no drawer
    // },
    initialRouteName: 'Filters',
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions,
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'All Meals', //nome da seccao no drawer
        }
    },
    Filters: FiltersNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator); // primeiro navigator a aparecer