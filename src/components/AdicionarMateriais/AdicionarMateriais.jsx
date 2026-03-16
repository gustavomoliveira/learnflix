import styles from "./AdicionarMateriais.module.css"
import {useState} from "react";


export default function AdicionarMateriais({adicionarMaterial}) {

    const [titulo, setTitulo] = useState("");

    const [descricao, setDescricao] = useState("");

    const [arquivo, setArquivo] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(()=> {

                 const novoMaterial = {
                     id: Date.now(),
                     titulo: titulo,
                     descricao: descricao,
                     nomeArquivo: arquivo.name,
                     tipoArquivo: arquivo.type,
                 }


                 adicionarMaterial(novoMaterial);

            setTitulo("");
                 setDescricao("");
                 setArquivo(null);

            setLoading(false);
        },2000);
    }

    return (
        <form onSubmit={handleSubmit}  className={styles.formulario}>
            <label htmlFor={"titulo"}>Titulo: </label>
            <input type="text" value={titulo}  id={"titulo"} placeholder= "Titulo do Material" onChange={(e) => setTitulo(e.target.value)} required={true} />
            <label htmlFor={"descricao"}>Descrição: </label>
            <textarea id={"descricao"} value={descricao} placeholder= "Descrição do Conteudo" onChange={(e) => setDescricao(e.target.value)}  />
            <label htmlFor={"upload"}>Upload Arquivo: </label>
            <input type="file" id={"upload"} onChange={(e) => setArquivo(e.target.files[0]) } accept=".jpg,.png,.pdf,.doc,.docx" required={true} /><button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Adicionar Material'}
        </button>
        </form>

    );
}