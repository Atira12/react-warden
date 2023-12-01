import { renderWithProvider } from "./jest.setup";

describe("ReactWardenProvider tests", () => {
  it("when rendering ReactWardenProvider, should not  have any issue ", () => {
    const component = <h1>Render Test</h1>;
    expect(() => renderWithProvider(component)).not.toThrow();
  });
});
