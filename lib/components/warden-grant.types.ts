import { PropsWithChildren, ReactElement } from "react";

export interface WardenGrantPropsInterface extends PropsWithChildren {
  not?: boolean;
  roles?: string[];
  permissions?: string[];
  fallback?: ReactElement;
}
