import Button from "@/components/ui/Button";
import { Checkout } from "@/types";
import React from "React";


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

export default CheckoutTable;