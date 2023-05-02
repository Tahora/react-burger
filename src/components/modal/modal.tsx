import React, { ReactPortal, SyntheticEvent } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { FCC } from "../../utils/types";

export const Modal: FCC<{ hideFunction: () => void; isOver: boolean }> = (
  props
): ReactPortal | null | JSX.Element => {
  const overlayRef = React.useRef(null);
  const closeRef = React.useRef(null);

  function close(e: SyntheticEvent) {
    if (
      e.target === overlayRef.current ||
      e.currentTarget === closeRef.current
    ) {
      e.stopPropagation();
      props.hideFunction();
    }
  }

  React.useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.hideFunction();
      }
    };
    document.body.addEventListener("keydown", closeByEsc);
    return () => {
      document.body.removeEventListener("keydown", closeByEsc);
    };
  }, []);

  const modalRoot = document.getElementById("modals");

  const modal = (
    <div onClick={close}>
      <ModalOverlay refObj={overlayRef}>
        <div className={`${styles.modal} pt-10 pr-10 pb-10 pl-10`}>
          <div className={styles.closeWrapper} ref={closeRef} onClick={close}>
            <CloseIcon type="primary" />
          </div>
          {props.children}
        </div>
      </ModalOverlay>
    </div>
  );

  if (props.isOver) {
    return modalRoot ? ReactDOM.createPortal(modal, modalRoot) : null;
  } else {
    return modal;
  }
};
