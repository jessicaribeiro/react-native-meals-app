import React from "react";
import { StyleSheet, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = props => {
    // console.log(props);

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate('CategoryMeals', {categoryId: itemData.item.id})
                }}
            />
        )
    };

    return (
        // Grid
        <FlatList
            numColumns={2}
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem} />

    );
};

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories',
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoriesScreen;

