import { useMemo } from "react";
import { v4 } from "uuid";
import { useAppSelector } from "./redux";
import { IOrderIngredients } from "../utils/types";

export function useOrderInfo(orderId: string | undefined) {
  const order = useAppSelector((state) =>
    state.ws?.messages[state.ws?.messages.length - 1]?.orders?.find((i) => {
      return i?._id === orderId;
    })
  );

  const ingredients = useAppSelector((store) =>
    order?.ingredients?.map((oi) => {
      return store.ingredients.ingredients.find((i) => {
        return i?._id === oi;
      });
    })
  );

  const total = useMemo(() => {
    return ingredients?.reduce((prevVal, item) => {
      prevVal += item?.price ? item.price : 0;
      return prevVal;
    }, 0);
  }, [ingredients]);

  const uniqueIngredients = ingredients?.reduce(
    (prevVal: IOrderIngredients, i) => {
      if (i?._id) {
        prevVal[i._id] = {
          image: i.image,
          uuid: prevVal[i._id]?.uuid || v4(),
          name: i.name,
          price: i.price,
          count: (prevVal[i._id]?.count || 0) + 1,
        };
      }
      return prevVal;
    },
    {}
  );

  return { order, total, uniqueIngredients };
}
