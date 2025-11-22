import React from "react";
import type { Checkout } from "../types";
import Button from "../components/ui/Button";
import CrudComponent from "../components/CrudComponent";

const CheckoutForm: React.FC<{
  onSubmit: (data: Omit<Checkout, "id" | "createdAt">) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Checkout | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    address: initialData?.address || "",
    amount: initialData?.amount || 0,
    createdAt: initialData?.createdAt || "",
    email: initialData?.email || "",
    id: initialData?.id || "",
    method: initialData?.method || "Cash",
    fullName: initialData?.fullName || "",
    note: initialData?.note || "",
    phone: initialData?.phone || "",
    productId: initialData?.productId || "",
    productName: initialData?.productName || "",
    productSku: initialData?.productSku || "",
    quantity: initialData?.quantity || 0,
    shipping: initialData?.shipping || 0,
    size: initialData?.size || "",
    status: initialData?.status || "",
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
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        productId: formData.productId,
        productName: formData.productName,
        productSku: formData.productSku,
        quantity: formData.quantity,
        size: formData.size,
        subTotal: formData.subTotal,
        shipping: formData.shipping,
        total: formData.total,
        method: formData.method,
        note: formData.note,
        status: formData.status,
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
    } catch (err) {
      console.error("POST Error:", err);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium"> Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 bCheckout rounded bg-gray-50 dark:bg-gray-700 dark:bCheckout-gray-600"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Checkout Reason</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 bCheckout rounded bg-gray-50 dark:bg-gray-700 dark:bCheckout-gray-600"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Details</label>
        <input
          type="text"
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="w-full p-2 bCheckout rounded bg-gray-50 dark:bg-gray-700 dark:bCheckout-gray-600"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 bCheckout rounded bg-gray-50 dark:bg-gray-700 dark:bCheckout-gray-600"
          required
        />
      </div>{" "}
      <div>
        <label className="block mb-1 font-medium">Note</label>
        <input
          type="text"
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full p-2 bCheckout rounded bg-gray-50 dark:bg-gray-700 dark:bCheckout-gray-600"
          required
        />
      </div>
      {/* <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <select name="pMethod" value={formData.pMethod} onChange={handleChange} className="w-full p-2 bCheckout rounded bg-gray-50 dark:bg-gray-700 dark:bCheckout-gray-600">
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
        <tr className="bCheckout-b dark:bCheckout-gray-700">
          <th className="p-3">Name</th>
          <th className="p-3">Title</th>
          <th className="p-3">Details</th>
          <th className="p-3">Note</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Payment Method</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items
          .slice()
          .reverse()
          .map((item) => (
            <tr key={item.id} className="bCheckout-b dark:bCheckout-gray-700">
              <td className="p-3">{item.fullName}</td>
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.details}</td>
              <td className="p-3">{item.note}</td>
              <td className="p-3">{item.amount.toFixed(2)}</td>
              <td className="p-3">{item.method}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => onEdit(item)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const OrderPage: React.FC = () => {
  const [CheckoutList, setCheckoutList] = React.useState<Checkout[]>([]);
  const [loading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://admin.ashaa.xyz/api/Checkout");
      const json = await res.json();
      setCheckoutList(json.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(CheckoutList, "CheckoutList");

  return (
    <CrudComponent<Checkout>
      title="Manage Checkouts"
      itemType="Checkout"
      initialItems={CheckoutList}
      renderTable={(items, onEdit, onDelete) => (
        <CheckoutTable items={items} onEdit={onEdit} onDelete={onDelete} />
      )}
      renderForm={(onSubmit, onCancel, isLoading, initialData) => (
        <CheckoutForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
          initialData={initialData}
        />
      )}
    />
  );
};

export default OrderPage;
