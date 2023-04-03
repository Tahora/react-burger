import styles from "./status-view.module.css";
import { orderStates } from "../../../utils/constants";
import PropTypes from "prop-types";

export function StatusView(props) {
  return (
    <p
      className={`text text_type_main-default ${
        props?.status === "done" && styles.blue
      }`}
    >
      {`${orderStates[props?.status]}`}
    </p>
  );
}

StatusView.propTypes = {
  status: PropTypes.oneOf(["done", "pending", "created"]).isRequired,
};
