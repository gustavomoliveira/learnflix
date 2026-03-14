import styles from "./FormularioCadastro.module.css";
import { useForm } from "react-hook-form";

export default function FormularioCadastro({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid},
        watch
    } = useForm({ mode: "onChange" });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <label htmlFor="perfil">Perfil</label>
                <select
                    data-testid="select-perfil"
                    id="perfil"
                    defaultValue=""
                    {...register("perfil", {
                        required: "Selecione um perfil"
                    })}
                >
                    <option value="" disabled selected>Selecione seu perfil</option>
                    <option value="aluno">Aluno</option>
                    <option value="professor">Professor</option>
                    <option value="gestor">Gestor</option>
                </select>
                   {errors.perfil && <span className={styles.error}>{errors.perfil.message}</span>}
            </div>

            <div>
                <label htmlFor="nomeCompleto">Nome Completo</label>
                <input
                    data-testid="input-nome"
                    id="nomeCompleto"
                    type="text"
                    placeholder="Digite seu nome completo"
                    {...register("nomeCompleto", {
                        required: "Nome completo é obrigatório",
                        minLength: {
                            value: 3,
                            message: "Nome deve ter no mínimo 3 caracteres"
                        }
                    })}
                />
                {errors.nomeCompleto && <span data-testid="erro-nome" className={styles.error}>{errors.nomeCompleto.message}</span>}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    data-testid="input-email"
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    {...register("email", {
                        required: "O e-mail é obrigatório",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Digite um e-mail válido"
                        }
                    })}
                />
                {errors.email && <span data-testid="erro-email" className={styles.error}>{errors.email.message}</span>}
            </div>

            <div>
                <label htmlFor="matricula">Matrícula/Registro</label>
                <input
                    data-testid="input-matricula"
                    id="matricula"
                    type="text"
                    placeholder="Digite sua matrícula ou registro"
                    {...register("matricula", {
                        required: "Registro ou Matrícula é obrigatório",
                        minLength: {
                            value: 5,
                            message: "Registro ou Matrícula deve ter no mínimo 5 caracteres"
                        }
                    })}
                />
                {errors.matricula && <span data-testid="erro-matricula" className={styles.error}>{errors.matricula.message}</span>}
            </div>

            <div>
                <label htmlFor="senha">Senha</label>
                <input
                    data-testid="input-senha"
                    id="senha"
                    type="password"
                    placeholder="Mínimo de 8 caracteres para senha"
                    {...register("senha", {
                        required: "Senha é obrigatória",
                        minLength: {
                            value: 8,
                            message: "Senha deve ter no mínimo 8 caracteres"
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                            message: "Senha deve conter pelo menos uma letra e um número"
                        }
                    })}
                />
                {errors.senha && <span data-testid="erro-senha" className={styles.error}>{errors.senha.message}</span>}
            </div>

            <div>
                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                <input
                    data-testid="input-confirmar-senha"
                    id="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register("confirmarSenha", {
                        required: "Confirmação de senha é obrigatória",
                        validate: (value) =>
                            value === watch("senha") || "As senhas devem ser iguais"
                    })}
                />
                {errors.confirmarSenha && <span data-testid="erro-confirmar-senha" className={styles.error}>{errors.confirmarSenha.message}</span>}
            </div>

            <div>
                <label htmlFor="telefone">Telefone</label>
                <input
                    data-testid="input-telefone"
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    {...register("telefone", {
                        pattern: {
                            value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                            message: "Formato: (00) 00000-0000"
                        }
                    })}
                />
                {errors.telefone && <span data-testid="erro-telefone" className={styles.error}>{errors.telefone.message}</span>}
            </div>

            <div>
                <label htmlFor="dataNascimento"></label>
                <input
                    data-testid="input-data-nascimento"
                    id="dataNascimento"
                    type="date"
                    placeholder="Data de Nascimento"
                    {...register("dataNascimento")}
                />
                {errors.dataNascimento && <span data-testid="erro-data-nascimento" className={styles.error}>{errors.dataNascimento.message}</span>}
            </div>

            <button data-testid="btn-cadastrar" type="submit" disabled={!isValid}>
                Cadastrar
            </button>
        </form>
    )
}