import React, { useEffect, useState } from "react";
import {View, StyleSheet, Image} from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LeftLeafe } from "@/assets/images/splash/LeftLeafe";
import { RightLeafe } from "@/assets/images/splash/RightLeafe";
import { Right } from "@/assets/images/splash/Right";
import { Left } from "@/assets/images/splash/Left";
import { Top } from "@/assets/images/splash/Top";
import {Asset} from "expo-asset";


SplashScreen.preventAutoHideAsync();

const AnimatedSVG = ({ children, style, initialPosition, duration }:any) => {
    const position = useSharedValue(initialPosition);

    useEffect(() => {
        position.value = withTiming(0, { duration });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};


const AnimatedImage = ({ children, style, initialPosition, duration }:any) => {
    const position = useSharedValue(initialPosition);

    useEffect(() => {
        position.value = withTiming(0, { duration });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
    }));

    return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};


const Splash = () => {
    const router = useRouter();
    const [isSplashVisible, setSplashVisible] = useState(true);
    const [loadedImages, setLoadedImages] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loadedImages) {
                setSplashVisible(false);
                SplashScreen.hideAsync();
                router.push("/welcome");
            }
        }, 4000);

        const preloadImages = async () => {
            const imageSources = [
                require('../assets/images/fruits/bgFruits.png'),
                require('../assets/images/fruits/smallFruit.png'),
                require('../assets/images/fruits/firstFruitBasket.png'),
                require('../assets/images/fruits/secondFruitBasket.png'),
                require('../assets/images/fruits/firstImageShadow.png'),
                require('../assets/images/salads/HoneyLime.png'),
                require('../assets/images/salads/BerryMangoCombo.png'),
                require('../assets/images/salads/BreakfastQuinoa.png'),
                require('../assets/images/salads/BestEverTropical.png'),
                require('../assets/images/salads/BerryWorldKiwiberry.png'),
                require('../assets/images/salads/StrawberryBurrataSalad.jpg'),
                require('../assets/images/salads/StoneFruitSalad.jpg'),
                require('../assets/images/salads/SmashedSummerSalad.jpg'),
                require('../assets/images/salads/RspberryAndMandarine.jpg'),
                require('../assets/images/salads/PeachProscuittoCaprese.jpg'),
                require('../assets/images/salads/MissionFig.jpg'),
                require('../assets/images/salads/CrunchyMangoandAvocadoSalad.jpg'),
            ];

            const imagePromises = imageSources.map(image => {
                return Asset.fromModule(image).downloadAsync();
            });

            await Promise.all(imagePromises);
            setLoadedImages(true);
        };

        preloadImages();

        return () => clearTimeout(timer);
    }, [loadedImages]);


    if (isSplashVisible) {
        return (
            <View style={styles.splashContainer}>
                <AnimatedSVG initialPosition={-300} duration={2000} style={styles.left}>
                    <Left />
                </AnimatedSVG>
                <AnimatedSVG initialPosition={300} duration={2000} style={styles.right}>
                    <Right />
                </AnimatedSVG>
                <AnimatedSVG initialPosition={-300} duration={2500} style={styles.leftLeafe}>
                    <LeftLeafe />
                </AnimatedSVG>
                <AnimatedSVG initialPosition={300} duration={2500} style={styles.rightLeafe}>
                    <RightLeafe />
                </AnimatedSVG>
                <AnimatedSVG initialPosition={-500} duration={3000} style={styles.top}>
                    <Top />
                </AnimatedSVG>
                <AnimatedImage initialPosition={500} duration={3000} style={styles.logo}>
                    <Image source={require('../assets/images/splash/logo.png')} />
                </AnimatedImage>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    left: {
        position: "absolute",
        left: '40%',
        top: '40%'
    },
    right: {
        position: "absolute",
        right: '33%',
        top: '38%'
    },
    leftLeafe: {
        position: "absolute",
        left: '41%',
        top: '30%',
    },
    rightLeafe: {
        position: "absolute",
        right: '44%',
        top: '31.7%',
    },
    top: {
        position: "absolute",
        top: '35%',
    },
    logo: {
        position: 'absolute',
        top: '40%'
    }
});

export default Splash;
