import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { WS_BASE_URL, WS_BASE_URL_ALL } from "../../utils/api";
import {
  startWsConnection,
  stopWsConnection,
} from "../../services/actions/websocket";
import { useAppDispatch } from "../../hooks/redux";
import { FCC } from "../../utils/types";

export const WsConnector: FCC = (props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const filterUserOrders = location.pathname.startsWith("/profile");

  useEffect(() => {
    const url = filterUserOrders ? WS_BASE_URL : WS_BASE_URL_ALL;
    dispatch(startWsConnection(url, filterUserOrders));
    return () => {
      dispatch(stopWsConnection());
    };
  }, [location.pathname]);

  return <>{props.children}</>;
};
