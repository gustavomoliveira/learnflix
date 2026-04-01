import styles from "./ListaMateriais.module.css";

export default function ListaMateriais({materiais, excluirMaterial}) {


    return (
        <div className={styles.container}>
            {materiais.map((material) => (
                <div key={material.id} className={styles.materialItem}>
                    <div className={styles.materialInfo}>
                        <h3>{material.titulo}</h3>
                        {material.descricao && <p>{material.descricao}</p>}
                        <span>Arquivo: {material.nomeArquivo}</span>
                        <span>Tipo: {material.tipoArquivo}</span>
                    </div>
                    <button
                        onClick={() => excluirMaterial(material.id)}
                        className={styles.btnExcluir}
                    >
                        Excluir
                    </button>
                </div>
            ))}
        </div>
    )
}
