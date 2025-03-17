import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { CalendarList } from "react-native-calendars";
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function FullCalendarScreen() {
    const [selectedDate, setSelectedDate] = useState("");
    const today = new Date().toISOString().split("T")[0];

    // Calculate dates for disabling future dates
    const disabledDates: { [key: string]: { disabled: boolean, disableTouchEvent: boolean, textColor: string } } = {};
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 365); // Get dates for next year

    for (let d = new Date(currentDate); d <= futureDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        if (d > currentDate) {
            disabledDates[dateString] = {
                disabled: true,
                disableTouchEvent: true,
                textColor: '#CCCCCC'
            };
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle}>Calendar</Text>
                </View>
            </View>

            <CalendarList
                onDayPress={(day: any) => setSelectedDate(day.dateString)}
                markedDates={{
                    ...disabledDates,
                    [selectedDate]: { selected: true, marked: true, selectedColor: "#D1D1D1" },
                    [today]: { selected: true, selectedColor: "#D1D1D1" },
                }}
                theme={{
                    backgroundColor: '#f9f9f9',
                    calendarBackground: '#f9f9f9',
                    textSectionTitleColor: "#333",
                    textDayFontSize: 14,
                    textDayFontWeight: '300',
                    todayTextColor: "#000",
                    selectedDayTextColor: '#000',
                }}
                pastScrollRange={12}
                futureScrollRange={2}
                scrollEnabled={true}
                showScrollIndicator={true}
                calendarHeight={336}
                horizontal={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        position: 'relative',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
    }
});