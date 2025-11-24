import React from "react";
import type { Checkout } from "../types";
import Button from "../components/ui/Button";
import CrudComponent from "../components/CrudComponent";
import OrderTabsSection from "./checkout/OrderTabsSection";



const CheckoutTable: React.FC<{
  items: Checkout[];
  onEdit: (item: Checkout) => void;
  onDelete: (id: string) => void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b dark:border-gray-700">
          <th className="p-3">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Address</th>

          <th className="p-3">Contact</th>
          <th className="p-3">Product</th>
          <th className="p-3">SKU</th>

          <th className="p-3">Quantity</th>
          <th className="p-3">Size</th>
          <th className="p-3">Shipping</th>
          <th className="p-3">Total</th>
          <th className="p-3">Status</th>
          <th className="p-3">#</th>
        </tr>
      </thead>
      <tbody>
        {items
          .slice()
          .reverse()
          .map((item) => (
            <tr key={item.id} className="border-b dark:border-gray-700">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.fullName}</td>
              <td className="p-3">{item.address}</td>

              <td className="p-3">
                {item.Phone} <br /> {item.email}
              </td>
              <td className="p-3">{item.productName}</td>
              <td className="p-3">{item.productSku}</td>

              <td className="p-3">{item.quantity}</td>

              <td className="p-3">{item.size}</td>
              <td className="p-3">{item.shipping}</td>
              <td className="p-3">{item.total}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => onEdit(item)}>
                    Edit
                  </Button>
                  {/* <Button variant="danger" onClick={() => onDelete(item.id)}>
                    Delete
                  </Button> */}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const CheckoutPage: React.FC = () => {
  const [checkoutList, setCheckoutList] = React.useState<Checkout[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);

  const fetchData = React.useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    try {
      const res = await fetch("https://admin.ashaa.xyz/api/Checkout", {
        signal,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Fetch error ${res.status}: ${text}`);
      }
      const json = await res.json();
      setCheckoutList(json?.data ?? []);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData, reloadKey]);

  const reload = () => setReloadKey((k) => k + 1);

  return (
    <CrudComponent<Checkout>
      title="Manage Collections"
      itemType="Collection"
      initialItems={checkoutList}
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
