import SafeAreaComponent from '@/components/SafeAreaComponent';
import { Colors, Fonts } from '@/constants/theme';
import useUserStore from '@/hooks/use-userstore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const index = () => {
  const setIsGuest = useUserStore((s) => s.setIsGuest)
  const isGuest = useUserStore((s) => s.isGuest)
  return (
    <SafeAreaComponent>
      <TouchableOpacity style={[styles.button, styles.guest]}
        onPress={() => {
          setIsGuest(false);
          console.log(isGuest);

        }}
      >
        <MaterialCommunityIcons name="arrow-left" style={styles.buttonLogo} />
        <Text style={styles.buttonText}>Go back To Login Page</Text>
      </TouchableOpacity>
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

export default index
