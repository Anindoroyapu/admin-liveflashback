import React, { useEffect, useState } from "react";
import OrderListTable from "./OrderListTable";
import OrderListTableHeaderSection from "./OrderListTableHeaderSection";
import OrderProgressBarSection from "./OrderProgressBarSection";
import { Checkout } from "@/types";



const statuses = [
  { id: 1, label: "Pending", colorClass: "bg-yellow-500" },
  { id: 2, label: "Confirmed", colorClass: "bg-indigo-600" },
  { id: 3, label: "Processing", colorClass: "bg-blue-500" },
  { id: 4, label: "Shipped", colorClass: "bg-teal-600" },
  { id: 5, label: "Out For Delivery", colorClass: "bg-orange-500" },
  { id: 6, label: "Delivered", colorClass: "bg-green-600" },
  { id: 7, label: "Canceled", colorClass: "bg-red-600" },
  { id: 8, label: "Returned", colorClass: "bg-purple-600" },
  { id: 9, label: "Refunded", colorClass: "bg-pink-500" },
  { id: 10, label: "Failed", colorClass: "bg-gray-700" },
];

const normalize = (s?: string) =>
  (s || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

const OrderTabsSection: React.FC<{item:Checkout}> = ({item}) => {
  const [active, setActive] = useState<number>(1);

 

  // On mount, read ?status= from URL (accepts id or label) and set active tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get("status");
    if (!statusParam) return;

    const id = parseInt(statusParam, 10);
    if (!Number.isNaN(id) && statuses.some((s) => s.id === id)) {
      setActive(id);
      return;
    }

    // try matching by label (normalized)
    const found = statuses.find(
      (s) => normalize(s.label) === normalize(statusParam)
    );
    if (found) {
      setActive(found.id);
    }
  }, []);

  // helper to update URL without reloading the page
  const updateUrlStatus = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("status", value);
    window.history.replaceState({}, "", url.toString());
  };

  const handleTabClick = (id: number) => {
    setActive(id);
    updateUrlStatus(String(id));
  };

  const total = statuses.length;
  const percent = Math.round((active / total) * 100);
  const activeColor =
    statuses.find((s) => s.id === active)?.colorClass ?? "bg-indigo-600";

  return (
    <div>
      {/* Progress bar above tabs */}
      <OrderProgressBarSection percent={percent} activeColor={activeColor} />

      <nav className="order-tabs" aria-label="Order status tabs">
        <ul className="flex gap-2 list-none p-0 m-0">
          {statuses.map((s) => {
            const isActive = s.id === active;
            return (
              <li key={s.id}>
                <button
                  id={`tab-${s.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`status-${s.id}`}
                  type="button"
                  onClick={() => handleTabClick(s.id)}
                  className={
                    "px-3 py-2 rounded border text-sm font-medium transition-colors " +
                    (isActive
                      ? `${s.colorClass} text-white border-transparent`
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50")
                  }
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {statuses.map((s) => {
        const isActive = s.id === active;

        // const filtered = item.filter(
        //   (o) => normalize(o.status) === normalize(s.label)
        // );

        return (
          <section
            key={s.id}
            id={`status-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            hidden={!isActive}
            className={
              (isActive ? "block" : "hidden") +
              " pt-3 border-t border-gray-100 mt-2"
            }
          >
            <div>
              <div className="mt-4">
                <table className="w-full text-left">
                  <thead>
                    <OrderListTableHeaderSection />
                  </thead>
                  <tbody>
                    {item?.length > 0 ? (
                      item
                        .slice()
                        .reverse()
                        .map((order) => (
                          <OrderListTable
                            key={order.id}
                            order={order}
                            status={statuses.map((st) => st.label)}
                            btncolor={statuses.map((st) => st.colorClass)}
                          />
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center p-8 text-slate-500"
                        >
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default OrderTabsSection;
