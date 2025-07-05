import React, { createContext, useState, useContext, useEffect } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const base_url = "http://192.168.1.255:8082";

  const resetContextState = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  const fetchUrl = async (apiUrl, requestCode) => {
    try {
      setLoading(true);
      const response = await fetch(base_url + apiUrl, {
        method: "get",
      });

      console.log(base_url + apiUrl);

      body = await response.json();
      body.requestCode = requestCode;

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

  const fetchData = async (
    apiUrl,
    requestBody,
    requestContentType,
    requestCode
  ) => {
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

  return (
    <ApiContext.Provider
      value={{
        data,
        loading,
        error,
        fetchData,
        fetchUrl,
        setError,
        resetContextState,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
