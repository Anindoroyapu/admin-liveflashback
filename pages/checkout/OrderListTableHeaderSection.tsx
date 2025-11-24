import React from "react";

const OrderListTableHeaderSection = () => {
  return (
    <tr className="border-b border-slate-200 bg-slate-50">
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Order ID
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Customer
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Phone
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Address
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Product
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Quantity
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Size
      </th>{" "}
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Shipping
      </th>{" "}
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Total
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Status
      </th>
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        Date
      </th>{" "}
      <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
        #
      </th>
    </tr>
  );
};

export default OrderListTableHeaderSection;
