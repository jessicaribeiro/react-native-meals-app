import React from "react";
import { StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';


import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from "../components/CategoryGridTile";
import CustomHeaderButton from "../components/HeaderButton";

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

CategoriesScreen.navigationOptions = (navData) => { //navdata para aceder a navigation
    return {
        headerTitle: 'Meal Categories',
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

export default CategoriesScreen;

