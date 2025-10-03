import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../themes/ThemeContext';

const PropertyDetailScreen = ({ route }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { property } = route.params || {};

  const styles = createStyles(theme);

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Property not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatPrice = (price, availability) => {
    if (availability === 'for_rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getAvailabilityText = (availability) => {
    return availability === 'for_rent' ? 'For Rent' : 'For Sale';
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'for_rent' ? theme.warning : theme.success;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={property.image} style={styles.image} />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={[styles.badge, { backgroundColor: getAvailabilityColor(property.availability) }]}>
            <Text style={styles.badgeText}>
              {getAvailabilityText(property.availability)}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.address}>📍 {property.address}</Text>
          <Text style={styles.price}>
            {formatPrice(property.price, property.availability)}
          </Text>

          <View style={styles.quickStats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Type</Text>
              <Text style={styles.statValue}>
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Size</Text>
              <Text style={styles.statValue}>{property.size} {property.sizeUnit}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Rooms</Text>
              <Text style={styles.statValue}>{property.rooms}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Bathrooms</Text>
              <Text style={styles.statValue}>{property.bathrooms}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.features}>
              {property.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureText}>✓ {feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Year Built:</Text>
              <Text style={styles.detailValue}>{property.yearBuilt}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Property ID:</Text>
              <Text style={styles.detailValue}>{property.id}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Agent</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.borderLight,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: 40,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 24,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: theme.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
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
  description: {
    fontSize: 16,
    color: theme.textSecondary,
    lineHeight: 24,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    backgroundColor: theme.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: theme.text,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: theme.textMuted,
  },
});

export default PropertyDetailScreen;