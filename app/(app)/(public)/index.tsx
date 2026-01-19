import ScrollingItems from "@/components/ScrollingItems";
import { woltEmojis } from "@/constants/emoji";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.scrollContainer}>
        {
          woltEmojis.map((v, i) => {
            return <ScrollingItems key={i} emojis={v} row={i} direction={Boolean(i % 2)} />
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

