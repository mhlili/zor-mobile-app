import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { X, ChevronDown } from 'react-native-feather';
import { formatDate } from '../../utils/formatDate';

interface MedicationDetailsProps {
    visible: boolean;
    onClose: () => void;
    date: string;
}

const MedicationDetails = ({ visible, onClose, date }: MedicationDetailsProps) => {
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);

    return (
        <Modal
            visible={visible}
            transparent={false}
            animationType="slide"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Medication</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <X width={24} height={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Date */}
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                </View>

                {/* Content */}
                <ScrollView style={styles.scrollView}>
                    {/* Main content */}
                    <View style={styles.mainContent}>
                        <Text style={styles.largeNumber}>Tegretol</Text>
                        <Text style={styles.subtitleText}>1000mg</Text>
                    </View>

                    {/* Details section */}
                    <View style={styles.detailsSection}>
                        <Text style={styles.sectionTitle}>Details</Text>

                        {/* First medication entry */}
                        <View style={styles.detailCard}>
                            {/* Medication Name */}
                            <TouchableOpacity
                                style={styles.dropdownRow}
                                onPress={() => setExpanded1(!expanded1)}
                            >
                                <Text style={styles.dropdownText}>Tegretol</Text>
                                <ChevronDown width={24} height={24} color="#000" style={[
                                    styles.chevron,
                                    expanded1 && styles.chevronExpanded]} />
                            </TouchableOpacity>

                            {expanded1 && (
                                <>
                                    {/* Dosage */}
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Dosage</Text>
                                        <Text style={styles.detailValue}>1000mg</Text>
                                    </View>

                                    {/* Frequency */}
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Frequency</Text>
                                        <Text style={styles.detailValue}>Once a day</Text>
                                    </View>

                                    {/* Notes */}
                                    <View style={styles.notesContainer}>
                                        <Text style={styles.detailLabel}>Notes</Text>
                                        <Text style={styles.notesText}>
                                            As usual. Jack took his Tegretol with breakfast.
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>

                        {/* Second medication entry */}
                        <View style={[styles.detailCard, { marginTop: 16 }]}>
                            {/* Medication Name */}
                            <TouchableOpacity
                                style={styles.dropdownRow}
                                onPress={() => setExpanded2(!expanded2)}
                            >
                                <Text style={styles.dropdownText}>Tegretol</Text>
                                <ChevronDown width={24} height={24} color="#000" style={[
                                    styles.chevron,
                                    expanded2 && styles.chevronExpanded]} />
                            </TouchableOpacity>

                            {expanded2 && (
                                <>
                                    {/* Dosage */}
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Dosage</Text>
                                        <Text style={styles.detailValue}>1000mg</Text>
                                    </View>

                                    {/* Frequency */}
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Frequency</Text>
                                        <Text style={styles.detailValue}>Once a day</Text>
                                    </View>

                                    {/* Notes */}
                                    <View style={styles.notesContainer}>
                                        <Text style={styles.detailLabel}>Notes</Text>
                                        <Text style={styles.notesText}>
                                            As usual. Jack took his Tegretol with breakfast.
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    editButton: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    editText: {
        fontSize: 16,
        color: '#666',
    },
    closeButton: {
        padding: 4,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    dateText: {
        fontSize: 16,
        color: '#999',
    },
    scrollView: {
        flex: 1,
    },
    mainContent: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    largeNumber: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: 18,
        color: '#ccc',
        marginTop: 4,
    },
    detailsSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 16,
    },
    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
        overflow: 'hidden',
    },
    chevron: {
        transform: [{ rotate: '0deg' }],
    },
    chevronExpanded: {
        transform: [{ rotate: '180deg' }],
    },
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '500',
    },
    detailRow: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    detailLabel: {
        fontSize: 14,
        color: '#999',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
    },
    notesContainer: {
        padding: 16,
    },
    notesText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default MedicationDetails;