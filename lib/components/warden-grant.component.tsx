import { FC, useCallback, useMemo } from "react";
import { WardenGrantPropsInterface } from "./warden-grant.types";
import useWarden from "../hooks/use-warden";

const WardenGrant: FC<WardenGrantPropsInterface> = ({
  children,
  roles: desiredRoles = [],
  permissions: desiredPermissions = [],
  not = false,
  fallback,
}: WardenGrantPropsInterface) => {
  const {
    checkPermissionAccess,
    checkRoleAccess,
    fallback: defaultFallback,
  } = useWarden();

  const getWardenStatus = useCallback(() => {
    if (
      checkRoleAccess(desiredRoles) ||
      checkPermissionAccess(desiredPermissions)
    ) {
      return true;
    }

    return false;
  }, [
    checkPermissionAccess,
    checkRoleAccess,
    desiredPermissions,
    desiredRoles,
  ]);

  const wardenStatus: boolean = useMemo(
    () => (not ? !getWardenStatus() : getWardenStatus()),
    [getWardenStatus, not],
  );

  return wardenStatus ? children : fallback || defaultFallback;
};

export default WardenGrant;
