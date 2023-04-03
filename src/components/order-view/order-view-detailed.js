import stylesDetailed from "./order-view-detailed.module.css";
import commonStyles from "../common.module.css";
import { TimeView } from "./components/time-view";
import { PriceView } from "./components/price-view";
import { StatusView } from "./components/status-view";
import { IngredientView } from "./components/ingredient-view";
import { useOrderInfo } from "../../hooks/use-order-info";
import { useParams } from "react-router-dom";

export function OrderViewDetailed() {
  const { id } = useParams();
  const { order, total, uniqueIngredients } = useOrderInfo(id);
  if (!order)
  {
      return (<></>)
  }

  return (
    <div className={`${stylesDetailed.container}`}>
      <p
        className={`text text_type_digits-default ${stylesDetailed.text} ${stylesDetailed.centeredHorizontally}`}
      >
        {`#${order?.number}`}
      </p>
      <p className={`text text_type_main-medium mt-10`}>{`${order?.name}`}</p>
      <div className={`mt-3`}>
        <StatusView status={order?.status} />
      </div>
      <p className={`text text_type_main-medium mt-15`}>Состав:</p>

      <div
        className={` ${commonStyles.scrolledArea}  ${stylesDetailed.scrolledArea}  mt-6`}
      >
        {Object.keys(uniqueIngredients || {}).map((key, ind) => {
          const i = uniqueIngredients[key];
          return (
            <IngredientView
              key={i.uuid}
              image={i.image}
              name={i.name}
              countPrice={`${i.count}x${i.price}`}
            />
          );
        })}
      </div>
      <div className={`${stylesDetailed.results} mt-8 mb-2`}>
        <TimeView date={order?.createdAt} />
        <PriceView text={`${total}`} />
      </div>
    </div>
  );
}
