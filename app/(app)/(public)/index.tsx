import ScrollingItems from "@/components/ScrollingItems";
import { woltEmojis } from "@/constants/emoji";
import { Colors, Fonts } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnUI } from "react-native-worklets";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

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
    <View
      style={styles.container}
    >
      <View style={styles.scrollContainer} ref={containerRef}>
        {
          woltEmojis.map((v, i) => {
            return <ScrollingItems key={i} emojis={v} row={i} direction={Boolean(i % 2)} height={height} scrolls={scrolls} />
          })
        }
      </View>
      <View style={styles.authContainer} >
        <Image source={require('@/assets/images/wolt-logo.png')} style={styles.logo} />
        <Text style={styles.slogan}>Almost Everything Delivered</Text>
        <TouchableOpacity style={[styles.button, styles.apple]} >
          <MaterialIcons name="apple" style={styles.buttonLogo} />
          <Text style={styles.buttonText}>Sign In With Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.google]} >
          <FontAwesome name="google" style={styles.buttonLogo} />
          <Text style={styles.buttonText}>Sign In With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.other]} >
          <MaterialIcons name="person" style={styles.buttonLogo} />
          <Text style={styles.buttonText}>Other Options</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>
          Please visit{' '}
          <Text style={styles.privacyLink} onPress={handlePrivacyStatementPress}>
            Wolt Privacy Statement
          </Text>{' '}
          to learn about personal data processing at wolt
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 0.8,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    width: 'auto'
  },
  logo: {
    objectFit: "contain",
    width: 100,
    height: 100,
  },
  slogan: {
    fontFamily: Fonts.brandBlack,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    paddingBlock: 10,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    paddingInline: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonLogo: {
    fontSize: 18,
    marginRight: 10,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.brand,
    color: 'white'
  },
  apple: {
    backgroundColor: Colors.dark
  },
  google: {
    backgroundColor: Colors.secondary
  },
  other: {
    backgroundColor: Colors.muted
  },
  footer: {
    color: Colors.light,
    textAlign: 'center'
  },
  privacyLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  }

});

