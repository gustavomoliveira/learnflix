import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VisualizarPage from "./VisualizarPage";

describe("VisualizarPage", () => {
    test("renderiza a lista completa de todas disciplinas na tela", () => {
        render(<VisualizarPage />);

        expect(
            screen.getByRole("heading", { name: /disciplinas/i })
        ).toBeInTheDocument();
        expect(screen.getByText(/frontend com react/i)).toBeInTheDocument();
        expect(screen.getByText(/javascript avançado/i)).toBeInTheDocument();
        expect(screen.getByText(/ux e ui design/i)).toBeInTheDocument();
        expect(screen.getByText(/banco de dados/i)).toBeInTheDocument();
        expect(screen.getByText(/engenharia de software/i)).toBeInTheDocument();

        expect(screen.getAllByRole("button", { name: /acessar/i })).toHaveLength(5);
    });

    test("acessar uma disciplina especifica e visualizar seus materiais", () => {
        render(<VisualizarPage />);

        const botoesAcessar = screen.getAllByRole("button", { name: /acessar/i });
        userEvent.click(botoesAcessar[0]);
        expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
        expect(screen.getByText("Frontend com React")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /introdução ao react/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /componentes e props/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /hooks na prática/i })).toBeInTheDocument();
        expect(screen.getAllByRole("link")).toHaveLength(3);
    });

    test("permite voltar para a lista de disciplinas apos clicar em uma disciplina especifica", () => {
        render(<VisualizarPage />);
        const botoesAcessar = screen.getAllByRole("button", { name: /acessar/i });
        userEvent.click(botoesAcessar[0]);
        const botaoVoltar = screen.getByRole("button", { name: /voltar/i });
        userEvent.click(botaoVoltar);
        expect(
            screen.getByRole("heading", { name: /disciplinas/i })
        ).toBeInTheDocument();

        expect(screen.getByText("Frontend com React")).toBeInTheDocument();
        expect(screen.getAllByRole("button", { name: /acessar/i })).toHaveLength(5);
    });
    test("exibe mensagem quando a disciplina não possui materiais", () => {
        render(<VisualizarPage />);
        const botoesAcessar = screen.getAllByRole("button", { name: /acessar/i });
        userEvent.click(botoesAcessar[4]);
        expect(screen.getByText("Engenharia de Software")).toBeInTheDocument();
        expect(
            screen.getByText(/esta disciplina ainda não possui materiais/i)
        ).toBeInTheDocument();
    });
});