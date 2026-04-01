import { useState } from "react";
import styles from "./VisualizarPage.module.css";
import dados from "../../data/materiais.json";

export default function VisualizarPage() {

    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

    function abrirDisciplina(disciplina) {
        setDisciplinaSelecionada(disciplina);
    }

    function voltar() {
        setDisciplinaSelecionada(null);
    }

    return (
        <div className={styles.container}>

            {!disciplinaSelecionada && (
                <>
                    <h1 className={styles.titulo}>Disciplinas</h1>

                    <div className={styles.lista}>
                        {dados.disciplinas.map((disciplina) => (
                            <div key={disciplina.id} className={styles.card}>
                                <h2>{disciplina.nome}</h2>

                                <p>
                                    {disciplina.materiais.length} materiais
                                </p>

                                <button
                                    className={styles.botao}
                                    onClick={() => abrirDisciplina(disciplina)}
                                >
                                    Acessar
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {disciplinaSelecionada && (
                <>
                    <button
                        className={styles.voltar}
                        onClick={voltar}
                    >
                        Voltar
                    </button>

                    <h2>{disciplinaSelecionada.nome}</h2>
                    <div className={styles.materiaisContainer}>
                        {disciplinaSelecionada.materiais.length === 0 && (
                            <p>
                                Esta disciplina ainda não possui materiais.
                            </p>
                        )}

                        {disciplinaSelecionada.materiais.map(material => (
                            <a
                                key={material.id}
                                href={material.arquivo}
                                download
                                className={styles.materialItem}
                            >
                                <span>
                                    {material.icone} {material.titulo}
                                </span>

                                <span>
                                    {material.tipo} • {material.data}
                                </span>
                            </a>
                        ))}

                    </div>
                </>
            )}
        </div>
    );
}
