import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* This applies to all screens in the onboarding folder */}
    </Stack>
  );
}
