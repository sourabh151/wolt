import { Stack } from 'expo-router'
import React from 'react'

const RootLayoutNav = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false, contentStyle: { backgroundColor: "#fff" } }} />
        </Stack>
    )
}

export default RootLayoutNav