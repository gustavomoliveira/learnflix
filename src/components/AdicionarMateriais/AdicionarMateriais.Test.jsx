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
    test("renderiza os campos do formulário e o botao", () => {
        render(<AdicionarMateriais adicionarMaterial={jest.fn()} />);

        expect(screen.getByLabelText(/titulo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/upload arquivo/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /adicionar material/i })
        ).toBeInTheDocument();
    });
    test("botao muda para 'Carregando...'", () => {
        render(<AdicionarMateriais adicionarMaterial={jest.fn()} />);
        fireEvent.change(screen.getByLabelText(/titulo/i), {
            target: { value: "Material Teste" },
        });

        fireEvent.change(screen.getByLabelText(/descrição/i), {
            target: { value: "Descrição Teste" },
        });
        const arquivo = new File(["conteudo"], "react.pdf", {
            type: "application/pdf",
        });
        const inputUpload = screen.getByLabelText(/upload arquivo/i);
        fireEvent.change(inputUpload, { target: { files: [arquivo] } });

        fireEvent.click(screen.getByRole("button", { name: /adicionar material/i }));
        expect(
            screen.getByRole("button", { name: /carregando/i })
        ).toBeInTheDocument();
    });
    test("chama adicionarMaterial com dados corretos e limpa os campos", () => {
        const adicionarMaterialMock = jest.fn();
        render(<AdicionarMateriais adicionarMaterial={adicionarMaterialMock} />);

        const inputTitulo = screen.getByLabelText(/titulo/i);
        const inputDescricao = screen.getByLabelText(/descrição/i);
        const inputUpload = screen.getByLabelText(/upload arquivo/i);

        fireEvent.change(inputTitulo, { target: { value: "React Hooks" } });
        fireEvent.change(inputDescricao, {
            target: { value: "Material sobre useState e useEffect" },
        });

        const arquivo = new File(["conteudo"], "hooks.pdf", {
            type: "application/pdf",
        });

        fireEvent.change(inputUpload, { target: { files: [arquivo] } });

        fireEvent.click(screen.getByRole("button", { name: /adicionar material/i }));

        act(() => {
            jest.advanceTimersByTime(2000);
        });
        expect(adicionarMaterialMock).toHaveBeenCalledTimes(1);
        expect(adicionarMaterialMock).toHaveBeenCalledWith(
            expect.objectContaining({
                titulo: "React Hooks",
                descricao: "Material sobre useState e useEffect",
                nomeArquivo: "hooks.pdf",
                tipoArquivo: "application/pdf",
            })
        );

        expect(inputTitulo).toHaveValue("");
        expect(inputDescricao).toHaveValue("");
    });
});