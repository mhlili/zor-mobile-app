import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  const [sliderOne, setSliderOne] = useState(0);
  const [sliderTwo, setSliderTwo] = useState(0);
  const [sliderThree, setSliderThree] = useState(0);
  const [sliderFour, setSliderFour] = useState(0);

  const [selectedValue, setSelectedValue] = useState("select");
  const [inputText, setInputText] = useState("")

  const seizureOptions = [
    { key: 'focal', label: 'Focal Seizure' },
    { key: 'generalized', label: 'Generalized Seizure' },
    { key: 'absence', label: 'Absence Seizure' },
    { key: 'tonic_clonic', label: 'Tonic-Clonic Seizure' }
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
    <ScrollView 
      style={styles.scrollContainer} 
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
    >

      <Text style={styles.title}>Seizure Log</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* SLIDER 1 */}
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Stress Level: {sliderOne}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sliderOne}
          onValueChange={setSliderOne}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1E90FF"
        />
      </View>

      {/* SLIDER 2 */}
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Awareness Level: {sliderTwo}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sliderTwo}
          onValueChange={setSliderTwo}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1E90FF"
        />
      </View>

      {/* SLIDER 3 */}
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Muscle Stiffness: {sliderThree}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sliderThree}
          onValueChange={setSliderThree}
          minimumTrackTintColor="#32CD32"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1E90FF"
        />
      </View>
      {/* SLIDER 4 */}
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Sleep Level: {sliderFour}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sliderFour}
          onValueChange={setSliderFour}
          minimumTrackTintColor="#32CD32"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1E90FF"
        />
      </View>

      {/* DROPDOWN SELECT */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Seizure Type:</Text>
        <ModalSelector
          data={seizureOptions}
          initValue={selectedValue}
          onChange={(option) => setSelectedValue(option.label)}
          style={styles.pickerWrapper}
        >
          <TouchableOpacity style={styles.modalPickerButton}>
            <Text style={styles.modalPickerText}>{selectedValue}</Text>
          </TouchableOpacity>
        </ModalSelector>
      </View>

      {/* TEXT INPUT FIELD (NOW AT THE BOTTOM) */}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter any notes..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
      </View>
      <View style={{ height: 300 }}></View>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20, // Adds space at the top and bottom
    paddingBottom: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  sliderContainer: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 10, // Adds spacing between sliders
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  slider: {
    width: 300,
    height: 40,
  },
  dropdownContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  pickerWrapper: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  modalPickerButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: '100%',
    alignItems: "center",
  },
  modalPickerText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    width: '80%',
    marginTop: 30, // Spacing from dropdown
    marginBottom: 20, // Extra spacing at bottom
  },
  input: {
    width: '100%',
    height: 100, // Allows multiline input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Makes multiline input start at the top
  },
});
