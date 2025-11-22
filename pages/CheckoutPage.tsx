import React from "react";
import type { Checkout } from "../types";
import Button from "../components/ui/Button";
import CrudComponent from "../components/CrudComponent";

const CheckoutForm: React.FC<{
  onSubmit: (data: Omit<Checkout, "id" | "createdAt">) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Checkout | null;
  reload: () => void;
}> = ({ onSubmit, onCancel, isLoading, initialData, reload }) => {
  const [formData, setFormData] = React.useState({
    address: initialData?.address || "",
    amount: initialData?.amount || 0,
    details: initialData?.details || "",
    email: initialData?.email || "",
    id: initialData?.id || "",
    note: initialData?.note || "",
    pMethod: initialData?.method || "Cash",
    title: initialData?.title || "",
    fullName: initialData?.fullName || "",
    phone: initialData?.phone || "",
    productId: initialData?.productId || "",
    productName: initialData?.productName || "",
    productSku: initialData?.productSku || "",
    quantity: initialData?.quantity || 0,
    shipping: initialData?.shipping || "",
    size: initialData?.size || "",
    status: initialData?.status || "Pending",
    subTotal: initialData?.subTotal || 0,
    total: initialData?.total || 0,
    updatedAt: initialData?.updatedAt || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const endpointBase = "https://admin.ashaa.xyz/api/Checkout";
      const url = formData.id ? `${endpointBase}/${formData.id}` : endpointBase;
      const method = formData.id ? "PUT" : "POST";

      const payload: Record<string, any> = {
        fullName: formData.fullName,
        email: formData.email || " Anonymous",
        phone: formData.phone,
        address: formData.address,
        size: formData.size,
        subTotal: formData.subTotal.toString(),
        total: formData.total.toString(),
        shipping: formData.shipping.toString(),
        quantity: formData.quantity.toString(),
        productName: formData.productName,
        productId: formData.productId,
        productSku: formData.productSku,
        status: "Pending",
      };

      if (formData.id) {
        payload.id = formData.id;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onCancel();
        reload();
      } else {
        const text = await res.text().catch(() => "");
        console.error("Request failed:", res.status, text);
      }
    } catch (err) {
      console.error("POST Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Product ID</label>
        <input
          type="text"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Product SKU</label>
          <input
            type="text"
            name="productSku"
            value={formData.productSku}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            min={0}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Shipping</label>
          <input
            type="text"
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Sub Total</label>
          <input
            type="number"
            name="subTotal"
            value={formData.subTotal}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            min={0}
            step="0.01"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            min={0}
            step="0.01"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      {/* <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <select name="pMethod" value={formData.pMethod} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>
      </div> */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

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
        <CheckoutTable items={items} onEdit={onEdit} onDelete={onDelete} />
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
