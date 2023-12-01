import { createContext } from "react";
import { ReactWardenContextInterface } from "./warden-provider.types";

const PROVIDER_NOT_SET_ERROR = "Provider not set";

const defaultContextValue: ReactWardenContextInterface = {
  checkRoleAccess: () => {
    throw new Error(PROVIDER_NOT_SET_ERROR);
  },
  checkPermissionAccess: () => {
    throw new Error(PROVIDER_NOT_SET_ERROR);
  },
};

const ReactWardenContext =
  createContext<ReactWardenContextInterface>(defaultContextValue);

export default ReactWardenContext;
