import { PropsWithChildren, ReactNode } from "react";

export interface WardenGrantPropsInterface extends PropsWithChildren {
  not?: boolean;
  roles?: string[];
  permissions?: string[];
  fallback?: ReactNode;
}
