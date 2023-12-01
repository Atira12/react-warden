import { useContext } from "react";
import ReactWardenContext from "../provider/react-warden.context";
import { ReactWardenContextInterface } from "../provider/warden-provider.types";

const useWarden = () => {
  return useContext<ReactWardenContextInterface>(ReactWardenContext);
};

export default useWarden;
