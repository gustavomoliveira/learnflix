import ListaMateriais from "../../components/ListaMateriais/ListaMateriais"
import AdicionarMateriais from "../../components/AdicionarMateriais/AdicionarMateriais"
import styles from './MateriaisPage.module.css'
import { useState, useEffect } from 'react'
import dadosMateriais from '../../data/materiais.json'

export default function MateriaisPage() {
    const [materiais, setMateriais] = useState([]);

    useEffect(() => {
        const listaAchatada = dadosMateriais.disciplinas.flatMap(disciplina =>
            disciplina.materiais.map(item => ({
                id: item.id,
                titulo: item.titulo,
                descricao: `Matéria: ${disciplina.nome}`,
                nomeArquivo: item.titulo,
                tipoArquivo: item.tipo
            }))
        );

        setMateriais(listaAchatada);
    }, []);

    const adicionarMaterial = (novoMaterial) => {
        setMateriais([...materiais, { ...novoMaterial, id: Date.now() }]);
    }

    const excluirMaterial = (id) => {
        setMateriais(materiais.filter(material => material.id !== id));
    }

    return (
        <div className={styles.container}>
            <h1>Materiais Didáticos</h1>
            <AdicionarMateriais adicionarMaterial={adicionarMaterial} />
            <ListaMateriais materiais={materiais} excluirMaterial={excluirMaterial} />
        </div>
    )
}