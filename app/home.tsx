import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import dataBase from "@/components/DB";
import {router, useLocalSearchParams} from "expo-router";
import { BurgerMenuSvg } from "@/assets/images/Svg/burger";
import { BasketSvg } from "@/assets/images/Svg/basket";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { FilterSvg } from "@/assets/images/Svg/filter";
import { SearchSvg } from "@/assets/images/Svg/search";
import { LikeSvg } from "@/assets/images/Svg/like";
import { AddSaladSvg } from "@/assets/images/Svg/addSalad";

interface SaladItem {
    id: number;
    name: string;
    img: any;
    price: number;
    ingredients: string;
    bgColor?: string;
}

const Home = () => {
    const { inputName } = useLocalSearchParams();
    const [likeState, setLikeState] = useState<Record<number, boolean>>({});
    const [tab, setTab] = useState<'hottest' | 'popular' | 'newCombo' | 'top'>('hottest');
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState<SaladItem[]>(dataBase);

    const previousTab = useRef<'hottest' | 'popular' | 'newCombo' | 'top'>(tab);

    const hottestWidth = useRef(new Animated.Value(0)).current;
    const popularWidth = useRef(new Animated.Value(0)).current;
    const newComboWidth = useRef(new Animated.Value(0)).current;
    const topWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadFonts().then(() => console.log('Font Loaded'));
    }, []);

    const animateTabUnderline = (newTab: 'hottest' | 'popular' | 'newCombo' | 'top') => {
        const widthValues = { hottest: hottestWidth, popular: popularWidth, newCombo: newComboWidth, top: topWidth };
        const hidePreviousLine = Animated.timing(widthValues[previousTab.current], { toValue: 0, duration: 150, useNativeDriver: false });
        const showNewLine = Animated.timing(widthValues[newTab], { toValue: 40, duration: 300, useNativeDriver: false });
        Animated.sequence([hidePreviousLine, showNewLine]).start(() => { previousTab.current = newTab });
    };

    useEffect(() => animateTabUnderline(tab), [tab]);

    const toggleLike = (index: any) => {
        setLikeState((prevState: any) => ({ ...prevState, [index]: !prevState[index] }));
    };

    const searchResult = (search: string) => {
        setSearch(search);
        const results = dataBase.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredItems(results as never);
    };

    function debounce(callback : any, delay = 0) {
        let timeout : any;
        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => callback(...args), delay);
        };
    }

    const updateDebounceText = debounce((text : string) => searchResult(text));

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
            <View style={styles.container}>
                <View>
                    <View style={styles.burgerBasket}>
                        <BurgerMenuSvg />
                        <TouchableOpacity style={styles.basketContainer} onPress={() => {router.push('/basket')}}>
                            <BasketSvg />
                            <Text style={{ fontFamily: 'CustomFont-Light' }}>My basket</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.hello}>
                        <Text style={{ fontFamily: 'CustomFont-Light' }}>Hello {inputName},</Text>
                        <Text style={{ fontFamily: 'CustomFont-Regular' }}>What fruit salad{`\n`}combo do you want today?</Text>
                    </Text>
                    <View style={styles.searchFilter}>
                        <View style={styles.lupa}><SearchSvg /></View>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Search for fruit salad combos'
                            placeholderTextColor='#86869E'
                            value={search}
                            onChangeText={updateDebounceText}
                        />
                        <FilterSvg />
                    </View>
                </View>
                <View style={styles.recommendedContainer}>
                    {search ? (
                        filteredItems.length > 0 ? (
                            <>
                                <Text style={[styles.recommendedComboTitle, { fontFamily: 'CustomFont-Regular' }]}>Search results</Text>
                                <ScrollView
                                    style={styles.searchRecommendedCombo}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {filteredItems.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.searchRecommendedSalad}
                                            onPress={() => router.push({
                                                pathname: '/aboutSalad',
                                                params: {
                                                    saladName: item.name,
                                                    saladImage: item.img,
                                                    saladPrice: item.price,
                                                    saladIngredients: item.ingredients,
                                                    saladId: item.id,
                                                }
                                            })}
                                        >
                                            <TouchableOpacity
                                                style={{ alignSelf: 'flex-end' }}
                                                onPress={() => toggleLike(index)}>
                                                <LikeSvg color={likeState[index] ? '#F08626' : 'none'} />
                                            </TouchableOpacity>
                                            <Image style={styles.saladImage} source={item.img} resizeMode='contain' />
                                            <Text style={[styles.title, { fontFamily: 'CustomFont-Regular' }]}>{item.name}</Text>
                                            <View style={styles.bottomSaladPriceAdd}>
                                                <Text style={[styles.price, { fontFamily: 'CustomFont-Regular' }]}>{item.price} $</Text>
                                                <AddSaladSvg />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </>
                        ) : (
                            <Text>No results found</Text>
                        )
                    ) : (
                        <>
                            <Text style={[styles.recommendedComboTitle, { fontFamily: 'CustomFont-Regular' }]}>Recommended Combo</Text>
                            <View style={styles.recommendedCombo}>
                                {dataBase.slice(0, 2).map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.recommendedSalad, index === 0 && styles.firstRecommendedSalad]}
                                        onPress={() => router.push({
                                            pathname: '/aboutSalad',
                                            params: {
                                                saladName: item.name,
                                                saladImage: item.img,
                                                saladPrice: item.price,
                                                saladIngredients: item.ingredients,
                                                saladId: item.id,
                                            }
                                        })}
                                    >
                                        <TouchableOpacity
                                            style={{ alignSelf: 'flex-end' }}
                                            onPress={() => toggleLike(index)}>
                                            <LikeSvg color={likeState[index] ? '#F08626' : 'none'} />
                                        </TouchableOpacity>
                                        <Image
                                            style={styles.saladImage}
                                            source={item.img}
                                            resizeMode='contain'
                                        />
                                        <Text style={[styles.title, {fontFamily: 'CustomFont-Regular'}]}>{item.name}</Text>
                                        <View style={styles.bottomSaladPriceAdd}>
                                            <Text style={[styles.price, {fontFamily: 'CustomFont-Regular'}]}>{item.price} $</Text>
                                            <AddSaladSvg />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}
                </View>
                <View style={styles.hottestPopularNewComboTop}>
                    <View style={styles.headers}>
                        <TouchableOpacity
                            style={tab === 'hottest' ? styles.activeTab : null}
                            onPress={() => setTab('hottest')}
                        >
                            <Text style={[
                                tab === 'hottest' ? styles.activeHead : styles.header,
                                { fontFamily: 'CustomFont-Regular' }
                            ]}>
                                Hottest
                            </Text>
                            <Animated.View style={[styles.underline, { width: hottestWidth }]} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tab === 'popular' ? styles.activeTab : null}
                            onPress={() => setTab('popular')}
                        >
                            <Text style={[
                                tab === 'popular' ? styles.activeHead : styles.header,
                                { fontFamily: 'CustomFont-Regular' }
                            ]}>
                                Popular
                            </Text>
                            <Animated.View style={[styles.underline, { width: popularWidth }]} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tab === 'newCombo' ? styles.activeTab : null}
                            onPress={() => setTab('newCombo')}
                        >
                            <Text style={[
                                tab === 'newCombo' ? styles.activeHead : styles.header,
                                { fontFamily: 'CustomFont-Regular' }
                            ]}>
                                New combo
                            </Text>
                            <Animated.View style={[styles.underline, { width: newComboWidth }]} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tab === 'top' ? styles.activeTab : null}
                            onPress={() => setTab('top')}
                        >
                            <Text style={[
                                tab === 'top' ? styles.activeHead : styles.header,
                                { fontFamily: 'CustomFont-Regular' }
                            ]}>
                                Top
                            </Text>
                            <Animated.View style={[styles.underline, { width: topWidth }]} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {tab === 'hottest' && (
                            <View style={styles.recommendedCombo}>
                                {dataBase.slice(2, 5).map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.tabSalad, {backgroundColor: item.bgColor}]}
                                        onPress={() => router.push({
                                            pathname: '/aboutSalad',
                                            params: {
                                                saladName: item.name,
                                                saladImage: item.img,
                                                saladPrice: item.price,
                                                saladIngredients: item.ingredients,
                                                saladId: item.id,
                                            }
                                        })}
                                    >
                                        <TouchableOpacity
                                            style={{ alignSelf: 'flex-end' }}
                                            onPress={() => toggleLike(index)}>
                                            <LikeSvg color={likeState[index] ? '#F08626' : 'none'} />
                                        </TouchableOpacity>
                                        <Image
                                            style={styles.saladImage}
                                            source={item.img}
                                            resizeMode='contain'
                                        />
                                        <Text style={[styles.title, {fontFamily: 'CustomFont-Regular'}]}>{item.name}</Text>
                                        <View style={styles.bottomSaladPriceAdd}>
                                            <Text style={[styles.price, {fontFamily: 'CustomFont-Regular'}]}>{item.price} $</Text>
                                            <AddSaladSvg />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}





                        {tab === 'popular' && (
                            <View style={styles.recommendedCombo}>
                                {dataBase.slice(5, 8).map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.tabSalad, {backgroundColor: item.bgColor}]}
                                        onPress={() => router.push({
                                            pathname: '/aboutSalad',
                                            params: {
                                                saladName: item.name,
                                                saladImage: item.img,
                                                saladPrice: item.price,
                                                saladIngredients: item.ingredients,
                                                saladId: item.id,
                                            }
                                        })}
                                    >
                                        <TouchableOpacity
                                            style={{ alignSelf: 'flex-end' }}
                                            onPress={() => toggleLike(index)}>
                                            <LikeSvg color={likeState[index] ? '#F08626' : 'none'} />
                                        </TouchableOpacity>
                                        <Image
                                            style={styles.saladImage}
                                            source={item.img}
                                            resizeMode='contain'
                                        />
                                        <Text style={[styles.title, {fontFamily: 'CustomFont-Regular'}]}>{item.name}</Text>
                                        <View style={styles.bottomSaladPriceAdd}>
                                            <Text style={[styles.price, {fontFamily: 'CustomFont-Regular'}]}>{item.price} $</Text>
                                            <AddSaladSvg />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        {tab === 'newCombo' && (
                            <View style={styles.recommendedCombo}>
                                {dataBase.slice(8, 10).map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.tabSalad, {backgroundColor: item.bgColor}]}
                                        onPress={() => router.push({
                                            pathname: '/aboutSalad',
                                            params: {
                                                saladName: item.name,
                                                saladImage: item.img,
                                                saladPrice: item.price,
                                                saladIngredients: item.ingredients,
                                                saladId: item.id,
                                            }
                                        })}
                                    >
                                        <TouchableOpacity
                                            style={{ alignSelf: 'flex-end' }}
                                            onPress={() => toggleLike(index)}>
                                            <LikeSvg color={likeState[index] ? '#F08626' : 'none'} />
                                        </TouchableOpacity>
                                        <Image
                                            style={styles.saladImage}
                                            source={item.img}
                                            resizeMode='contain'
                                        />
                                        <Text style={[styles.title, {fontFamily: 'CustomFont-Regular'}]}>{item.name}</Text>
                                        <View style={styles.bottomSaladPriceAdd}>
                                            <Text style={[styles.price, {fontFamily: 'CustomFont-Regular'}]}>{item.price} $</Text>
                                            <AddSaladSvg />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        {tab === 'top' && (
                            <View style={styles.recommendedCombo}>
                                {dataBase.slice(10, 12).map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.tabSalad, {backgroundColor: item.bgColor}]}
                                        onPress={() => router.push({
                                            pathname: '/aboutSalad',
                                            params: {
                                                saladName: item.name,
                                                saladImage: item.img,
                                                saladPrice: item.price,
                                                saladIngredients: item.ingredients,
                                                saladId: item.id,
                                            }
                                        })}
                                    >
                                        <TouchableOpacity
                                            style={{ alignSelf: 'flex-end' }}
                                            onPress={() => toggleLike(index)}>
                                            <LikeSvg color={likeState[index] ? '#F08626' : 'none'} />
                                        </TouchableOpacity>
                                        <Image
                                            style={styles.saladImage}
                                            source={item.img}
                                            resizeMode='contain'
                                        />
                                        <Text style={[styles.title, {fontFamily: 'CustomFont-Regular'}]}>{item.name}</Text>
                                        <View style={styles.bottomSaladPriceAdd}>
                                            <Text style={[styles.price, {fontFamily: 'CustomFont-Regular'}]}>{item.price} $</Text>
                                            <AddSaladSvg />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        padding: 20,
        backgroundColor: '#FFFFFF'
    },
    burgerBasket: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    basketContainer: {
        alignItems: 'center'
    },
    hello: {
        fontSize: 20,
        lineHeight: 28.6,
        marginVertical: 20,
    },
    searchFilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#F3F1F1',
        backgroundColor: '#F3F4F9',
        borderRadius: 15,
        padding: 20,
        paddingLeft: 30,
        fontSize: 16,
        color: 'black',
        flex: 1,
        marginRight: 20,
    },
    lupa: {
        position: 'absolute',
        left: 10,
        zIndex: 1,
    },
    recommendedCombo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    searchRecommendedCombo: {
        marginTop: 20,
    },
    bottomSaladPriceAdd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recommendedSalad: {
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        flex: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 45 },
        shadowOpacity: 0.05,
        shadowRadius: 25,
        elevation: 25,
    },
    searchRecommendedSalad: {
        padding: 10,
        borderRadius: 20,
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: 160,
        marginRight: 20,
    },
    firstRecommendedSalad: {
        marginRight: 20,
    },
    saladImage: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    recommendedComboTitle: {
        fontSize: 24,
        lineHeight: 32
    },
    recommendedContainer: {
        marginVertical: 30
    },
    price: {
        color: '#F08626',
    },
    title: {
        fontSize: 16,
        lineHeight: 22.88
    },
    tabSalad: {
        padding: 10,
        borderRadius: 20,
        flex: 1,
        marginRight: 20,
        width: 160
    },
    hottestPopularNewComboTop: {

    },
    headers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        fontSize: 23,
        color: '#938DB5',
    },
    activeHead: {
        fontSize: 32,
    },
    activeTab: {
        //borderBottomWidth: 3,
        borderRadius: 3,
        borderBottomColor: '#F08626',
    },
    underlineOn: {
        borderRadius: 20,
        width: 30,
        height: 3,
        backgroundColor: '#F08626',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    underlineOff: {
        borderRadius: 20,
        width: 0,
        height: 3,
        backgroundColor: '#F08626',
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    underline: {
        borderRadius: 20,
        height: 3,
        backgroundColor: '#F08626',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
});

export default Home;
