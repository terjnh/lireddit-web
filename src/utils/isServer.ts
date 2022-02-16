export const isServer = () => typeof window === "undefined";

// if typeof window === "undefined", we're in the server (isServer = true)