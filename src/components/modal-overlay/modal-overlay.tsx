import React, { MutableRefObject } from "react";
import styles from "./modal-overlay.module.css";
import { FCC } from "../../utils/types";

export const ModalOverlay: FCC<{ refObj: MutableRefObject<null> }> = (
  props
) => {
  return (
    <div className={styles.modalOverlay} ref={props.refObj}>
      {props.children}
    </div>
  );
};
