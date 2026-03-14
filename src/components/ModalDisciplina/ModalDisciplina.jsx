import styles from "./ModalDisciplina.module.css";
import { useForm} from "react-hook-form";
import { useEffect } from "react";

export default function ModalDisciplina({ onClose, adicionarDisciplina, disciplinaParaEditar, onAtualizarDisciplina }) {
    const { register,
        handleSubmit,
        formState: { errors },
        reset} = useForm();

    function onSubmit(data) {
        const novaDisciplina = {
            id: Date.now(),
            nome: data.nome,
            codigo: data.codigo,
            descricao: data.descricao,
            semestre: data.semestre,
            status: "ativa",
            alunosMatriculados: 0
        };

        if (!disciplinaParaEditar) {
            adicionarDisciplina(novaDisciplina);
            reset();
            onClose();
        } else {
            const disciplinaEditada = {
                ...disciplinaParaEditar,
                nome: data.nome,
                codigo: disciplinaParaEditar.codigo,
                descricao: disciplinaParaEditar.descricao,
                semestre: disciplinaParaEditar.semestre
            }
            onAtualizarDisciplina(disciplinaEditada);
        }
    }

    useEffect(() => {
        if (disciplinaParaEditar) {
            reset({
                nome: disciplinaParaEditar.nome,
                codigo: disciplinaParaEditar.codigo,
                descricao: disciplinaParaEditar.descricao,
                semestre: disciplinaParaEditar.semestre
            });
        }
    }, [disciplinaParaEditar, reset])

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.btnFechar} onClick={onClose}>✕</button>

                <h2>Criar Disciplina</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                    <div className={styles.campo}>
                        <label htmlFor="nome">Disciplina</label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Nome da disciplina"
                            {...register('nome', {
                                required: 'Nome da disciplina é obrigatório',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                        />
                        {errors.nome && (
                            <span className={styles.erro}>{errors.nome.message}</span>
                        )}
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="codigo">Código da Turma</label>
                        <input
                            id="codigo"
                            type="text"
                            placeholder="Ex: AED-2026.1-A"
                            {...register('codigo', {
                                required: 'Código da turma é obrigatório',
                                minLength: {
                                    value: 2,
                                    message: 'Código deve ter no mínimo 2 caracteres'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Código deve ter no máximo 20 caracteres'
                                }
                            })}
                        />
                        {errors.codigo && (
                            <span className={styles.erro}>{errors.codigo.message}</span>
                        )}
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            placeholder="Descreva a turma, horário, foco, etc..."
                            rows="4"
                            {...register('descricao', {
                                required: 'Descrição é obrigatória',
                                minLength: {
                                    value: 10,
                                    message: 'Descrição deve ter no mínimo 10 caracteres'
                                },
                                maxLength: {
                                    value: 500,
                                    message: 'Descrição deve ter no máximo 500 caracteres'
                                }
                            })}
                        />
                        {errors.descricao && (
                            <span className={styles.erro}>{errors.descricao.message}</span>
                        )}
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="semestre">Semestre</label>
                        <input
                            id="semestre"
                            type="text"
                            placeholder="Ex: 2026.1 ou 2026.2"
                            {...register('semestre', {
                                required: 'Semestre é obrigatório',
                                pattern: {
                                    value: /^\d{4}\.\d$/,
                                    message: 'Formato inválido. Use: 2026.1 ou 2026.2'
                                }
                            })}
                        />
                        {errors.semestre && (
                            <span className={styles.erro}>{errors.semestre.message}</span>
                        )}
                    </div>

                    <input
                        type="hidden"
                        {...register('status')}
                        value="ativa"
                    />

                    <div className={styles.acoes}>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}