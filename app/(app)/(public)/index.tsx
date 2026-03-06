import ScrollingItems from "@/components/ScrollingItems";
import { woltEmojis } from "@/constants/emoji";
import { Colors, Fonts } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnUI } from "react-native-worklets";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from "expo-router";
import SafeAreaComponent from "@/components/SafeAreaComponent";

export default function Index() {
  const containerRef = useRef<View>(null)
  const [height, setHeight] = useState(0)
  const scrolls = useSharedValue(0)
  const duration = 5000;
  const scrollInfinitely = () => {
    "worklet";
    if (Math.round(scrolls.value) === 0) {
      scrolls.value = withTiming(1, { duration: duration })
    }
    else {
      scrolls.value = withTiming(0, { duration: duration })
    }
  }
  useEffect(() => {
    containerRef.current?.measure((x, y, w, h) => {
      setHeight(h)
    })
    const intervalID = setInterval(() => {
      scheduleOnUI(scrollInfinitely)
    }, duration);
    return () => {
      clearInterval(intervalID)
    }
  }, [])

  const handlePrivacyStatementPress = async () => {
    const url = 'https://www.wolt.com/privacy'; // Dummy link
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaComponent>
      <View
        style={styles.container}
      >
        <View style={styles.scrollContainer} ref={containerRef}>
          {
            woltEmojis.map((v, i) => {
              return <ScrollingItems key={i} emojis={v} row={i} direction={Boolean(i % 2)} height={height} scrolls={scrolls} />
            })
          }
          <LinearGradient style={styles.blur} colors={['#ffffff00', '#ffffffcc']} />
        </View>
        <ScrollView contentContainerStyle={styles.authContainer} bounces={false} showsVerticalScrollIndicator={false}>
          <Image source={require('@/assets/images/wolt-logo.png')} style={styles.logo} />
          <Text style={styles.slogan}>Almost Everything Delivered</Text>
          <TouchableOpacity style={[styles.button, styles.apple]} >
            <MaterialIcons name="apple" style={[styles.buttonLogo, { color: 'white' }]} />
            <Text style={[styles.buttonText, { color: 'white' }]}>Sign In With Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.google]} >
            <FontAwesome name="google" style={styles.buttonLogo} />
            <Text style={styles.buttonText}>Sign In With Google</Text>
          </TouchableOpacity>
          <Link href="/(app)/(public)/other_options" asChild style={styles.link}>
            <TouchableOpacity style={[styles.button, styles.other]} >
              <MaterialIcons name="person" style={styles.buttonLogo} />
              <Text style={styles.buttonText}>Other Options</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.footer}>
            Please visit{' '}
            <Text style={styles.privacyLink} onPress={handlePrivacyStatementPress}>
              Wolt Privacy Statement
            </Text>{' '}
            to learn about personal data processing at wolt
          </Text>
        </ScrollView>
      </View>
    </SafeAreaComponent>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    height: '45%',
    flexDirection: 'row',
  },
  authContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'stretch',
  },
  logo: {
    objectFit: "contain",
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  slogan: {
    fontFamily: Fonts.brandBlack,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  },
  buttonLogo: {
    fontSize: 18,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.brand,
  },
  apple: {
    backgroundColor: Colors.dark,
    color: 'white'
  },
  google: {
    backgroundColor: Colors.secondary
  },
  other: {
    backgroundColor: Colors.dark,
  },
  footer: {
    color: Colors.light,
    textAlign: 'center'
  },
  privacyLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  blur: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200
  },
  link: {
    borderRadius: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  }

});

