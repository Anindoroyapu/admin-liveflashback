import React, { FC } from "react";

const OrderProgressBarSection: FC<{ percent: number; activeColor: string }> = ({
  percent,
  activeColor,
}) => {
  return (
    <div className="mb-3">
      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${percent}%` }}
          className={`h-2 rounded-full transition-all ${activeColor}`}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{percent}% complete</div>
    </div>
  );
};

export default OrderProgressBarSection;
