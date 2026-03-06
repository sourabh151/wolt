import { ReactNode } from 'react'
import { View } from 'react-native'

import { useSafeAreaInsets } from "react-native-safe-area-context";
type props = {
  children: ReactNode
}

const SafeAreaComponent = ({ children }: props) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{
      top: insets.top,
      left: insets.left,
      bottom: insets.bottom,
      right: insets.right
    }}>

      {
        children
      }
    </View>
  )
}

export default SafeAreaComponent
