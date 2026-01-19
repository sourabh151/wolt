import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Nunito_900Black, Nunito_700Bold } from '@expo-google-fonts/nunito';


const queryClient = new QueryClient();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_900Black,
    Nunito_700Bold,
  })
  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
} 
