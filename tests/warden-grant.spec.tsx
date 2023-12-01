import WardenGrant from "../lib/components/warden-grant.component";
import { testPerm, testRole, renderWithProvider } from "./jest.setup";

const simpleInnerComponent = <h1>Test</h1>;
const testFallback = <div>Issue</div>;

describe("ReactWardenProvider with WardenGrant component tests", () => {
  it("when using grant component , should not allow unpermitted users", () => {
    const component = (
      <WardenGrant roles={[testRole]} permissions={[testPerm]}>
        {simpleInnerComponent}
      </WardenGrant>
    );
    const { container } = renderWithProvider(component, ["unpermitted"], []);
    const { container: expected } = renderWithProvider(undefined);

    expect(container.innerHTML).toEqual(expected.innerHTML);
  });
  it("when using grant component with unpermited user without fallback override, should show default fallback component", () => {
    const component = (
      <WardenGrant roles={[testRole]} permissions={[testPerm]}>
        {simpleInnerComponent}
      </WardenGrant>
    );
    const { container } = renderWithProvider(
      component,
      ["unpermitted"],
      [],
      testFallback,
    );
    const { container: expected } = renderWithProvider(testFallback);

    expect(container.innerHTML).toEqual(expected.innerHTML);
  });
  it("when using grant component with unpermited user with fallback override, should show override fallback component", () => {
    const overrideFallback = <div>Override</div>;
    const component = (
      <WardenGrant
        roles={[testRole]}
        permissions={[testPerm]}
        fallback={overrideFallback}
      >
        {simpleInnerComponent}
      </WardenGrant>
    );
    const { container } = renderWithProvider(
      component,
      ["unpermitted"],
      [],
      testFallback,
    );
    const { container: expected } = renderWithProvider(overrideFallback);

    expect(container.innerHTML).toEqual(expected.innerHTML);
  });
  it("when using grant component , should allow only permitted users", () => {
    const component = (
      <WardenGrant roles={[testRole]} permissions={[testPerm]}>
        {simpleInnerComponent}
      </WardenGrant>
    );
    const { container: permittedWithRole } = renderWithProvider(
      component,
      [testRole],
      [],
    );
    const { container: permittedWithPermission } = renderWithProvider(
      component,
      [],
      [testPerm],
    );
    const { container: notPermitted } = renderWithProvider(component, [
      "invalid-role",
    ]);

    const { container: expected } = renderWithProvider(
      simpleInnerComponent,
      [testRole],
      [testPerm],
    );
    const { container: expectedNotPermitted } = renderWithProvider(
      undefined,
      [testRole],
      [testPerm],
    );

    expect(permittedWithRole.innerHTML).toEqual(expected.innerHTML);
    expect(permittedWithPermission.innerHTML).toEqual(expected.innerHTML);
    expect(notPermitted.innerHTML).toEqual(expectedNotPermitted.innerHTML);
  });
  it("when using grant component with not flag, should allow users that do not have any of the roles or permissions", () => {
    const component = (
      <WardenGrant not roles={[testRole]} permissions={[testPerm]}>
        {simpleInnerComponent}
      </WardenGrant>
    );

    const { container } = renderWithProvider(component);
    const { container: unpermitted } = renderWithProvider(component, [
      testRole,
    ]);
    const { container: expected } = renderWithProvider(simpleInnerComponent);
    const { container: expectedNotPermitted } = renderWithProvider(undefined);

    expect(container.innerHTML).toEqual(expected.innerHTML);
    expect(unpermitted.innerHTML).toEqual(expectedNotPermitted.innerHTML);
  });

  it("when using grant component with not flag and no role & permission checking , should allow all users", () => {
    const component = <WardenGrant not>{simpleInnerComponent}</WardenGrant>;

    const { container } = renderWithProvider(component);
    const { container: allowed } = renderWithProvider(
      component,
      [testRole],
      [testPerm],
    );
    const { container: expected } = renderWithProvider(simpleInnerComponent);

    expect(container.innerHTML).toEqual(expected.innerHTML);
    expect(allowed.innerHTML).toEqual(expected.innerHTML);
  });

  it("when using grant component with no role & permission checking , should deny all users", () => {
    const component = <WardenGrant>{simpleInnerComponent}</WardenGrant>;

    const { container } = renderWithProvider(component);
    const { container: allowed } = renderWithProvider(
      component,
      [testRole],
      [testPerm],
    );
    const { container: expected } = renderWithProvider(undefined);

    expect(container.innerHTML).toEqual(expected.innerHTML);
    expect(allowed.innerHTML).toEqual(expected.innerHTML);
  });
});
