import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import * as InAppPurchases from 'expo-in-app-purchases';

const SubscriptionContext = createContext(null);

const subscriptionProductIds = Platform.select({
  ios: ['stardust_gold_monthly'],
  android: ['stardust_gold_monthly'],
  default: ['stardust_gold_monthly'],
});

const isSubscriptionProduct = (productId) => subscriptionProductIds.includes(productId);

export function SubscriptionProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [lastPurchase, setLastPurchase] = useState(null);

  const loadProducts = useCallback(async () => {
    const { responseCode, results } = await InAppPurchases.getProductsAsync(subscriptionProductIds);
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
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
    const { responseCode, results } = await InAppPurchases.getPurchaseHistoryAsync();
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      updateSubscriptionStatus(results ?? []);
    }
  }, [updateSubscriptionStatus]);

  useEffect(() => {
    let isMounted = true;

    const connect = async () => {
      if (Platform.OS === 'web') {
        setIsConnecting(false);
        return;
      }

      try {
        const { responseCode } = await InAppPurchases.connectAsync();
        if (!isMounted) return;

        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          InAppPurchases.setPurchaseListener(async ({ responseCode, results, errorCode }) => {
            if (responseCode === InAppPurchases.IAPResponseCode.OK) {
              if (results?.length) {
                setLastError(null);
                updateSubscriptionStatus(results);

                for (const purchase of results) {
                  setLastPurchase(purchase);
                  await InAppPurchases.finishTransactionAsync(purchase, false);
                }
              }
              setIsPurchasing(false);
            } else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
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
      InAppPurchases.disconnectAsync().catch(() => null);
    };
  }, [loadProducts, restorePurchases, updateSubscriptionStatus]);

  const purchaseSubscription = useCallback(async () => {
    if (!subscriptionProductIds.length) return;
    setIsPurchasing(true);
    setLastError(null);
    try {
      await InAppPurchases.purchaseItemAsync(subscriptionProductIds[0]);
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
