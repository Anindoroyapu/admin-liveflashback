"use client";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TContext = {
  orderListData: any[];
  loading: boolean;
  reload: () => void;
};

const ListContext = createContext<TContext>({
  orderListData: [],

  loading: false,
  reload: () => {},
});

export const useOrderList = () => {
  const context = useContext(ListContext);
  return context as TContext;
};

type TData = {
  orderListData: any[];
};

const OrderListProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [orderListData, setOrderListData] = useState<TData[]>([]);

  const [reloadKey, setReloadKey] = useState<number>(-1);
  // const { get } = useApi();
  // const { setMessage } = useTemplate();

  useEffect(() => {
    if (reloadKey !== -2) {
      const fetchData = async () => {
        try {
          const res = await fetch("https://admin.ashaa.xyz/api/Checkout");
          const json = await res.json();
          setOrderListData(json.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setReloadKey(-2);
        }
      };
      fetchData();
    }
  }, [reloadKey]);

  useEffect(() => {
    setReloadKey(-1);
  }, []);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };

    return {
      orderListData,
      reload: () => reload(),
      loading: reloadKey === -1,
    };
  }, [orderListData, reloadKey]);
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default OrderListProvider;
