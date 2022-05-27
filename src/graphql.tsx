import { createClient } from "urql";

const client = createClient({
  url: process.env.GRAPHQL,
  fetchOptions: () => {
    if (typeof window === "undefined") return { headers: {} };

    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default client;
