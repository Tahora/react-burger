import React, { useRef }from "react";
import styles from "./constructorItem.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag, useDrop} from "react-dnd";
import {  useDispatch } from 'react-redux';
import {replaceConstructorItem} from "../../services/actions";

export function ConstructorItem(props) {

  const dispatch = useDispatch();
  const index=props.index;
  const [collectedDrag, dragRef] = useDrag({
    type: props.dragType,
    item:  {index}
  })


  const [collected, dropRef] = useDrop({
    accept: 'constructorItem',
    drop(item)  {
      const dragIndex = item.index;
    dispatch(replaceConstructorItem(dragIndex, index));}

  })

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))

  return (
    <div className={styles.item}   {...(props.dragType==="constructorItem" && { ref: dragDropRef})} >
      <div className={props.isLocked ? styles.invisible : ""}>
        <DragIcon type="primary" />
      </div>
      {<ConstructorElement {...props} />}
    </div>
  );
}

ConstructorItem.propTypes = {
  type: PropTypes.oneOf(["top", "bottom"]),
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  dragType:PropTypes.oneOf(["bun", "constructorItem"]).isRequired,
  index:PropTypes.number.isRequired
};
