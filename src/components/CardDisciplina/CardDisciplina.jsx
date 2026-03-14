import styles from './CardDisciplina.module.css';

export default function CardDisciplina({ disc, onAbrirModalEdicao, onToggleStatus }) {
    function getBtnConfig(status) {
        if (status === 'ativa') {
            return { texto: 'Inativar', classe: styles.btnStatusInativo };
        }
        return { texto: 'Reativar', classe: styles.btnStatusAtivo };
    }

    const { texto, classe } = getBtnConfig(disc.status);

    return (
        <article className={styles.card}>
            <h2 className={styles.title}>{disc.nome}</h2>

            <div className={styles.info}>
                <p className={styles.codigo}><span className={styles.span}>Código:</span> {disc.codigo}</p>
                <p className={styles.alunos}><span className={styles.span}>Alunos:</span> {disc.alunosMatriculados}</p>
                <span className={disc.status === "ativa" ? styles.status : styles.statusInativa }><span className={styles.span}>Status:</span> {disc.status}</span>
            </div>

            <div className={styles.btns}>
                <button onClick={() => onAbrirModalEdicao(disc)} type={"button"} className={styles.btnEditar}>Editar</button>
                <button onClick={() => onToggleStatus(disc.id)} className={classe} type={"button"}>{texto}</button>
            </div>
        </article>
    );
}