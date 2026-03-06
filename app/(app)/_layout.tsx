import useUserStore from '@/hooks/use-userstore'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native';

const RootLayoutNav = () => {
  const isGuest = useUserStore((s) => s.isGuest)
  return (
    <Stack>
      <Stack.Protected guard={isGuest}>
        <Stack.Screen name='(auth)/' options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isGuest}>
        <Stack.Screen name='(public)/' options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}

export default RootLayoutNav
