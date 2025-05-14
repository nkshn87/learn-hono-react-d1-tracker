import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
	it("renders greeting text", () => {
		render(<App />);
		expect(screen.getByText("Hello from TopPage")).toBeInTheDocument();
	});
});
