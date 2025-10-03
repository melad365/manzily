import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import { Entypo } from '@expo/vector-icons';

const PropertyCard = ({ property, onPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={1}>
      <Image source={property.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {property.title}
          </Text>
          <View style={[styles.badge, { backgroundColor: getAvailabilityColor(property.availability) }]}>
            <Text style={styles.badgeText}>
              {getAvailabilityText(property.availability)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.address} numberOfLines={1}>
          <Entypo name="dot-single" size={24} color="black" />
          {property.address}
        </Text>
        
        <View style={styles.details}>
          <Text style={styles.detailText}>
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Text>
          <Text style={styles.detailText}>
            {property.size} {property.sizeUnit}
          </Text>
          <Text style={styles.detailText}>
            {property.rooms} rooms
          </Text>
        </View>
        
        <Text style={styles.price}>
          {formatPrice(property.price, property.availability)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: theme.borderLight,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: theme.textMuted,
    marginRight: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
  },
});

export default PropertyCard;