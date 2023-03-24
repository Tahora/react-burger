import React from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export function Modal(props) {
  const overlayRef = React.useRef(null);
  const closeRef = React.useRef(null);

  function close(e) {
    if (
      e.target === overlayRef.current ||
      e.currentTarget === closeRef.current
    ) {
      e.stopPropagation();
      props.hideFunction(e);
    }
  }

  React.useEffect(() => {
    const closeByEsc = (e) => {
      if (e.key === "Escape") {
        props.hideFunction(e);
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
    return ReactDOM.createPortal(modal, modalRoot);
  } else {
    return { modal };
  }
}

Modal.propTypes = {
  hideFunction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOver: PropTypes.bool.isRequired,
};
