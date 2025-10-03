import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert,
  StatusBar 
} from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import { propertyTypes, availabilityTypes } from '../data/mockProperties';

const AddPropertyScreen = () => {
  const { theme } = useTheme();
  const [property, setProperty] = useState({
    title: '',
    type: 'apartment',
    size: '',
    sizeUnit: 'sq ft',
    address: '',
    rooms: '',
    bathrooms: '',
    price: '',
    availability: 'for_sale',
    description: '',
    features: '',
    yearBuilt: '',
  });

  const styles = createStyles(theme);

  const handleSubmit = () => {
    if (!property.title || !property.address || !property.price) {
      Alert.alert('Error', 'Please fill in all required fields (Title, Address, Price)');
      return;
    }

    Alert.alert(
      'Success', 
      'Property listing has been submitted! In a real app, this would be saved to a database.',
      [
        {
          text: 'OK',
          onPress: () => {
            setProperty({
              title: '',
              type: 'apartment',
              size: '',
              sizeUnit: 'sq ft',
              address: '',
              rooms: '',
              bathrooms: '',
              price: '',
              availability: 'for_sale',
              description: '',
              features: '',
              yearBuilt: '',
            });
          },
        },
      ]
    );
  };

  const FilterButton = ({ title, value, onPress, isSelected }) => (
    <TouchableOpacity 
      style={[styles.filterButton, isSelected && styles.filterButtonSelected]} 
      onPress={() => onPress(value)}
    >
      <Text style={[styles.filterButtonText, isSelected && styles.filterButtonTextSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.title}>Add Property</Text>
        <Text style={styles.subtitle}>List your property for sale or rent</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <Text style={styles.label}>Property Title *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter property title..."
              placeholderTextColor={theme.textMuted}
              value={property.title}
              onChangeText={(text) => setProperty({...property, title: text})}
            />

            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter full address..."
              placeholderTextColor={theme.textMuted}
              value={property.address}
              onChangeText={(text) => setProperty({...property, address: text})}
            />

            <Text style={styles.label}>Property Type</Text>
            <View style={styles.filterRow}>
              {propertyTypes.map((type) => (
                <FilterButton
                  key={type}
                  title={type.charAt(0).toUpperCase() + type.slice(1)}
                  value={type}
                  onPress={(value) => setProperty({...property, type: value})}
                  isSelected={property.type === type}
                />
              ))}
            </View>

            <Text style={styles.label}>Availability</Text>
            <View style={styles.filterRow}>
              <FilterButton
                title="For Sale"
                value="for_sale"
                onPress={(value) => setProperty({...property, availability: value})}
                isSelected={property.availability === 'for_sale'}
              />
              <FilterButton
                title="For Rent"
                value="for_rent"
                onPress={(value) => setProperty({...property, availability: value})}
                isSelected={property.availability === 'for_rent'}
              />
            </View>
          </View>

          {/* Property Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Details</Text>
            
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Size</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="1200"
                  placeholderTextColor={theme.textMuted}
                  value={property.size}
                  onChangeText={(text) => setProperty({...property, size: text})}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.halfInput, {marginRight: 0}]}>
                <Text style={styles.label}>Unit</Text>
                <View style={styles.filterRow}>
                  <FilterButton
                    title="sq ft"
                    value="sq ft"
                    onPress={(value) => setProperty({...property, sizeUnit: value})}
                    isSelected={property.sizeUnit === 'sq ft'}
                  />
                  <FilterButton
                    title="m²"
                    value="m²"
                    onPress={(value) => setProperty({...property, sizeUnit: value})}
                    isSelected={property.sizeUnit === 'm²'}
                  />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Rooms</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="3"
                  placeholderTextColor={theme.textMuted}
                  value={property.rooms}
                  onChangeText={(text) => setProperty({...property, rooms: text})}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.halfInput, {marginRight: 0}]}>
                <Text style={styles.label}>Bathrooms</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="2"
                  placeholderTextColor={theme.textMuted}
                  value={property.bathrooms}
                  onChangeText={(text) => setProperty({...property, bathrooms: text})}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>
              Price * {property.availability === 'for_rent' ? '(per month)' : ''}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={property.availability === 'for_rent' ? '2500' : '350000'}
              placeholderTextColor={theme.textMuted}
              value={property.price}
              onChangeText={(text) => setProperty({...property, price: text})}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Year Built</Text>
            <TextInput
              style={styles.textInput}
              placeholder="2020"
              placeholderTextColor={theme.textMuted}
              value={property.yearBuilt}
              onChangeText={(text) => setProperty({...property, yearBuilt: text})}
              keyboardType="numeric"
            />
          </View>

          {/* Additional Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe your property..."
              placeholderTextColor={theme.textMuted}
              value={property.description}
              onChangeText={(text) => setProperty({...property, description: text})}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Features</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Garage, Pool, Garden (comma separated)"
              placeholderTextColor={theme.textMuted}
              value={property.features}
              onChangeText={(text) => setProperty({...property, features: text})}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Property Listing</Text>
          </TouchableOpacity>

          <Text style={styles.note}>
            * Required fields{'\n'}
            This is a demo app. In a real application, property listings would be saved to a database and include image upload functionality.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 8,
    marginTop: 12,
  },
  textInput: {
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: theme.text,
    marginBottom: 8,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  filterButtonSelected: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: theme.text,
    fontWeight: '500',
  },
  filterButtonTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  halfInput: {
    flex: 1,
    marginRight: 12,
  },
  submitButton: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    color: theme.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 120, // Increased to account for tab bar height
  },
});

export default AddPropertyScreen;