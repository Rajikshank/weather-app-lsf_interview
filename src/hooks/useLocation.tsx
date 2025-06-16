import { useState, useEffect } from 'react';

interface RecentLocation {
  name: string;
  region: string;
  country: string;
  searchQuery: string;
  timestamp: number;
}

export const useLocationManager = () => {
  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('weather_recent_locations');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentLocations(parsed);
      } catch (error) {
        console.error('Error parsing recent locations:', error);
      }
    }
  }, []);

  const addRecentLocation = (location: Omit<RecentLocation, 'timestamp'>) => {
    const newLocation = { ...location, timestamp: Date.now() };
    
    setRecentLocations(prev => {
      const filtered = prev.filter(loc => 
        loc.name !== location.name || loc.region !== location.region
      );
      const updated = [newLocation, ...filtered].slice(0, 5); 
      localStorage.setItem('weather_recent_locations', JSON.stringify(updated));
      return updated;
    });
  };

  const getDefaultLocation = async (): Promise<string> => {
    // First, try to get last searched location
    const lastLocation = recentLocations[0];
    if (lastLocation) {
      return lastLocation.searchQuery;
    }

    // Then try geolocation
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude},${longitude}`);
          },
          () => {
            resolve('Colombo');
          },
          { timeout: 5000 }
        );
      } else {
        resolve('Colombo');
      }
    });
  };

  return {
    recentLocations,
    addRecentLocation,
    getDefaultLocation
  };
};
