import { useReducer, useCallback } from "react";

interface HttpState<T> {
  data: T | null;
  error: string | null;
  status: "pending" | "completed" | null;
}

type Action<T> =
  | { type: "SEND" }
  | { type: "SUCCESS"; responseData: T }
  | { type: "ERROR"; errorMessage: string };

function httpReducer<T>(state: HttpState<T>, action: Action<T>): HttpState<T> {
  switch (action.type) {
    case "SEND":
      return {
        data: null,
        error: null,
        status: "pending",
      };
    case "SUCCESS":
      return {
        data: action.responseData,
        error: null,
        status: "completed",
      };
    case "ERROR":
      return {
        data: null,
        error: action.errorMessage,
        status: "completed",
      };
    default:
      return state;
  }
}

function useHttp<T>(
  requestFunction: (requestData: any) => Promise<T>,
  startWithPending: boolean = false
) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  } as HttpState<T>);

  const sendRequest = useCallback(
    async function (requestData?: any) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error: any) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
