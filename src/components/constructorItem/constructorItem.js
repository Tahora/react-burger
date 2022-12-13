import React, { useRef } from "react";
import styles from "./constructorItem.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { replaceConstructorItem } from "../../services/actions/constructor";
import { dragTypesConstructor } from "../../utils/constants";

export function ConstructorItem(props) {
  const dispatch = useDispatch();
  const index = props.index;
  const [collectedDrag, dragRef] = useDrag({
    type: props.dragType,
    item: { index },
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: dragTypesConstructor.other,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      const dragIndex = item.index;
      if (dragIndex != index) {
        dispatch(replaceConstructorItem(dragIndex, index));
      }
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <div
      className={`${styles.item}  ${isHover ? styles.indented : ""}`}
      {...(props.dragType === dragTypesConstructor.other && {
        ref: dragDropRef,
      })}
    >
      <div className={`${props.isLocked ? styles.invisible : ""}`}>
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
  dragType: PropTypes.oneOf([
    dragTypesConstructor.other,
    dragTypesConstructor.bun,
  ]).isRequired,
  index: PropTypes.number.isRequired,
};
