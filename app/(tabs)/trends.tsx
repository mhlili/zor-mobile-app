import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function Trends() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trends</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});