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
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status != "granted") {
      setLocationError("Permission to access location was denied");
      return;
    }

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
  };

  return {
    location,
    address,
    cityAndRegion,
    locationError,
    setLocation,
    setLocationError,
    getCurrentLocation,
  };
};

export default useGetLocation;
