import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../themes/ThemeContext';
import { mockProperties, propertyTypes, availabilityTypes } from '../data/mockProperties';
import PropertyCard from '../components/PropertyCard';

const FilterScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [filters, setFilters] = useState({
    searchText: '',
    availability: 'all',
    propertyType: 'all',
    minPrice: '',
    maxPrice: '',
    minRooms: '',
    maxRooms: '',
  });
  const [showResults, setShowResults] = useState(false);

  const styles = createStyles(theme);

  const applyFilters = () => {
    let filtered = mockProperties;

    if (filters.searchText) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        property.address.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    }

    if (filters.availability !== 'all') {
      filtered = filtered.filter(property => property.availability === filters.availability);
    }

    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }

    if (filters.minPrice) {
      const minPrice = parseInt(filters.minPrice);
      filtered = filtered.filter(property => property.price >= minPrice);
    }

    if (filters.maxPrice) {
      const maxPrice = parseInt(filters.maxPrice);
      filtered = filtered.filter(property => property.price <= maxPrice);
    }

    if (filters.minRooms) {
      const minRooms = parseInt(filters.minRooms);
      filtered = filtered.filter(property => property.rooms >= minRooms);
    }

    if (filters.maxRooms) {
      const maxRooms = parseInt(filters.maxRooms);
      filtered = filtered.filter(property => property.rooms <= maxRooms);
    }

    return filtered;
  };

  const clearFilters = () => {
    setFilters({
      searchText: '',
      availability: 'all',
      propertyType: 'all',
      minPrice: '',
      maxPrice: '',
      minRooms: '',
      maxRooms: '',
    });
    setShowResults(false);
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const filteredProperties = applyFilters();

  const handlePropertyPress = (property) => {
    navigation.navigate('PropertyDetail', { propertyId: property.id, property });
  };

  const renderProperty = ({ item }) => (
    <PropertyCard 
      property={item} 
      onPress={() => handlePropertyPress(item)}
    />
  );

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

  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowResults(false)}>
            <Text style={styles.backButton}>← Filters</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            Results ({filteredProperties.length})
          </Text>
        </View>
        <FlatList
          data={filteredProperties}
          renderItem={renderProperty}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No properties match your filters</Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.title}>Filter Properties</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Search Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Search by title or address..."
              placeholderTextColor={theme.textMuted}
              value={filters.searchText}
              onChangeText={(text) => setFilters({...filters, searchText: text})}
            />
          </View>

          {/* Availability Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability</Text>
            <View style={styles.filterRow}>
              <FilterButton
                title="All"
                value="all"
                onPress={(value) => setFilters({...filters, availability: value})}
                isSelected={filters.availability === 'all'}
              />
              <FilterButton
                title="For Sale"
                value="for_sale"
                onPress={(value) => setFilters({...filters, availability: value})}
                isSelected={filters.availability === 'for_sale'}
              />
              <FilterButton
                title="For Rent"
                value="for_rent"
                onPress={(value) => setFilters({...filters, availability: value})}
                isSelected={filters.availability === 'for_rent'}
              />
            </View>
          </View>

          {/* Property Type Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Type</Text>
            <View style={styles.filterRow}>
              <FilterButton
                title="All"
                value="all"
                onPress={(value) => setFilters({...filters, propertyType: value})}
                isSelected={filters.propertyType === 'all'}
              />
              {propertyTypes.map((type) => (
                <FilterButton
                  key={type}
                  title={type.charAt(0).toUpperCase() + type.slice(1)}
                  value={type}
                  onPress={(value) => setFilters({...filters, propertyType: value})}
                  isSelected={filters.propertyType === type}
                />
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.rangeRow}>
              <TextInput
                style={[styles.textInput, styles.rangeInput]}
                placeholder="Min price"
                placeholderTextColor={theme.textMuted}
                value={filters.minPrice}
                onChangeText={(text) => setFilters({...filters, minPrice: text})}
                keyboardType="numeric"
              />
              <Text style={styles.rangeText}>to</Text>
              <TextInput
                style={[styles.textInput, styles.rangeInput]}
                placeholder="Max price"
                placeholderTextColor={theme.textMuted}
                value={filters.maxPrice}
                onChangeText={(text) => setFilters({...filters, maxPrice: text})}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Rooms Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Number of Rooms</Text>
            <View style={styles.rangeRow}>
              <TextInput
                style={[styles.textInput, styles.rangeInput]}
                placeholder="Min rooms"
                placeholderTextColor={theme.textMuted}
                value={filters.minRooms}
                onChangeText={(text) => setFilters({...filters, minRooms: text})}
                keyboardType="numeric"
              />
              <Text style={styles.rangeText}>to</Text>
              <TextInput
                style={[styles.textInput, styles.rangeInput]}
                placeholder="Max rooms"
                placeholderTextColor={theme.textMuted}
                value={filters.maxRooms}
                onChangeText={(text) => setFilters({...filters, maxRooms: text})}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>
                Search Properties ({filteredProperties.length})
              </Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    flex: 1,
  },
  backButton: {
    fontSize: 16,
    color: theme.primary,
    fontWeight: 'bold',
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 12,
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
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rangeInput: {
    flex: 1,
    marginBottom: 0,
  },
  rangeText: {
    fontSize: 16,
    color: theme.textMuted,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 40,
  },
  clearButton: {
    flex: 1,
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  clearButtonText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: 'bold',
  },
  searchButton: {
    flex: 2,
    backgroundColor: theme.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 120, // Increased to account for tab bar height
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: theme.textMuted,
    textAlign: 'center',
  },
});

export default FilterScreen;