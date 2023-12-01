import { PropsWithChildren, ReactElement } from "react";

export interface ReactWardenContextInterface {
  checkRoleAccess: (allowedRoles: string[]) => boolean;
  checkPermissionAccess: (allowedPermissions: string[]) => boolean;
  fallback?: ReactElement;
}

export interface ReactWardenPropsInterface extends PropsWithChildren {
  roles?: string[];
  permissions?: string[];
  fallback?: ReactElement;
}
