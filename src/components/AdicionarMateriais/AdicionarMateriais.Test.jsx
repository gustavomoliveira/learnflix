import { render, screen, fireEvent, act } from "@testing-library/react";
import AdicionarMateriais from "./AdicionarMateriais";

describe("AdicionarMateriais", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test("renderiza os campos do formulário e o botão", () => {
        render(<AdicionarMateriais adicionarMaterial={jest.fn()} />);

        expect(screen.getByLabelText(/titulo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/upload arquivo/i)).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /adicionar material/i })
        ).toBeInTheDocument();
    });