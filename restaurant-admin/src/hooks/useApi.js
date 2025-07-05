import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONSTANTS from "../context/constant";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const base_url = CONSTANTS.BASE_URL;

  const resetHookState = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  const fetchUrl = async (apiUrl, authenticated, requestCode) => {
    const token = await AsyncStorage.getItem("token");

    if (authenticated) {
      if (apiUrl.includes("?")) apiUrl = apiUrl + "&access_token=" + token;
      else apiUrl = apiUrl + "?access_token=" + token;
    }

    console.log(base_url + apiUrl);

    try {
      setLoading(true);

      const response = await fetch(base_url + apiUrl, {
        method: "get",
      });

      var body = {};

      const responseContentType = response.headers.get("Content-type");

      console.log(responseContentType);

      if (
        responseContentType &&
        responseContentType.includes("application/json")
      ) {
        body = await response.json();
      } else {
        body.message = await response.text();
      }

      body.requestCode = requestCode;

      console.log(body);

      if (response.ok) {
        setData(body);
        setError(null);
      } else if (response.status >= 400 && response.status < 500) {
        setError(body.message);
      } else if (response.status === 500) {
        setError("Internal Server Error");
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (
    apiUrl,
    authenticated,
    requestBody,
    requestContentType,
    requestCode
  ) => {
    const token = await AsyncStorage.getItem("token");

    if (authenticated) {
      if (apiUrl.includes("?")) apiUrl = apiUrl + "&access_token=" + token;
      else apiUrl = apiUrl + "?access_token=" + token;
    }

    requestContentType = requestContentType
      ? requestContentType
      : "application/json";

    console.log(requestContentType);
    console.log(base_url + apiUrl);

    requestBody =
      requestContentType === "application/json"
        ? JSON.stringify(requestBody)
        : requestBody;
    try {
      setLoading(true);
      const response = await fetch(base_url + apiUrl, {
        method: "post",
        headers: {
          "Content-Type": requestContentType,
        },
        body: requestBody,
      });

      console.log(base_url + apiUrl);

      var body = {};

      const responseContentType = response.headers.get("Content-type");

      if (
        responseContentType &&
        responseContentType.includes("application/json")
      ) {
        body = await response.json();
      } else {
        body.message = await response.text();
      }

      body.requestCode = requestCode;

      console.log(body);

      if (response.ok) {
        setData(body);
        setError(null);
      } else if (response.status >= 400 && response.status < 500) {
        setError(body.message);
      } else if (response.status === 500) {
        setError("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    setLoading,
    setError,
    fetchData,
    fetchUrl,
    resetHookState,
  };
};

export default useApi;
