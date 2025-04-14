import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/components/useColorScheme';


//AsyncStorage.removeItem('@completedOnboarding');
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  
  // Explicit type for useState, `boolean | null` ensures we handle the loading state properly.
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingState = await AsyncStorage.getItem('@completedOnboarding');
        console.log('Onboarding status:', onboardingState); // Debugging
        setIsOnboardingCompleted(onboardingState === 'true'); // Ensure boolean conversion
      } catch (error) {
        console.error('Error fetching onboarding status:', error);
        setIsOnboardingCompleted(false); // Default to false if an error occurs
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Wait until the fonts are loaded and onboarding status is checked
  if (!loaded || isOnboardingCompleted === null) {
    return null; // Show loading screen until check is done
  }

  return <RootLayoutNav isOnboardingCompleted={isOnboardingCompleted} />;
}

function RootLayoutNav({ isOnboardingCompleted }: { isOnboardingCompleted: boolean }) {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {!isOnboardingCompleted ? (
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="fullCalendar" options={{ headerShown: false }} />
        <Stack.Screen
          name="log-data-screens/logSeizure"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="log-data-screens/dailySurvey"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}

