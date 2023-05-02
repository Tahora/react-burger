import React, { useRef } from "react";
import styles from "./constructor-item.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { replaceConstructorItem } from "../../services/actions/constructor";
import { dragTypesConstructor } from "../../utils/constants";
import { TBunPosition, TDragItem } from "../types";
import {useAppDispatch} from "../../hooks/redux";

interface IConstructorItem {
  type?: TBunPosition;
  text: string;
  price: number;
  thumbnail: string;
  isLocked: boolean;
  dragType: TDragItem;
  index: number;
  handleClose?: () => void;
}

export function ConstructorItem(props: IConstructorItem) {
  const { isLocked, dragType, index } = props;
  const dispatch = useAppDispatch();
  const [, dragRef] = useDrag<{ dragIndex: number }>({
    type: dragType,
    item: { dragIndex: index },
  });

  const [{ isHover }, dropRef] = useDrop<
    { dragIndex: number },
    unknown,
    { isHover: boolean }
  >({
    accept: dragTypesConstructor.other,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop({ dragIndex }) {
      if (dragIndex !== index) {
        dispatch(replaceConstructorItem(dragIndex, index));
      }
    },
  });

  const ref = useRef(null);
  dragRef(dropRef(ref));

  return (
    <div
      className={`${styles.item}  ${isHover ? styles.indented : ""}`}
      {...(dragType === dragTypesConstructor.other && {
        ref: ref,
      })}
    >
      <div className={`${isLocked ? styles.invisible : ""}`}>
        <DragIcon type="primary" />
      </div>
      {<ConstructorElement {...props} />}
    </div>
  );
}
