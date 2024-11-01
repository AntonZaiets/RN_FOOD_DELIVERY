import React, {useEffect} from "react";
import {SuccessSvg} from "@/assets/images/Svg/success";
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {loadFonts} from "@/assets/fonts/CustomFonts";
import {router} from "expo-router";

const OrderCompleted = () => {


    useEffect(() => {
        loadFonts().then(() => console.log('Font Loaded'));
    }, []);


    return(
        <>
            <View style={styles.mainContainer}>
                <SuccessSvg />
                <Text style={[styles.congratulationsText, styles.font]}>Congratulations!!!</Text>
                <Text style={[styles.descriptionText, styles.font]}>Your order have been taken and{`\n`}is being attended to</Text>
                <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() => {router.push('/trackOrder')}}
                >
                    <Text style={[styles.trackText, styles.font]}>Track order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => {router.push('/home')}}
                >
                    <Text style={[styles.continueText, styles.font]}>Continue shopping</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    congratulationsText: {
        fontSize: 32,
        lineHeight: 36,
        marginTop: 50,
    },
    descriptionText: {
      fontSize: 20,
      lineHeight: 30,
      textAlign:  'center',
        marginTop: 20,
    },
    font: {
        fontFamily: 'CustomFont-Regular'
    },
    trackButton: {
        backgroundColor: '#FFA451',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 40,
    },
    trackText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    continueButton: {
        borderWidth: 1,
        borderColor: '#FFA451',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 60,
    },
    continueText: {
        color: '#FFA451',
        fontSize: 20,
    },
})


export default OrderCompleted;