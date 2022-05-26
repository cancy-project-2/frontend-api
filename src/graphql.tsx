import { useState, createContext, useContext } from "react";
import { createClient, Provider } from "urql";

interface ContextValue {
  resetQLClient?: () => void;
}

const makeQLClient = () =>
  createClient({
    url: process.env.GRAPHQL,
    fetchOptions: () => {
      if (typeof window === "undefined") return { headers: {} };

      const token = localStorage.getItem("token");
      return {
        headers: { authorization: token ? `Bearer ${token}` : "" },
      };
    },
  });

const QLClientContext = createContext({} as ContextValue);

export const QLClientProvider = ({ children }) => {
  const [client, setClient] = useState(makeQLClient());

  return (
    <QLClientContext.Provider
      value={{ resetQLClient: () => setClient(makeQLClient()) }}
    >
      <Provider value={client}>{children}</Provider>
    </QLClientContext.Provider>
  );
};

export const useQLClient = () => useContext(QLClientContext);
