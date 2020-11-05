import React, {useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Switch} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import {useDispatch} from "react-redux";
import {setFilters} from "../store/actions/mealsActions";

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch value={props.value}
                    onValueChange={props.onChange}
                    trackColor={{true: Colors.secondaryColor}}
                    thumbColor='white'
            />
        </View>
    );
};

const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const {navigation} = props;

    const dispatch = useDispatch();

    //useCallback so vai mudar o saveFilters se algum dos filtros for alterado, que por sua vez vai invocar o useEffect
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

    useEffect(() => {
            navigation.setParams({toSave: saveFilters});
        }
        , [saveFilters]); //mandar os filtros para a navigation
    // comunicar entre o componente e o navigation

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch
                label='Gluten-free'
                value={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label='Lactose-free'
                value={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label='Vegan'
                value={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                label='Vegetarian'
                value={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View>

    );
};

FiltersScreen.navigationOptions = (navData) => { //navdata para aceder a navigation
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () =>
            <HeaderButtons
                HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu'
                      iconName='ios-menu'
                      onPress={() => {
                          navData.navigation.toggleDrawer(); //abre e fecha o menu
                      }}/>
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons
                HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    // iconName='ios-save'
                    onPress={
                        navData.navigation.getParam('toSave')
                    }/>
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    }
});

export default FiltersScreen;

