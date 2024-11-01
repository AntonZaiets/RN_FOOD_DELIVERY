import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, SafeAreaView, Image, ImageBackground, TouchableOpacity, Modal, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoBackBtn } from "@/components/GoBackBtn";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { RemoveItemSvg } from "@/assets/images/Svg/removeItem";
import { AddItemSvg } from "@/assets/images/Svg/addItem";
import {router} from "expo-router";

interface SaladItem {
    saladId: string;
    saladName: string;
    saladImage: any;
    saladAmount: number;
    saladPrice: number;
}

const Basket = () => {
    const [saladData, setSaladData] = useState<SaladItem[]>([]);
    const [sum, setSum] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openCardModal, setOpenCardModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const fetchData = async () => {
        try {
            const existingData = await AsyncStorage.getItem('@cartData');
            const data = existingData ? JSON.parse(existingData) : [];
            setSaladData(data);
        } catch (e) {
            console.error('Error fetching data from AsyncStorage:', e);
        }
    };

    const updateSaladAmount = async (id: string, action: string) => {
        const updatedData = saladData.map((item) => {
            if (item.saladId === id) {
                const updatedAmount = action === 'increase' ? item.saladAmount + 1 : Math.max(0, item.saladAmount - 1);
                return { ...item, saladAmount: updatedAmount };
            }
            return item;
        }).filter(item => item.saladAmount > 0);

        setSaladData(updatedData);
        await AsyncStorage.setItem('@cartData', JSON.stringify(updatedData));
    };

    const handleChangeText = (phone: string) => {
        setPhoneNumber(phone);
    };

    const payOnDelivery = () => {
        /*if(phoneNumber.length >= 10){
            setOpenModal(false);
            setOpenCardModal(true);
            setPhoneNumber('');
        }*/
        setOpenModal(false);
        setOpenCardModal(true);
        setPhoneNumber('');
    }


    useEffect(() => {
        const calculateSum = () => {
            const totalSum = saladData.reduce((acc, item) => acc + item.saladAmount * item.saladPrice, 0);
            setSum(totalSum);
        };

        calculateSum();
    }, [saladData]);

    useEffect(() => {
        fetchData();
        loadFonts().then(() => console.log('Font Loaded'));
    }, []);

    return (
        <>
            <View style={styles.mainContainer}>
                <ImageBackground
                    source={require('../assets/images/fruits/bgFruits.png')}
                    resizeMode='cover'
                >
                    <SafeAreaView style={styles.topContainer}>
                        <GoBackBtn />
                        <Text style={[styles.headText, { fontFamily: 'CustomFont-Regular' }]}>My Basket</Text>
                        <View />
                        <View />
                    </SafeAreaView>
                </ImageBackground>
                <View style={styles.salads}>
                    {saladData.length > 0 ? (
                        saladData.map((item, index) => (
                            <View key={item.saladId} style={[styles.salad, { borderTopWidth: index > 0 ? 2 : 0 }]}>
                                <View style={styles.leftSide}>
                                    <Image style={{ width: 100, height: 100 }} source={item.saladImage} />
                                    <View style={styles.leftSideText}>
                                        <Text style={[styles.font, styles.saladName]}>{item.saladName}</Text>
                                        <View style={styles.addRemove}>
                                            <TouchableOpacity onPress={() => updateSaladAmount(item.saladId, 'decrease')}>
                                                <RemoveItemSvg />
                                            </TouchableOpacity>
                                            <Text style={[styles.font, styles.saladPrice]}>{item.saladAmount}</Text>
                                            <TouchableOpacity onPress={() => updateSaladAmount(item.saladId, 'increase')}>
                                                <AddItemSvg />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <Text style={[styles.saladPrice, styles.font]}>{item.saladPrice * item.saladAmount} $</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyBasket}>Basket is empty</Text>
                    )}
                </View>
                <View style={styles.totalContainer}>
                    <View>
                        <Text style={[styles.font, styles.totalText]}>Total</Text>
                        <Text style={[styles.font, styles.totalText]}>{sum} $</Text>
                    </View>
                    <TouchableOpacity style={styles.checkout} onPress={() => setOpenModal(true)}>
                        <Text style={[styles.font, styles.checkoutText]}>Checkout</Text>
                    </TouchableOpacity>
                </View>
                {openModal && (
                    <>
                        <View style={styles.bgShadow}/>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openModal}
                            onRequestClose={() => setOpenModal(!openModal)}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableOpacity style={styles.closeModal} onPress={() => setOpenModal(false)}>
                                    <Text style={styles.closeText}>✕</Text>
                                </TouchableOpacity>
                                <Text style={[styles.modalTitles, styles.font]}>Delivery address</Text>
                                <TextInput
                                    style={[styles.input, styles.font]}
                                    placeholder="10th avenue, Lekki, Lagos State"
                                    placeholderTextColor="#C4C4C4"
                                />
                                <Text style={[styles.modalTitles, styles.font]}>Number we can call</Text>
                                <TextInput
                                    style={[styles.input, styles.font]}
                                    placeholder="09090605708"
                                    placeholderTextColor="#C4C4C4"
                                    value={phoneNumber}
                                    onChangeText={handleChangeText}
                                />
                                <View style={styles.paymentOptions}>
                                    <TouchableOpacity
                                        style={styles.payButton}
                                        onPress={() => {
                                            setOpenModal(false);
                                            router.push('/orderCompleted');
                                        }}
                                    >
                                        <Text style={styles.payButtonText}>Pay on delivery</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.payButton}
                                        onPress={payOnDelivery}
                                    >
                                        <Text style={styles.payButtonText}>Pay with card</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
                {openCardModal && (
                    <>
                        <View style={styles.bgShadow}/>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openCardModal}
                            onRequestClose={() => setOpenCardModal(!openCardModal)}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableOpacity style={styles.closeModal} onPress={() => setOpenCardModal(false)}>
                                    <Text style={styles.closeText}>✕</Text>
                                </TouchableOpacity>
                                <Text style={[styles.modalTitles, styles.font]}>Card Holders Names</Text>
                                <TextInput
                                    style={[styles.input, styles.font]}
                                    placeholder="Adolphus Chris"
                                    placeholderTextColor="#C4C4C4"
                                />
                                <Text style={[styles.modalTitles, styles.font]}>Card Number</Text>
                                <TextInput
                                    style={[styles.input, styles.font]}
                                    placeholder="1234 5678 9012 1314"
                                    placeholderTextColor="#C4C4C4"
                                    value={phoneNumber}
                                    onChangeText={handleChangeText}
                                />
                                <View style={styles.dateCvv}>
                                    <View style={{flex: 1, marginRight: 100}}>
                                        <Text style={[styles.modalTitles, styles.font]}>Date</Text>
                                        <TextInput
                                            style={[styles.input, styles.font]}
                                            placeholder='10/30'
                                            placeholderTextColor="#C4C4C4"
                                            value={phoneNumber}
                                            onChangeText={handleChangeText}
                                        />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={[styles.modalTitles, styles.font]}>CVV</Text>
                                        <TextInput
                                            style={[styles.input, styles.font]}
                                            placeholder='123'
                                            placeholderTextColor="#C4C4C4"
                                            value={phoneNumber}
                                            onChangeText={handleChangeText}
                                        />
                                    </View>
                                </View>
                                <View style={styles.completeOrder}>
                                    <TouchableOpacity
                                        style={styles.completeOrderButton}
                                        onPress={() => {
                                            setOpenCardModal(false);
                                            router.push('/orderCompleted');
                                        }}
                                    >
                                        <Text style={[styles.completeOrderText, styles.font]}>Complete order</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 40,
    },
    headText: {
        fontSize: 24,
        lineHeight: 32,
    },
    addRemove: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftSide: {
        flexDirection: 'row',
    },
    leftSideText: {
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    salads: {
        width: '100%',
    },
    salad: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: '#F4F4F4',
    },
    saladPrice: {
        fontSize: 16,
        lineHeight: 22.88,
        marginHorizontal: 10
    },
    saladName: {
        fontSize: 16,
        lineHeight: 22.88,
    },
    font: {
        fontFamily: 'CustomFont-Regular'
    },
    mainContainer: {
        backgroundColor: '#FFFFFF',
        height: '100%',
    },
    emptyBasket: {
        marginTop: 300,
        alignSelf: 'center',
        fontSize: 30,
        fontFamily: 'CustomFont-Regular',
    },
    totalContainer: {
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    totalText: {
        fontSize: 24,
        lineHeight: 32
    },
    checkout: {
        backgroundColor: '#FFA451',
        paddingHorizontal: 80,
        paddingVertical: 20,
        borderRadius: 20
    },
    checkoutText: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 24,
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 5,
    },
    closeModal: {
        alignSelf: 'center',
        marginBottom: 20,
        position: 'absolute',
        top: -60,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 30
    },
    closeText: {
        fontSize: 24,
        color: '#000',
    },
    input: {
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    paymentOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    payButton: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#FFA451',
        borderWidth: 1,
    },
    payButtonText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#FFA451',
    },
    modalTitles: {
        fontSize: 20,
        lineHeight: 28.6,
    },
    bgShadow: {
        backgroundColor: 'black',
        opacity: 0.4,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
    },
    dateCvv: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    completeOrder: {
        width: '120%',
        alignSelf: 'center',
        backgroundColor: '#FFA451',
        padding: 25,
        borderRadius: 40,
        marginBottom: -20
    },
    completeOrderButton: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        paddingVertical: 20,
        paddingHorizontal: 35,
        borderRadius: 15
    },
    completeOrderText: {
        color: '#FFA451',
        fontSize: 20,
        lineHeight: 24,
    }
});

export default Basket;
