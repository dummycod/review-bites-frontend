import { useEffect } from "react";
import { useApi } from "../context/ApiProvider";

const useResetApiContext = (navigation) => {
  const { resetContextState } = useApi();

  useEffect(() => {
    console.log("Reset triggered");
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      resetContextState();
    });

    return unsubscribe;
  }, [resetContextState, navigation]);
};

export default useResetApiContext;
