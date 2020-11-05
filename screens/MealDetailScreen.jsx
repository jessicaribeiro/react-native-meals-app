import React, {useCallback, useEffect} from "react";
import {View, Text, StyleSheet, Button, ScrollView, Image} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

import DefaultText from "../components/DefaultText";
import {useDispatch, useSelector} from "react-redux";
import {toggleFavorite} from "../store/actions/mealsActions";

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');

    const availableMeals = useSelector(state => state.meals.meals);

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const isMealFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const dispatch = useDispatch(); //hook

    const toggleFavoriteHandler = useCallback(() => {
      dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler});
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({isFav: isMealFavorite});
    }, [isMealFavorite]);

    // useEffect(() => {
    //     props.navigation.setParams({mealTitle: selectedMeal.title}); //entra num loop infinito -> para evitar isso faz-se o set das props no useEffect, só actualiza as props quando o selectedMeal é alterado
    // }, [selectedMeal]);


    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient =>
                <ListItem key={ingredient}>{ingredient}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step =>
                <ListItem key={step}>{step}</ListItem>)}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');


    return {
        headerTitle: mealTitle,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Favorite'
                    iconName={isFavorite ? 'ios-star': 'ios-star-outline'}
                    onPress={toggleFavorite}/>

            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    }
});

export default MealDetailScreen;

