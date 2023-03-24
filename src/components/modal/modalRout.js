import React from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function ModalRout(props) {
  const navigate = useNavigate();
  const overlayRef = React.useRef(null);
  const closeRef = React.useRef(null);

  const hideFunction = (e) => {
    navigate(-1);
  };

  function close(e) {
    if (
      e.target === overlayRef.current ||
      e.currentTarget === closeRef.current
    ) {
      e.stopPropagation();
      hideFunction(e);
    }
  }

  React.useEffect(() => {
    const closeByEsc = (e) => {
      if (e.key === "Escape") {
        hideFunction(e);
      }
    };

    document.body.addEventListener("keydown", closeByEsc);
    return () => {
      document.body.removeEventListener("keydown", closeByEsc);
    };
  }, []);

  return (
    <div onClick={(e) => close(e)}>
      <ModalOverlay refObj={overlayRef}>
        <div className={`${styles.modal} pt-10 pr-10 pb-10 pl-10`}>
          <div
            className={styles.closeWrapper}
            ref={closeRef}
            onClick={(e) => close(e)}
          >
            <CloseIcon type="primary" />
          </div>
          {props.children}
        </div>
      </ModalOverlay>
    </div>
  );
}

ModalRout.propTypes = {
  children: PropTypes.node.isRequired,
};
