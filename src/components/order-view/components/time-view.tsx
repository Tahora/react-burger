import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const TimeView: React.FC<{ date: string|undefined }> = (props)=>{
    const dt = props?.date?new Date(props.date):undefined;
  const tzo = dt?-dt.getTimezoneOffset() / 60:'';
  return (
    <div className={`text text_type_main-default text_color_inactive`}>
        {dt &&
            <FormattedDate
                className="text text_type_main-default text_color_inactive"
                date={dt}
            />
        }
      {` i-GMT${tzo >= 0 ? "+" : "-"}${tzo}`}
    </div>
  );
}


