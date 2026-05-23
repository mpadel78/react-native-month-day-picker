import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BirthdayPicker,
  BirthdayPickerModal,
  useBirthdayPicker,
  formatMonth,
  type BirthdayValue,
} from 'react-native-month-day-picker';

export default function App() {
  // Example 1: Uncontrolled mode
  const [uncontrolledValue, setUncontrolledValue] = useState<BirthdayValue>({
    month: 1,
    day: 1,
  });

  // Example 2: Controlled mode
  const [controlledValue, setControlledValue] = useState<BirthdayValue>({
    month: 6,
    day: 15,
  });

  // Example 3: Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState<BirthdayValue>({
    month: 12,
    day: 25,
  });

  // Example 4: Using the hook
  const birthdayHook = useBirthdayPicker({
    initialValue: { month: 3, day: 14 },
  });

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Birthday Picker Examples</Text>

          {/* Example 1: Uncontrolled Mode */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Uncontrolled Mode</Text>
            <Text style={styles.description}>
              Uses defaultValue and onChange callback
            </Text>
            <BirthdayPicker
              defaultValue={{ month: 1, day: 1 }}
              onChange={setUncontrolledValue}
              style={styles.picker}
            />
            <Text style={styles.value}>
              Selected: {formatMonth(uncontrolledValue.month)}{' '}
              {uncontrolledValue.day}
            </Text>
          </View>

          {/* Example 2: Controlled Mode */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Controlled Mode</Text>
            <Text style={styles.description}>Value is managed externally</Text>
            <BirthdayPicker
              value={controlledValue}
              onChange={setControlledValue}
              style={styles.picker}
            />
            <Text style={styles.value}>
              Selected: {formatMonth(controlledValue.month)}{' '}
              {controlledValue.day}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setControlledValue({ month: 7, day: 4 })}
            >
              <Text style={styles.buttonText}>Set to July 4th</Text>
            </TouchableOpacity>
          </View>

          {/* Example 3: Modal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Modal Presentation</Text>
            <Text style={styles.description}>
              Opens in a bottom sheet modal
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>
                {formatMonth(modalValue.month)} {modalValue.day} - Tap to Edit
              </Text>
            </TouchableOpacity>
            <BirthdayPickerModal
              visible={modalVisible}
              value={modalValue}
              onConfirm={(value) => {
                setModalValue(value);
                setModalVisible(false);
              }}
              onCancel={() => setModalVisible(false)}
              title="Select Your Birthday"
            />
          </View>

          {/* Example 4: Using Hook */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              4. Using useBirthdayPicker Hook
            </Text>
            <Text style={styles.description}>
              For custom picker implementations
            </Text>
            <View style={styles.hookDemo}>
              <Text style={styles.hookValue}>
                Value: {formatMonth(birthdayHook.value.month)}{' '}
                {birthdayHook.value.day}
              </Text>
              <Text style={styles.hookInfo}>
                Days in month: {birthdayHook.daysInMonth}
              </Text>
              <Text style={styles.hookInfo}>
                Is valid: {birthdayHook.isValid ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => birthdayHook.setMonth(2)}
              >
                <Text style={styles.buttonText}>Feb</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => birthdayHook.setDay(29)}
              >
                <Text style={styles.buttonText}>29th</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Example 5: Different Locales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Different Locales</Text>
            <Text style={styles.description}>German locale (de-DE)</Text>
            <BirthdayPicker
              defaultValue={{ month: 10, day: 3 }}
              locale="de-DE"
              style={styles.picker}
            />
          </View>

          {/* Example 6: Short Month Format */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Short Month Format</Text>
            <Text style={styles.description}>Abbreviated month names</Text>
            <BirthdayPicker
              defaultValue={{ month: 8, day: 15 }}
              monthFormat="short"
              style={styles.picker}
            />
          </View>

          {/* Example 7: No Leap Day */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. No Leap Day</Text>
            <Text style={styles.description}>February has only 28 days</Text>
            <BirthdayPicker
              defaultValue={{ month: 2, day: 15 }}
              allowLeapDay={false}
              style={styles.picker}
            />
          </View>

          <View style={styles.footer} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  picker: {
    height: 200,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  hookDemo: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  hookValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  hookInfo: {
    fontSize: 14,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  smallButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
  },
  footer: {
    height: 40,
  },
});
