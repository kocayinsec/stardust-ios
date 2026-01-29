import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const SubscriptionContext = createContext(null);

const subscriptionProductIds = Platform.select({
  ios: ['stardust_gold_monthly'],
  android: ['stardust_gold_monthly'],
  default: ['stardust_gold_monthly'],
});

const isSubscriptionProduct = (productId) => subscriptionProductIds.includes(productId);

const loadInAppPurchasesModule = async () => {
  try {
    const mod = await import('expo-in-app-purchases');
    return mod;
  } catch (error) {
    return null;
  }
};

export function SubscriptionProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [lastPurchase, setLastPurchase] = useState(null);
  const iapRef = useRef(null);

  const loadProducts = useCallback(async () => {
    if (!iapRef.current) return;
    const { responseCode, results } = await iapRef.current.getProductsAsync(subscriptionProductIds);
    if (responseCode === iapRef.current.IAPResponseCode.OK) {
      setProducts(results ?? []);
    }
  }, []);

  const updateSubscriptionStatus = useCallback((purchases = []) => {
    const hasActive = purchases.some((purchase) => isSubscriptionProduct(purchase.productId));
    if (hasActive) {
      setIsSubscribed(true);
    }
  }, []);

  const restorePurchases = useCallback(async () => {
    if (!iapRef.current) return;
    const { responseCode, results } = await iapRef.current.getPurchaseHistoryAsync();
    if (responseCode === iapRef.current.IAPResponseCode.OK) {
      updateSubscriptionStatus(results ?? []);
    }
  }, [updateSubscriptionStatus]);

  useEffect(() => {
    let isMounted = true;

    const connect = async () => {
      if (Platform.OS === 'web' || Constants.appOwnership === 'expo') {
        setIsConnecting(false);
        return;
      }

      const module = await loadInAppPurchasesModule();
      if (!module?.connectAsync) {
        setIsConnecting(false);
        return;
      }

      iapRef.current = module;

      try {
        const { responseCode } = await iapRef.current.connectAsync();
        if (!isMounted) return;

        if (responseCode === iapRef.current.IAPResponseCode.OK) {
          iapRef.current.setPurchaseListener(async ({ responseCode, results, errorCode }) => {
            if (responseCode === iapRef.current.IAPResponseCode.OK) {
              if (results?.length) {
                setLastError(null);
                updateSubscriptionStatus(results);

                for (const purchase of results) {
                  setLastPurchase(purchase);
                  await iapRef.current.finishTransactionAsync(purchase, false);
                }
              }
              setIsPurchasing(false);
            } else if (responseCode === iapRef.current.IAPResponseCode.USER_CANCELED) {
              setIsPurchasing(false);
            } else {
              setLastError(errorCode ?? 'purchase_failed');
              setIsPurchasing(false);
            }
          });

          await loadProducts();
          await restorePurchases();
        } else {
          setLastError(`iap_connection_failed_${responseCode}`);
        }
      } catch (error) {
        setLastError(error?.message ?? 'iap_connection_error');
      } finally {
        if (isMounted) {
          setIsConnecting(false);
        }
      }
    };

    connect();

    return () => {
      isMounted = false;
      iapRef.current?.disconnectAsync?.().catch(() => null);
    };
  }, [loadProducts, restorePurchases, updateSubscriptionStatus]);

  const purchaseSubscription = useCallback(async () => {
    if (!subscriptionProductIds.length || !iapRef.current) return;
    setIsPurchasing(true);
    setLastError(null);
    try {
      await iapRef.current.purchaseItemAsync(subscriptionProductIds[0]);
    } catch (error) {
      setIsPurchasing(false);
      setLastError(error?.message ?? 'purchase_failed');
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      isSubscribed,
      isConnecting,
      isPurchasing,
      lastError,
      lastPurchase,
      productIds: subscriptionProductIds,
      purchaseSubscription,
      restorePurchases,
    }),
    [
      isConnecting,
      isPurchasing,
      isSubscribed,
      lastError,
      lastPurchase,
      products,
      purchaseSubscription,
      restorePurchases,
    ]
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
