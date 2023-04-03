import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

export function TimeView(props) {
  const dt = new Date(props.date);
  const tzo = -dt.getTimezoneOffset() / 60;
  return (
    <div className={`text text_type_main-default text_color_inactive`}>
      <FormattedDate
        className="text text_type_main-default text_color_inactive"
        date={dt}
      />
      {` i-GMT${tzo >= 0 ? "+" : "-"}${tzo}`}
    </div>
  );
}

TimeView.propTypes = {
  date: PropTypes.string.isRequired,
};
