import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { WS_BASE_URL, WS_BASE_URL_ALL } from "../../utils/api";
import {
  startWsConnection,
  stopWsConnection,
} from "../../services/actions/websocket";

export function WsConnector(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const filterUserOrders = location.pathname.startsWith("/profile");

  useEffect(() => {
    const url = filterUserOrders ? WS_BASE_URL : WS_BASE_URL_ALL;
    dispatch(startWsConnection(url, filterUserOrders));
    return () => {
      dispatch(stopWsConnection());
    };
  }, [location.pathname]);

  return props.children;
}
