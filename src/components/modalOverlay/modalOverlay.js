import React from "react";
import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

export function ModalOverlay(props) {
  return (
    <div className={styles.modalOverlay} ref={props.refObj}>
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  refObj: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  children: PropTypes.node.isRequired,
};
