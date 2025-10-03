import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../themes/ThemeContext';
import { mockProperties } from '../data/mockProperties';
import PropertyCard from '../components/PropertyCard';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('buy'); // Default to 'buy'
  const underlinePosition = useRef(new Animated.Value(0)).current; // 0 = buy, 1 = rent, 2 = sell

  const styles = createStyles(theme);

  // Animation when option changes
  useEffect(() => {
    let targetValue = 0;
    if (selectedOption === 'rent') targetValue = 1;
    if (selectedOption === 'sell') targetValue = 2;

    Animated.timing(underlinePosition, {
      toValue: targetValue,
      duration: 300,
      useNativeDriver: false, // We're animating layout properties
    }).start();
  }, [selectedOption]);

  const handlePropertyPress = (property) => {
    navigation.navigate('PropertyDetail', { propertyId: property.id, property });
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleSearchPress = () => {
    // Navigate to filter screen with selected option
    navigation.navigate('Filter', { searchType: selectedOption });
  };

  const renderProperty = ({ item }) => (
    <View style={styles.propertyCardContainer}>
      <PropertyCard 
        property={item} 
        onPress={() => handlePropertyPress(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <FlatList
        data={mockProperties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <ImageBackground 
              source={require('../../assets/living-room.png')}
              style={styles.heroSection}
              resizeMode="cover"
            >
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Manzily</Text>
              </View>
              <View style={styles.heroOverlay}>
                <View style={styles.linksSection}>
                  <View style={styles.linksContainer}>
                    <TouchableOpacity onPress={() => handleOptionPress('buy')} style={styles.linkWrapper}>
                      <Text style={styles.linkText}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOptionPress('rent')} style={styles.linkWrapper}>
                      <Text style={styles.linkText}>Rent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOptionPress('sell')} style={styles.linkWrapper}>
                      <Text style={styles.linkText}>Sell</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Sliding underline */}
                  <Animated.View 
                    style={[
                      styles.slidingUnderline,
                      {
                        transform: [{
                          translateX: underlinePosition.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [0, 80, 160], // Adjust these values based on your link widths
                          })
                        }]
                      }
                    ]} 
                  />
                </View>
                
                <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
                  <Ionicons name="search" size={20} color="#ffffff" style={styles.searchIcon} />
                  <Text style={styles.searchButtonText}>Search Properties</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View style={styles.propertiesHeader}>
              <Text style={styles.propertiesTitle}>Featured Properties</Text>
            </View>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  heroSection: {
    height: 500,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: 60, // Account for status bar and notch
    paddingBottom: 40,
    marginHorizontal: 0, // Explicitly set to 0
    marginLeft: 0,
    marginRight: 0,
  },
  logoContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 80, // Start higher up the screen
  },
  linksSection: {
    position: 'relative',
    marginBottom: 30,
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkWrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  linkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  slidingUnderline: {
    position: 'absolute',
    bottom: -2,
    left: 16,
    height: 3,
    width: 40, // Approximate width of each link
    backgroundColor: theme.primary,
    borderRadius: 2,
  },
  searchButton: {
    backgroundColor: theme.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 30,
    width: '90%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  propertiesHeader: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: theme.background,
  },
  propertiesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  propertyCardContainer: {
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 120, // Increased to account for tab bar height
  },
});

export default HomeScreen;