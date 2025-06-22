import { useState, useEffect } from 'react';
import type { RecentLocation } from 'types';



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

    getDefaultLocation
  };
};
