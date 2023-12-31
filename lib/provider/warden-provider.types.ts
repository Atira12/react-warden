import { PropsWithChildren, ReactNode } from "react";

export interface ReactWardenContextInterface {
  checkRoleAccess: (allowedRoles: string[]) => boolean;
  checkPermissionAccess: (allowedPermissions: string[]) => boolean;
  fallback?: ReactNode;
}

export interface ReactWardenPropsInterface extends PropsWithChildren {
  roles?: string[];
  permissions?: string[];
  fallback?: ReactNode;
}
