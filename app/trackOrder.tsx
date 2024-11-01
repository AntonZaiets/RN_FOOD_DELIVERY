import React, {useEffect} from 'react'
import {View, StyleSheet, SafeAreaView, Text, ImageBackground} from "react-native";
import {GoBackBtn} from "@/components/GoBackBtn";
import MapView, {Marker} from "react-native-maps";
import {OrderTakenSvg} from "@/assets/images/Svg/orerTaken";
import {OrderIsBeingPreparedSvg} from "@/assets/images/Svg/orderIsBeingPrepared";
import {OrderIsBeingDeliveredSvg} from "@/assets/images/Svg/orderIsBeingDelivered";
import {SmallCheckSvg} from "@/assets/images/Svg/smallCheck";
import {BigCheckSvg} from "@/assets/images/Svg/bigCheck";
import {PhoneRingSvg} from "@/assets/images/Svg/phoneRing";
import {ThreeDotsSvg} from "@/assets/images/Svg/threeDots";
import {loadFonts} from "@/assets/fonts/CustomFonts";

const TrackOrder = () => {

    useEffect(() => {
        loadFonts().then(() => console.log('Font Loaded'));
    }, []);


    return(
        <>
            <View style={styles.mainContainer}>
                <ImageBackground
                    source={require('../assets/images/fruits/bgFruits.png')}
                    resizeMode='cover'
                >
                    <SafeAreaView style={styles.topContainer}>
                        <GoBackBtn />
                        <Text style={[styles.headText, { fontFamily: 'CustomFont-Regular' }]}>Delivery Status</Text>
                        <View />
                        <View />
                        <View />
                        <View />
                    </SafeAreaView>
                </ImageBackground>
                <View style={styles.botContainer}>
                    <View style={styles.line}/>
                    <View style={styles.smallContainer}>
                        <View style={styles.leftSideContainer}>
                            <View style={[styles.iconBg, {backgroundColor: '#FFFAEB'}]}>
                                <OrderTakenSvg />
                            </View>
                            <Text style={[styles.titles, styles.font]}>Order Taken</Text>
                        </View>
                        <SmallCheckSvg />
                    </View>
                    <View style={styles.smallContainer}>
                        <View style={styles.leftSideContainer}>
                            <View style={[styles.iconBg, {backgroundColor: '#F1EFF6'}]}>
                                <OrderIsBeingPreparedSvg />
                            </View>
                            <Text style={[styles.titles, styles.font]}>Order Is Being Prepared</Text>
                        </View>
                        <SmallCheckSvg />
                    </View>
                    <View style={styles.smallContainer}>
                        <View style={styles.leftSideContainer}>
                            <View style={[styles.iconBg, {backgroundColor: '#FEF0F0'}]}>
                                <OrderIsBeingDeliveredSvg />
                            </View>
                            <View style={styles.deliveryTextContainer}>
                                <Text style={[styles.titles, styles.font]}>Order Is Being Delivered</Text>
                                <Text style={[styles.description, styles.fontLight]}>Your delivery agent is coming</Text>
                            </View>
                        </View>
                        <PhoneRingSvg />
                    </View>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            title="Marker Title"
                            description="Marker Description"
                        />
                    </MapView>
                    <View style={styles.smallContainer}>
                        <View style={styles.leftSideContainer}>
                            <View style={[styles.iconBg, {backgroundColor: '#F0FEF8'}]}>
                                <BigCheckSvg />
                            </View>
                            <Text style={[styles.titles, styles.font]}>Order Is Being Prepared</Text>
                        </View>
                        <ThreeDotsSvg />
                    </View>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
   mainContainer: {

   },
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
    map: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginBottom: 50,
    },
    smallContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginBottom: 50,
    },
    botContainer: {
       paddingHorizontal: 20,
       paddingTop: 30,
       height: '100%',
       backgroundColor: '#FFFFFF',
    },
    iconBg: {
       alignItems: 'center',
       justifyContent: 'center',
       width: 60,
       height: 60,
       borderRadius: 10,
        marginRight: 20,
    },
    deliveryTextContainer: {

    },
    leftSideContainer: {
       flexDirection: 'row',
       alignItems: 'center',
    },
    font: {
       fontFamily: 'CustomFont-Regular'
    },

    fontLight: {
       fontFamily: 'CustomFont-Light'
    },
    titles: {
       fontSize: 16,
       lineHeight: 22.88,
    },
    description: {
       fontSize: 14,
        lineHeight: 20.02,
    },
    line: {
       position: 'absolute',
       height: '60%',
       borderStyle: 'dotted',
       borderWidth: 2,
       borderColor: '#FFA451',
       left: 50,
       top: 50,
    }


});

export default TrackOrder;