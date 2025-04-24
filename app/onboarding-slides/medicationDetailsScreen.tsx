import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign, Feather, MaterialIcons, Ionicons } from "@expo/vector-icons"; // Icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding7({ onNext}: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

  // State for selected medications
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  
  // State for medication details with multiple doses
  const [medicationDetails, setMedicationDetails] = useState<{
    [key: string]: {
      doses: Array<{
        amount: string,
        unit: string,
        recurrence: string,
        time: string,
        reminderSet: boolean,
        daysOfWeek: string[]
      }>
    }
  }>({});

  // Modal states
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
  const [currentMedication, setCurrentMedication] = useState('');
  const [currentDoseIndex, setCurrentDoseIndex] = useState(0);

  // Recurrence state
  const [repeatFrequency, setRepeatFrequency] = useState(1);
  const [repeatInterval, setRepeatInterval] = useState('Week');
  const [selectedDays, setSelectedDays] = useState(['Mo', 'Tu', 'We', 'Fr']);
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [isTakingCurrently, setIsTakingCurrently] = useState(true);

  // Fetch selected medications from AsyncStorage
  useEffect(() => {
    const fetchMedications = async () => {
      const data = await AsyncStorage.getItem("medications");
      if (data) {
        const medications = JSON.parse(data);
        setSelectedMedications(medications);
        
        // Initialize medication details with default values
        const details: {[key: string]: any} = {};
        medications.forEach((medication: string) => {
          if (medication) {  // Check if medication is defined
            details[medication] = {
              doses: [
                {
                  amount: '800',
                  unit: 'mg',
                  recurrence: 'Weekly on Mo, Tu, We, Fr at 9:00 A.M.',
                  time: '9:00 A.M.',
                  reminderSet: true,
                  daysOfWeek: ['Mo', 'Tu', 'We', 'Fr']
                },
                {
                  amount: '400',
                  unit: 'mg',
                  recurrence: 'Weekly on Mo, Tu, We, Fr at 8:00 P.M.',
                  time: '8:00 P.M.',
                  reminderSet: true,
                  daysOfWeek: ['Mo', 'Tu', 'We', 'Fr']
                }
              ]
            };
          }
        });
        setMedicationDetails(details);
      }
    };
    fetchMedications();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleContinue = () => {
    console.log("Medication Details:", medicationDetails);
    router.push("/onboarding-slides/metricsScreen");
  };

  const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/metricsScreen");
  };

  const openOptionsMenu = (medication: string) => {
    setCurrentMedication(medication);
    setShowOptionsModal(true);
  };

  const closeOptionsMenu = () => {
    setShowOptionsModal(false);
  };

  const deleteMedication = () => {
    setSelectedMedications(prev => prev.filter(med => med !== currentMedication));
    const newDetails = {...medicationDetails};
    delete newDetails[currentMedication];
    setMedicationDetails(newDetails);
    closeOptionsMenu();
  };

  const [showDoseOptionsModal, setShowDoseOptionsModal] = useState(false);
  const [currentDoseToDelete, setCurrentDoseToDelete] = useState<{
    medication: string;
    index: number;
  } | null>(null);


  const openRecurrenceModal = (medication: string, doseIndex: number) => {
    setCurrentMedication(medication);
    setCurrentDoseIndex(doseIndex);
    
    // Set current values for the recurrence modal
    const dose = medicationDetails[medication].doses[doseIndex];
    setSelectedDays(dose.daysOfWeek);
    
    // Parse time values
    const timeParts = dose.time.split(' ');
    const timeValue = timeParts[0].split(':');
    setSelectedHour(timeValue[0]);
    setSelectedMinute(timeValue[1]);
    setSelectedAmPm(timeParts[1]);
    
    setShowRecurrenceModal(true);
  };

  const closeRecurrenceModal = (save: boolean) => {
    console.log('Closing recurrence modal, save:', save);
    
    if (save && currentMedication && medicationDetails[currentMedication]) {
      // Make sure we have valid data before saving
      const updatedDetails = {...medicationDetails};
      const time = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;
      const recurrence = `${repeatInterval}ly on ${selectedDays.join(', ')} at ${time}`;

      
      // Check if the medication and dose index exist before updating
      if (updatedDetails[currentMedication]?.doses?.[currentDoseIndex]) {
        updatedDetails[currentMedication].doses[currentDoseIndex] = {
          ...updatedDetails[currentMedication].doses[currentDoseIndex],
          recurrence,
          time,
          daysOfWeek: selectedDays
        };
        
        setMedicationDetails(updatedDetails);
      }
    }
    
    // Always hide the modal when this function is called
    setShowRecurrenceModal(false);
  };

  const addAnotherDose = (medication: string) => {
    const updatedDetails = {...medicationDetails};
    updatedDetails[medication].doses.push({
      amount: '',
      unit: 'mg',
      recurrence: 'Weekly on Mo, Tu, We, Fr at 12:00 P.M.',
      time: '12:00 P.M.',
      reminderSet: true,
      daysOfWeek: ['Mo', 'Tu', 'We', 'Fr']
    });
    setMedicationDetails(updatedDetails);
  };

  const updateDoseAmount = (medication: string, doseIndex: number, amount: string) => {
    const updatedDetails = {...medicationDetails};
    updatedDetails[medication].doses[doseIndex] = {
      ...updatedDetails[medication].doses[doseIndex],
      amount
    };
    setMedicationDetails(updatedDetails);
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const renderDayButton = (day: string, label: string) => (
    <TouchableOpacity 
      style={[
        styles.dayButton, 
        selectedDays.includes(day) ? styles.selectedDayButton : null
      ]}
      onPress={() => toggleDay(day)}
    >
      <Text style={[
        styles.dayButtonText,
        selectedDays.includes(day) ? styles.selectedDayButtonText : null
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
        <ProgressBar activeIndex={5} totalDots={10} />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.navContainer}>
          {/* Back arrow button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          
          {/* Skip button */}
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Add later</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Medication Details</Text>
        
        {/* List of Selected Medications */}
        <FlatList
          data={selectedMedications}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.medicationContainer}>
              <View style={styles.medicationHeader}>
                <Text style={styles.medicationName}>{item}</Text>
                <TouchableOpacity onPress={() => openOptionsMenu(item)}>
                  <MaterialIcons name="more-horiz" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {medicationDetails[item]?.doses.map((dose, index) => (
                <View key={`${item}-dose-${index}`} style={styles.doseContainer}>
                  <View style={styles.doseTitleContainer}>
                  <TouchableOpacity
                      onPress={() => {
                        setCurrentDoseToDelete({ medication: item, index });
                        setShowDoseOptionsModal(true);
                      }}
                    >
                      <MaterialIcons name="more-horiz" size={24} color="white" />
                    </TouchableOpacity>
                  <Text style={styles.doseTitle}>Dose {index + 1}</Text>
                    
                  </View>
                  
                  {/* Dose amount input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.doseInput}
                      value={dose.amount}
                      onChangeText={(text) => updateDoseAmount(item, index, text)}
                      keyboardType="numeric"
                    />
                    <Text style={styles.unitText}>{dose.unit}</Text>
                  </View>

                  {/* Recurrence section */}
                  <View style={styles.recurrenceContainer}>
                    <Text style={styles.recurrenceLabel}>Recurrence</Text>
                    <View style={styles.reminderSetContainer}>
                      <Feather name="clock" size={16} color="#BE40F8" />
                      <Text style={styles.reminderSetText}>Reminder set</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.recurrenceButton}
                    onPress={() => openRecurrenceModal(item, index)}
                  >
                    <Text style={styles.recurrenceButtonText}>{dose.recurrence}</Text>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>

                  {/* Divider line */}
                  {index < medicationDetails[item]?.doses.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}

              {/* Add another dose button */}
              <TouchableOpacity 
                style={styles.addDoseButton}
                onPress={() => addAnotherDose(item)}
              >
                <Text style={styles.addDoseButtonText}>Add another dose</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Continue Button */}
      <Button theme="primary" label="Continue" onPress={handleContinue} />

      {/* Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOptionsModal}
        onRequestClose={closeOptionsMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeOptionsMenu}
        >
          <View style={styles.optionsModalContainer}>
            <View style={styles.optionsModalHeader}>
              <Text style={styles.optionsModalTitle}>Options</Text>
              <TouchableOpacity onPress={closeOptionsMenu}>
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.deleteOption}
              onPress={deleteMedication}
            >
              <Ionicons name="trash-outline" size={24} color="red" />
              <Text style={styles.deleteOptionText}>Delete medication</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      
      {/* Delete Dosage Modal */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={showDoseOptionsModal}
      onRequestClose={() => setShowDoseOptionsModal(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowDoseOptionsModal(false)}
      >
        <View style={styles.optionsModalContainer}>
        <View style={styles.optionsModalHeader}>
          <Text style={styles.optionsModalTitle}>Dose Options</Text>
          <TouchableOpacity onPress={() => setShowDoseOptionsModal(false)}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteOption}
          onPress={() => {
            if (currentDoseToDelete) {
              const { medication, index } = currentDoseToDelete;
              const updatedDetails = { ...medicationDetails };
              updatedDetails[medication].doses.splice(index, 1); // delete dose
              setMedicationDetails(updatedDetails);
            }
            setShowDoseOptionsModal(false);
          }}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
          <Text style={styles.deleteOptionText}>Delete dose </Text>
        </TouchableOpacity>
            </View>
          </TouchableOpacity>
      </Modal>


      {/* Recurrence Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRecurrenceModal}
        onRequestClose={() => closeRecurrenceModal(false)}
      >
        <View style={styles.recurrenceModalContainer}>
          <View style={styles.recurrenceModalHeader}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => {
                console.log('Cancel button pressed');
                closeRecurrenceModal(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            
            <Text style={styles.recurrenceModalTitle}>Custom recurrence</Text>
            
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => {
                console.log('Done button pressed');
                closeRecurrenceModal(true);
              }}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recurrenceModalContent}>
            <View style={styles.repeatEveryContainer}>
              <Text style={styles.repeatEveryText}>Repeat every</Text>
              
              <View style={styles.repeatFrequencyContainer}>
                <View style={styles.repeatFrequencyInput}>
                <TextInput
                    value={String(repeatFrequency)}
                    onChangeText={(text) => setRepeatFrequency(Number(text))}
                    keyboardType="numeric"
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      textAlign: 'center',
                      backgroundColor: '#333',
                      borderRadius: 10,
                      width: 50,
                      height: 45,
                    }}
                  />
                </View>
                
                <View style={styles.repeatIntervalContainer}>
                <TouchableOpacity
                  style={styles.repeatIntervalContainer}
                  onPress={() => {
                    const options = ['Day', 'Week', 'Month'];
                    const currentIndex = options.indexOf(repeatInterval);
                    const nextIndex = (currentIndex + 1) % options.length;
                    setRepeatInterval(options[nextIndex]);
                  }}
                >
                  <Text style={styles.repeatIntervalText}>{repeatInterval}</Text>
                  <AntDesign name="down" size={16} color="#EAEAEA" />
                </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.repeatOnText}>Repeat on</Text>
            
            <View style={styles.daysContainer}>
              {renderDayButton('Su', 'Su')}
              {renderDayButton('Mo', 'Mo')}
              {renderDayButton('Tu', 'Tu')}
              {renderDayButton('We', 'We')}
              {renderDayButton('Th', 'Th')}
              {renderDayButton('Fr', 'Fr')}
              {renderDayButton('Sa', 'Sa')}
            </View>

            <Text style={styles.atText}>At</Text>
            
            <View style={styles.timePickerContainer}>
              <View style={styles.timeInput}>
                <Text style={styles.timeText}>09</Text>
                <AntDesign name="down" size={16} color="#EAEAEA" />
              </View>
              
              <View style={styles.timeInput}>
                <Text style={styles.timeText}>00</Text>
                <AntDesign name="down" size={16} color="#EAEAEA" />
              </View>
              
              <View style={styles.amPmContainer}>
                <TouchableOpacity 
                  style={[
                    styles.amPmButton, 
                    selectedAmPm === 'AM' ? styles.selectedAmPmButton : null
                  ]}
                  onPress={() => setSelectedAmPm('AM')}
                >
                  <Text style={styles.amPmText}>AM</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.amPmButton, 
                    selectedAmPm === 'PM' ? styles.selectedAmPmButton : null
                  ]}
                  onPress={() => setSelectedAmPm('PM')}
                >
                  <Text style={styles.amPmText}>PM</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />
            
            <Text style={styles.dateText}>Start date</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateInputText}>Date</Text>
              <AntDesign name="calendar" size={20} color="#EAEAEA" />
            </TouchableOpacity>
            
            <Text style={styles.dateText}>End date</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateInputText}>Date</Text>
              <AntDesign name="calendar" size={20} color="#EAEAEA" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.currentlyTakingContainer}>
              <Text style={styles.currentlyTakingText}>I'm currently taking this</Text>
              <View style={styles.radioButton}>
                {isTakingCurrently && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: '#161616'
  },
  progressBarContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#161616",
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
    backgroundColor: "#161616",
  },
  backButton: {
    marginBottom: 0,
  },
  skipButton: {
    padding: 0
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#BCBCBC',
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#FFF'
  },
  medicationContainer: {
    marginBottom: 30,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "600",
    color: '#FFF'
  },
  doseContainer: {
    marginBottom: 15,
  },
  doseTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doseTitle: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#222',
    height: 45,
    paddingHorizontal: 15,
  },
  doseInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  unitText: {
    color: '#8D8D8D',
    fontSize: 16,
  },
  recurrenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recurrenceLabel: {
      fontSize: 14,
      color: "#C2C2C2",
      fontWeight: "bold"
  },
  reminderSetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderSetText: {
    color: '#BE40F8',
    marginLeft: 5,
    fontSize: 14,
  },
  recurrenceButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#222',
    marginBottom: 5,
  },
  recurrenceButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  editText: {
    color: '#999',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#303030',
    marginVertical: 10,
  },
  addDoseButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 0,
  },
  addDoseButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  
  // Options Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  optionsModalContainer: {
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  optionsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionsModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  deleteOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  deleteOptionText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
  
  // Recurrence Modal Styles
  recurrenceModalContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  recurrenceModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerButton: {
    padding: 10, // Increase the hit area for the button
    minWidth: 60, // Ensure the button has enough width
  },
  recurrenceModalTitle: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: '600',
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
  },
  doneText: {
    color: '#890FC1',
    fontSize: 16,
    fontWeight: '600',
  },
  recurrenceModalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  repeatEveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  repeatEveryText: {
    fontSize: 18,
    color: '#FFF',
  },
  repeatFrequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repeatFrequencyInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    width: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  repeatFrequencyText: {
    color: '#FFF',
    fontSize: 18,
  },
  repeatIntervalContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
  },
  repeatIntervalText: {
    color: '#FFF',
    fontSize: 18,
  },
  repeatOnText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 15,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayButton: {
    backgroundColor: '#890FC1',
  },
  dayButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  selectedDayButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  atText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 15,
  },
  timePickerContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  timeInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 10,
  },
  timeText: {
    color: '#FFF',
    fontSize: 18,
  },
  amPmContainer: {
    flexDirection: 'row',
    backgroundColor: '#303030',
    borderRadius: 10,
    overflow: 'hidden',
    height: 45,
  },
  amPmButton: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAmPmButton: {
    backgroundColor: '#8D8D8D',
  },
  amPmText: {
    color: '#FFF',
    fontSize: 16,
  },
  dateText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
    marginTop: 10,
  },
  dateInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInputText: {
    color: '#999',
    fontSize: 16,
  },
  currentlyTakingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#303030',
    borderColor: '#8D8D8D',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 0,
  },
  currentlyTakingText: {
    color: '#FFF',
    fontSize: 16,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
});