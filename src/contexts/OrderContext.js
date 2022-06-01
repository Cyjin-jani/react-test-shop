import { createContext, useState, useMemo, useEffect } from 'react';

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500,
};

function calculateSubtotal(orderType, orderCounts) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  // total 관련 state
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculateSubtotal('products', orderCounts);
    const optionsTotal = calculateSubtotal('options', orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    // data를 업데이트 해 줄 함수 (수량을 업데이트)
    function updateItemCount(itemName, newItemCount, orderType) {
      // 새롭게 복사 (state는 바로 바꿀 수 없으므로)
      const newOrderCounts = { ...orderCounts };
      // products를 위한 건지, options를 위한건지
      const orderCountsMap = orderCounts[orderType];
      // key에 따라 어떤 선택지를 올려줄 지 정하여 올려준다.
      orderCountsMap.set(itemName, parseInt(newItemCount));
      // state를 변경해준다.
      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
