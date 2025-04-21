import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary' | 'secondary';
  onPress: () => void;
};

export default function Button({ label, theme, onPress}: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer
        ]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#C080DE' : '#890FC1', // darker when pressed
            },
          ]}
          onPress={onPress}
          > 
          <Text style={[styles.buttonLabel, {fontWeight: 'bold', color: '#FFFFFF' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  if (theme === 'secondary') {
    return (
      <View
          style={[
            styles.buttonHigherContainer
          ]}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? '#C080DE' : '#890FC1', // darker when pressed
              },
            ]}
            onPress={onPress}
            > 
            <Text style={[styles.buttonLabel, {fontWeight: 'bold', color: '#FFFFFF' }]}>{label}</Text>
          </Pressable>
        </View>
  
  );}
  return (
    <View
          style={[
            styles.buttonContainer
          ]}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? '#C080DE' : '#890FC1', // darker when pressed
              },
            ]}
            onPress={onPress}
            > 
            <Text style={[styles.buttonLabel, {fontWeight: 'bold', color: '#FFFFFF' }]}>{label}</Text>
          </Pressable>
        </View>
  
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 40, // Or use useSafeAreaInsets().bottom + some padding if needed
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    width: "100%", // Fill the padded container
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
  },
  buttonHigherContainer: {
    position: 'absolute',
    bottom: 100, // Or use useSafeAreaInsets().bottom + some padding if needed
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  }
});
