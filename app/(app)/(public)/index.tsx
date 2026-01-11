import { Nunito_900Black, useFonts } from '@expo-google-fonts/nunito';
import { Text, View } from "react-native";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Nunito_900Black
  })
  if (!fontsLoaded) {
    return <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>fonts not loaded</Text>
    </View>
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: "Nunito_900Black" }}>Hello sourabh</Text>
    </View>
  );
}
