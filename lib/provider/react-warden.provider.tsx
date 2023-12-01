import { FC, useCallback, useMemo } from "react";
import ReactWardenContext from "./react-warden.context";
import { ReactWardenPropsInterface } from "./warden-provider.types";

const ReactWardenProvider: FC<ReactWardenPropsInterface> = ({
  children,
  roles: userRoles = [],
  permissions: userPermissions = [],
  fallback,
}) => {
  const roles = useMemo(() => new Set(userRoles), [userRoles]);
  const permissions = useMemo(
    () => new Set(userPermissions),
    [userPermissions],
  );

  const checkRoleAccess = useCallback(
    (permittedRoles: string[]) => {
      return permittedRoles.some((role) => roles.has(role));
    },
    [roles],
  );

  const checkPermissionAccess = useCallback(
    (permittedPermissions: string[]) => {
      return permittedPermissions.some((permission) =>
        permissions.has(permission),
      );
    },
    [permissions],
  );

  return (
    <ReactWardenContext.Provider
      value={{ checkRoleAccess, checkPermissionAccess, fallback }}
    >
      {children}
    </ReactWardenContext.Provider>
  );
};

export default ReactWardenProvider;
