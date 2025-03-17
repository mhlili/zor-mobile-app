import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { X } from 'react-native-feather';
import SeizuresDetails from './detail-screens/seizureDetails';
import MedicationDetails from './detail-screens/medicationDetails';
import AppetiteDetails from './detail-screens/appetiteDetails';
import SleepDetails from './detail-screens/sleepDetails';
import StressDetails from './detail-screens/stressDetails';

const { width } = Dimensions.get('window');

interface DayDetailProps {
    visible: boolean;
    onClose: () => void;
    date: string;
}

// Progress bar component
interface ProgressBarProps {
    value: number;
    max: number;
    labels: {
        left: string;
        right: string;
    };
}

const DayDetailModal = ({ visible, onClose, date }: DayDetailProps) => {
    // States for detail screens
    const [seizuresDetailVisible, setSeizuresDetailVisible] = useState(false);
    const [medicationDetailVisible, setMedicationDetailVisible] = useState(false);
    const [sleepDetailVisible, setSleepDetailVisible] = useState(false);
    const [stressDetailVisible, setStressDetailVisible] = useState(false);
    const [appetiteDetailVisible, setAppetiteDetailVisible] = useState(false);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        // Parse the date string and adjust for timezone
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const ProgressBar = ({ value, max, labels }: ProgressBarProps) => {
        const percentage = (value / max) * 100;

        return (
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${percentage}%` }]} />
                </View>
                <View style={styles.progressLabels}>
                    <Text style={styles.progressLabelLeft}>{labels.left}</Text>
                    <Text style={styles.progressLabelRight}>{labels.right}</Text>
                </View>
            </View>
        );
    };

    // Handle card taps
    const handleSeizuresTap = () => {
        setSeizuresDetailVisible(true);
    };

    const handleMedicationTap = () => {
        setMedicationDetailVisible(true);
    };

    const handleSleepTap = () => {
        setSleepDetailVisible(true);
    };

    const handleStressTap = () => {
        setStressDetailVisible(true);
    };

    const handleAppetiteTap = () => {
        setAppetiteDetailVisible(true);
    };

    return (
        <>
            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{formatDate(date)}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <X width={24} height={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Content */}
                        <View style={styles.content}>
                            <View style={styles.row}>
                                {/* Seizures Card */}
                                <TouchableOpacity
                                    style={styles.card}
                                    activeOpacity={0.7}
                                    onPress={handleSeizuresTap}
                                >
                                    <Text style={styles.cardTitle}>Seizures</Text>
                                    <Text style={styles.largeNumber}>1</Text>
                                </TouchableOpacity>

                                {/* Medication Card */}
                                <TouchableOpacity
                                    style={styles.card}
                                    activeOpacity={0.7}
                                    onPress={handleMedicationTap}
                                >
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle}>Medication</Text>
                                        <TouchableOpacity>
                                            <Text style={styles.newButton}>New</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.medicationContent}>
                                        <Text style={styles.medicationName}>Tegretol</Text>
                                        <Text style={styles.medicationDosage}>1000 mg</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Sleep Card */}
                            <TouchableOpacity
                                style={styles.fullWidthCard}
                                activeOpacity={0.7}
                                onPress={handleSleepTap}
                            >
                                <Text style={styles.cardTitle}>Sleep</Text>
                                <View style={styles.metricRow}>
                                    <Text style={styles.largeNumber}>8</Text>
                                    <View style={styles.progressWrapper}>
                                        <ProgressBar
                                            value={8}
                                            max={12}
                                            labels={{ left: '1 hour', right: '12+ hours' }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* Stress Card */}
                            <TouchableOpacity
                                style={styles.fullWidthCard}
                                activeOpacity={0.7}
                                onPress={handleStressTap}
                            >
                                <Text style={styles.cardTitle}>Stress</Text>
                                <View style={styles.metricRow}>
                                    <Text style={styles.largeNumber}>3</Text>
                                    <View style={styles.progressWrapper}>
                                        <ProgressBar
                                            value={3}
                                            max={10}
                                            labels={{ left: 'Not stressed', right: 'Very stressed' }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* Appetite Card */}
                            <TouchableOpacity
                                style={styles.fullWidthCard}
                                activeOpacity={0.7}
                                onPress={handleAppetiteTap}
                            >
                                <Text style={styles.cardTitle}>Appetite</Text>
                                <View style={styles.metricRow}>
                                    <Text style={styles.largeNumber}>5</Text>
                                    <View style={styles.progressWrapper}>
                                        <ProgressBar
                                            value={5}
                                            max={10}
                                            labels={{ left: 'Not hungry', right: 'Very hungry' }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Detail Screens */}
                <SeizuresDetails
                    visible={seizuresDetailVisible}
                    onClose={() => setSeizuresDetailVisible(false)}
                    date={date}
                />

                <MedicationDetails
                    visible={medicationDetailVisible}
                    onClose={() => setMedicationDetailVisible(false)}
                    date={date}
                />

                <SleepDetails
                    visible={sleepDetailVisible}
                    onClose={() => setSleepDetailVisible(false)}
                    date={date}
                />

                <StressDetails
                    visible={stressDetailVisible}
                    onClose={() => setStressDetailVisible(false)}
                    date={date}
                />

                <AppetiteDetails
                    visible={appetiteDetailVisible}
                    onClose={() => setAppetiteDetailVisible(false)}
                    date={date}
                />
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width - 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        overflow: 'hidden',
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        position: 'relative',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    content: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    fullWidthCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 16,
        color: '#999',
        marginBottom: 8,
    },
    largeNumber: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    newButton: {
        color: '#666',
        fontWeight: '500',
    },
    medicationContent: {
        marginTop: 16,
    },
    medicationName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    medicationDosage: {
        fontSize: 20,
        color: '#ccc',
        marginTop: 4,
    },
    metricRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressWrapper: {
        flex: 1,
        marginLeft: 16,
    },
    progressContainer: {
        width: '100%',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#b0b0b0',
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    progressLabelLeft: {
        fontSize: 12,
        color: '#999',
    },
    progressLabelRight: {
        fontSize: 12,
        color: '#999',
    },
});

export default DayDetailModal;