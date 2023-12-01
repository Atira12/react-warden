import { ReactElement, ReactNode } from "react";
import ReactWardenProvider from "../lib/provider/react-warden.provider";
import { render } from "@testing-library/react";

export const testRole = "test-role";
export const testPerm = "test-permission";
export const renderWithProvider = (
  children?: ReactNode,
  roles: string[] = [],
  permissions: string[] = [],
  fallback?: ReactElement,
) => {
  return render(
    <ReactWardenProvider
      roles={roles}
      fallback={fallback}
      permissions={permissions}
    >
      {children}
    </ReactWardenProvider>,
  );
};
