import React from "react";
import styles from './headerItem.module.css';

function HeaderItem (props) {
    const IconName = props.icon;
    return (
        <a href="#" className={`${styles.headerItem} pl-5 pr-5 pb-4 pt-4  text text_type_main-default`}>
            <IconName type="primary"/>
            <span className={styles.headerItemCaption}> {props.caption} </span>
        </a>
    )
}

export default HeaderItem;
