import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Імпортуємо AsyncStorage
import { router, useLocalSearchParams } from "expo-router";
import { GoBackBtn } from "@/components/GoBackBtn";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { RemoveItemSvg } from "@/assets/images/Svg/removeItem";
import { AddItemSvg } from "@/assets/images/Svg/addItem";
import { BigLikeSvg } from "@/assets/images/Svg/bigLike";

const AboutSalad = () => {
    const params = useLocalSearchParams();
    const saladName = params.saladName as any;
    const saladImage = params.saladImage as any;
    const saladPrice = params.saladPrice as any;
    const saladIngredients = params.saladIngredients as any;
    const saladId = params.saladId as any;
    const [count, setCount] = useState(1);

    const saveData = async () => {
        const newItem = {
            saladName: saladName,
            saladImage: saladImage,
            saladPrice: saladPrice,
            saladAmount: count,
            saladId: saladId,
        };

        try {
            const existingData = await AsyncStorage.getItem('@cartData');
            const cartData = existingData ? JSON.parse(existingData) : [];

            // Check if the item with the same saladId already exists
            const existingItemIndex = cartData.findIndex((item : any) => item.saladId === newItem.saladId);

            if (existingItemIndex !== -1) {
                // If the item exists, increment the amount
                cartData[existingItemIndex].saladAmount += newItem.saladAmount;
            } else {
                // Otherwise, add the new item to the cart
                cartData.push(newItem);
            }

            // Save the updated cart data
            await AsyncStorage.setItem('@cartData', JSON.stringify(cartData));
            router.push('/basket');

        } catch (e) {
            console.error('Error saving data to AsyncStorage:', e);
        }
    };


    useEffect(() => {
        loadFonts().then(() => console.log('Font Loaded'));
    }, []);

    return (
        <>
            <View style={styles.mainContainer}>
                <ImageBackground
                    source={require('../assets/images/fruits/bgFruits.png')}
                    resizeMode='cover'
                    style={styles.topContainer}
                >
                    <SafeAreaView style={styles.safeArea}>
                        <GoBackBtn />
                        <Image resizeMode='contain' style={styles.saladImage} source={saladImage} />
                    </SafeAreaView>
                </ImageBackground>
                <View style={styles.botContainer}>
                    <Text style={[styles.saladName, { fontFamily: 'CustomFont-Regular' }]}>{saladName}</Text>
                    <View style={styles.counterPrice}>
                        <View style={styles.counter}>
                            <TouchableOpacity onPress={() => { count > 1 ? setCount(count - 1) : setCount(count) }}>
                                <RemoveItemSvg />
                            </TouchableOpacity>
                            <Text style={[styles.counterNumber, { fontFamily: 'CustomFont-Regular' }]}>{count}</Text>
                            <TouchableOpacity onPress={() => { setCount(count + 1) }}>
                                <AddItemSvg />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.counterNumber, { fontFamily: 'CustomFont-Regular' }]}>{Number(saladPrice) * count} $</Text>
                    </View>
                    <View style={styles.onePackContains}>
                        <View style={styles.onePackBorder}><Text style={[styles.onePack, { fontFamily: 'CustomFont-Regular' }]}>One Pack Contains:</Text></View>
                        <Text style={[styles.ingredients, { fontFamily: 'CustomFont-Regular' }]}>{saladIngredients}</Text>
                    </View>
                    <View>
                        <Text style={[styles.finalText, { fontFamily: 'CustomFont-Light' }]}>If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make</Text>
                        <View style={styles.likeBasket}>
                            <TouchableOpacity>
                                <BigLikeSvg />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.addToBasketButton}
                                onPress={() => saveData()}
                            >
                                <Text style={[styles.buttonText, { fontFamily: 'CustomFont-Regular' }]}>Add to Basket</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    // Ваші стилі тут
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    botContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        paddingVertical: 30,
    },
    mainContainer: {
        height: '100%',
    },
    saladImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    safeArea: {
        width: '100%',
    },
    saladName: {
        fontSize: 32,
        paddingHorizontal: 20,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        borderBottomWidth: 2,
        paddingHorizontal: 20,
        paddingBottom: 25,
        borderBottomColor: '#F3F3F3',
    },
    counterNumber: {
        marginHorizontal: 15,
        fontSize: 24,
    },
    onePack: {
        fontSize: 20,
        lineHeight: 32,
    },
    ingredients: {
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    onePackBorder: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFA451',
        alignSelf: 'flex-start',
        marginHorizontal: 20,
    },
    onePackContains: {
        marginTop: 30,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#F3F3F3',
    },
    finalText: {
        fontSize: 14,
        margin: 20,
    },
    likeBasket: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    addToBasketButton: {
        backgroundColor: '#FFA451',
        borderRadius: 15,
        padding: 20,
        width: 250,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default AboutSalad;
