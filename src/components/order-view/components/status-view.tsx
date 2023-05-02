import styles from "./status-view.module.css";
import { orderStates } from "../../../utils/constants";
import React from "react";
import {TOrderStatus} from "../../../utils/types";

export const StatusView: React.FC<{ status:  TOrderStatus|undefined }> = (props)=>{
  return (
    <p
      className={`text text_type_main-default ${
        props?.status === "done" && styles.blue
      }`}
    >
      {`${props?.status?orderStates[props?.status]:''}`}
    </p>
  );
}

