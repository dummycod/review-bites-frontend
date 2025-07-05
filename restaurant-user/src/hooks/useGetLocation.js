import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useGetLocation = () => {
  const [cityAndRegion, setCityAndRegion] = useState({
    city: null,
    region: null,
  });

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status != "granted") {
      setLocationError("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      let locationAddress = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      let addressObj = locationAddress[0];
      setAddress(
        `${addressObj.name},${addressObj.street},${addressObj.postalCode},${addressObj.district},${addressObj.city}`
      );

      setCityAndRegion({
        city: locationAddress[0].city,
        region: locationAddress[0].region,
      });
    } catch (e) {
      setLocationError("User Denied Location Permission");
    }
  };

  const openLocationSettings = () => {
    Location.requestForegroundPermissionsAsync();
  };

  return {
    location,
    address,
    cityAndRegion,
    locationError,
    openLocationSettings,
    setLocation,
    setLocationError,
    getCurrentLocation,
  };
};

export default useGetLocation;
