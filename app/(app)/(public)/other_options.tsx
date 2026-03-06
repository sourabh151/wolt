import SafeAreaComponent from '@/components/SafeAreaComponent'
import { Colors, Fonts } from '@/constants/theme'
import useUserStore from '@/hooks/use-userstore'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const other_options = () => {
  const router = useRouter()
  const setIsGuest = useUserStore((s) => s.setIsGuest)
  const isGuest = useUserStore((s) => s.isGuest)
  return (
    <SafeAreaComponent>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.dismiss()} style={styles.dismiss} >
          <MaterialCommunityIcons name='triangle-down' size={18} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }}>other options</Text>
        <TouchableOpacity style={[styles.button, styles.guest]}
          onPress={() => {
            setIsGuest(true);
            console.log(isGuest);
          }}
        >
          <MaterialCommunityIcons name="human-male" style={styles.buttonLogo} />
          <Text style={styles.buttonText}>Login As Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  dismiss: {
    padding: 10,
    backgroundColor: Colors.muted,
    borderRadius: 100,
    alignSelf: 'flex-end',
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
  guest: {
    backgroundColor: Colors.secondary
  },
});

export default other_options
