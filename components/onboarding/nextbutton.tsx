import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
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
          style={[styles.button, { backgroundColor: '#CBCBCB' }]}
          onPress={onPress}> 
          <Text style={[styles.buttonLabel, { color: '#000000' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    //position: 'absolute',
    width: 320,
    height: 50,
    //bottom: 40,
    alignSelf: "center",
    //marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
  },
});
