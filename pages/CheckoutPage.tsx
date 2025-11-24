import React from "react";
import type { Checkout } from "../types";
import CrudComponent from "../components/CrudComponent";
import OrderTabsSection from "./checkout/OrderTabsSection";
import CheckoutForm from "./checkout/CheckoutForm";
import CheckoutTable from "./checkout/CheckoutTable";
import { useOrderList } from "./checkout/context/OrderListProvider";


const CheckoutPage: React.FC = () => {
  // const [checkoutList, setCheckoutList] = React.useState<Checkout[]>([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [reloadKey, setReloadKey] = React.useState(0);

  // const fetchData = React.useCallback(async (signal?: AbortSignal) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch("https://admin.ashaa.xyz/api/Checkout", {
  //       signal,
  //     });
  //     if (!res.ok) {
  //       const text = await res.text().catch(() => "");
  //       throw new Error(`Fetch error ${res.status}: ${text}`);
  //     }
  //     const json = await res.json();
  //     setCheckoutList(json?.data ?? []);
  //   } catch (err: any) {
  //     if (err?.name === "AbortError") return;
  //     console.error("Error fetching data:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   const controller = new AbortController();
  //   fetchData(controller.signal);
  //   return () => controller.abort();
  // }, [fetchData, reloadKey]);

  // const reload = () => setReloadKey((k) => k + 1);
const {orderListData,reload }=useOrderList();

  return (
    <CrudComponent<Checkout>
      title="Manage Collections"
      itemType="Collection"
      initialItems={orderListData}
      renderTable={(items, onEdit, onDelete) => (
        // <CheckoutTable items={items} onEdit={onEdit} onDelete={onDelete} />
        <OrderTabsSection items={items}/> 
      )}
      renderForm={(onSubmit, onCancel, isLoading, initialData) => (
        <CheckoutForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
          initialData={initialData}
          reload={reload}
        />
      )}
    />
  );
};

export default CheckoutPage;
