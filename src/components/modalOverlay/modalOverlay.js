import React from 'react';
import styles from './modalOverlay.module.css';
import PropTypes from "prop-types";


export function ModalOverlay(props) {

    return (
        <div className={styles.modalOverlay} ref={props.refobj}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    refobj: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
    children: PropTypes.node
}
