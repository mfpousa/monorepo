import { useEffect } from "react";

const subscriptionSet = {};
export default function useSubscription(identifier, callback) {
  const subscriptions = subscriptionSet[identifier] || [];
  useEffect(() => {
    subscriptions.push(callback);
    subscriptionSet[identifier] = subscriptions;
    return () => {
      const index = subscriptions.findIndex((s) => s === callback);
      subscriptions[index] = subscriptions.pop();
    };
  }, [callback]);
  return (...args) => {
    subscriptions.forEach((s) => s(...args));
  };
}
