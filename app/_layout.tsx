import { Stack } from "expo-router";

const RootLayout = () => {
  return (
      <Stack initialRouteName="splash" screenOptions={{headerShown: false}} >
          <Stack.Screen name="splash" />
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="authentication" />
          <Stack.Screen name="home" />
          <Stack.Screen name="aboutSalad" />
          <Stack.Screen name="basket" />
          <Stack.Screen name="orderCompleted" />
          <Stack.Screen name="trackOrder" />
      </Stack>
  );
}

export default RootLayout;