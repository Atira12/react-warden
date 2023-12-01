import { render } from "@testing-library/react";
import useWarden from "../lib/hooks/use-warden";
import { ReactWardenContextInterface } from "../lib/provider/warden-provider.types";
import { act } from "react-dom/test-utils";
import { testPerm, testRole, renderWithProvider } from "./jest.setup";

const simpleInnerComponent = <h1>Test</h1>;

const ConditionalRoleComponent = () => {
  const { checkRoleAccess } = useWarden();
  if (checkRoleAccess([testRole])) {
    return simpleInnerComponent;
  }
  return <></>;
};

const ConditionalPermComponent = () => {
  const { checkPermissionAccess } = useWarden();
  if (checkPermissionAccess([testPerm])) {
    return simpleInnerComponent;
  }
  return <></>;
};

describe("RenderWardenProvider with hook tests", () => {
  it("when using hook without provider, should throw error", async () => {
    let propsValue: ReactWardenContextInterface;
    const HookComponent = () => {
      propsValue = useWarden();
      return <></>;
    };
    const component = <HookComponent />;
    await act(async () => {
      render(component);
    });
    expect(() => propsValue.checkRoleAccess([])).toThrow("Provider not set");
    expect(() => propsValue.checkPermissionAccess([])).toThrow(
      "Provider not set",
    );
  });
  it("when using hook with provider, should not throw error", async () => {
    let propsValue: ReactWardenContextInterface;
    const HookComponent = () => {
      propsValue = useWarden();
      return <></>;
    };
    const component = <HookComponent />;
    await act(async () => {
      renderWithProvider(component);
    });
    expect(() => propsValue.checkRoleAccess([])).not.toThrow();
    expect(() => propsValue.checkPermissionAccess([])).not.toThrow();
  });
  it("when using hook with appropriate role, should render appropriate component", () => {
    const HookComponent = () => {
      const { checkRoleAccess } = useWarden();
      if (checkRoleAccess([testRole])) {
        return simpleInnerComponent;
      }
      return <></>;
    };
    const component = <HookComponent />;
    const { container } = renderWithProvider(component, [testRole]);
    const { container: expected } = renderWithProvider(simpleInnerComponent);
    expect(container.innerHTML).toEqual(expected.innerHTML);
  });
  it("when using hook with appropriate role, should render appropriate component", () => {
    const component = <ConditionalRoleComponent />;
    const { container } = renderWithProvider(component, [testRole]);
    const { container: expected } = renderWithProvider(simpleInnerComponent);
    expect(container.innerHTML).toEqual(expected.innerHTML);
  });
  it("when using hook with appropriate permission, should render appropriate component", () => {
    const component = <ConditionalPermComponent />;
    const { container } = renderWithProvider(component, [], [testPerm]);
    const { container: expected } = renderWithProvider(simpleInnerComponent);
    expect(container.innerHTML).toEqual(expected.innerHTML);
  });
  it("when using hook without appropriate role, should render empty component", () => {
    const component = <ConditionalRoleComponent />;
    const { container } = renderWithProvider(component, [testPerm]);
    const { container: expected } = renderWithProvider(simpleInnerComponent);
    expect(container.innerHTML).not.toEqual(expected.innerHTML);
  });
  it("when using hook without appropriate permission, should render empty component", () => {
    const component = <ConditionalPermComponent />;
    const { container } = renderWithProvider(component, [], [testRole]);
    const { container: expected } = renderWithProvider(simpleInnerComponent);
    expect(container.innerHTML).not.toEqual(expected.innerHTML);
  });
  it("when using hook with appropriate role & permission, should render both components", () => {
    const component = (
      <>
        <ConditionalRoleComponent />
        <ConditionalPermComponent />
      </>
    );
    const expectedInnerComponents = (
      <>
        {simpleInnerComponent}
        {simpleInnerComponent}
      </>
    );
    const { container } = renderWithProvider(component, [testRole], [testPerm]);
    const { container: expected } = renderWithProvider(expectedInnerComponents);
    expect(container.innerHTML).toEqual(expected.innerHTML);
  });
});
