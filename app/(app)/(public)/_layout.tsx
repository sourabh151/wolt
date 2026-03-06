import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false, contentStyle: { backgroundColor: "#fff" } }} />
      <Stack.Screen name='other_options'
        options={{
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.4, 0.6],
          sheetInitialDetentIndex: 'last'
        }}
      />
    </Stack>
  )
}

export default Layout
