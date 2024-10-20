import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, Image, Dimensions, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Image1 from "../images/image1.png"
import Image2 from "../images/image2.png"
import Image3 from "../images/image3.png"
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

const data = [
    {
        id: 1,
        img: Image1,
        title: "Welcome to Protectify",
        desc: "Discover a smarter way to connect and manage visitors with our all-in-one visitor management system. Simple, secure, and efficient."
    },
    {
        id: 2,
        img: Image2,
        title: "Seamless Visitor Access",
        desc: "Instantly grant or deny visitor access with just one tap. Keep your facility secure and organized without any hassle."
    },
    {
        id: 3,
        img: Image3,
        title: "Real-Time Notifications",
        desc: "Stay informed with real-time updates on visitor arrivals. Get notified instantly and manage visitors from anywhere."
    }
]

const Slide = ({ item }) => {
    return (
        <View style={{ alignItems: "center", maxWidth: width }}>
            <Image source={item.img} style={{ height: "75%", width, resizeMode: "contain" }} />
            <View style={{ display: "flex", padding: 20, gap: 30, marginTop: 30 }}>
                <Text style={{ color: "white", fontSize: 25, fontWeight: "800", fontFamily: "lucida grande" }}>{item.title}</Text>
                <Text style={{ color: "#7C7B7E", fontSize: 18, fontWeight: "600", fontFamily: "lucida grande", lineHeight: 25 }}>{item.desc}</Text>
            </View>
        </View>
    )
}

const Footer = ({ currentSlideIndex, goToSlide,setOnboarded }) => {
    const getStarted =async ()=>{
        await AsyncStorage.setItem("ONBOARDED",JSON.stringify(true))
        setOnboarded(true)
    }
    return (
        <>
        <View style={styles.footerContainer}>
            <View style={styles.dotsContainer}>
                {data.map((_, index) => {
                    return <Pressable key={index} onPress={() => goToSlide(index)}>
                        <View style={[styles.footerDot, currentSlideIndex == index && {
                            backgroundColor: "white"
                        }]} />
                    </Pressable>
                })}
            </View>
            </View>

            {currentSlideIndex == data.length - 1 ? (
                <View style={styles.getStartedButtonContainer}>
                    <TouchableOpacity onPress={getStarted}>
                        <Text style={styles.getStartedButtonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </>
    )
}

export default function OnboardingScreen({setOnboarded}) {
    const [currentSlideIndex, setcurrentSlideIndex] = useState(0)
    const ref = useRef(null)

    const calculateOffset = e => {
        const index = (Math.round(e.nativeEvent.contentOffset.x / width))
        setcurrentSlideIndex(index)
    }
    const goToSlide = (index) => {
        const offset = index * width;
        ref?.current?.scrollToOffset({ offset })
        setcurrentSlideIndex(index)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#00001E" }}>
            <FlatList
                ref={ref}
                onMomentumScrollEnd={calculateOffset}
                data={data}
                renderItem={({ item }) => <Slide item={item} />}
                contentContainerStyle={{ height: height * 0.75 }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            />
            <Footer currentSlideIndex={currentSlideIndex} goToSlide={goToSlide} setOnboarded={setOnboarded} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
    },
    footerDot: {
        width: 8,
        height: 8,
        borderRadius: 50,
        backgroundColor: "gray"
    },
    getStartedButtonContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:8,
        height: 50,
        width: "80%",
        alignSelf: "center",
        marginTop: 20,
        marginBottom:20 // Add some space between the button and dots
    },
    getStartedButtonText: {
        color: "black",
        fontWeight:"600",
        fontSize: 16,
    }
});
