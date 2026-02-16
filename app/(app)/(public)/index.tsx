import ScrollingItems from "@/components/ScrollingItems";
import { woltEmojis } from "@/constants/emoji";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Easing } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnUI } from "react-native-worklets";

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
      <View style={styles.authContainer} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  scrollContainer: {
    flex: 0.8,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  authContainer: {
    flex: 1,
    backgroundColor: 'blue'
  }
});

