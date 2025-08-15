import { useForm } from "react-hook-form"
import logo from "../../assets/Logo.png"
import capa from "../../assets/Picture.png"
import styles from "./styles.module.css"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

const userSchema = z.object({
    email: z.string().nonempty('O e-mail não pode ser vazio').refine(value => z.string().email().safeParse(value).success, {message: 'O e-mail não é válido'}),
    password: z.string().nonempty('Senha não pode ser vazia').min(6, 'A senha deve ter no mínimo 6 caracteres')
}) 

type User = z.infer<typeof userSchema>

export default function Login() {
    const { register, handleSubmit, formState: {errors, isSubmitting}, setError } = useForm<User>({
        resolver: zodResolver(userSchema)
    })

    const navigate = useNavigate()

    async function createUser(data: User) {
        try{
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log(data)
            navigate('/home')
        }catch{
            setError('root', {
                message: "Erro ao criar usuário"
            })
        }
    }

    return (
        <main className={styles.main}>
            <img src={capa} alt="Capa"/>
            <div className={styles.ladoInfo}>
                <img id={styles.logo} src={logo} alt="Logo" />
                <div className={styles.infosTexto}>
                    <div className={styles.boasVindas}>
                        <h1>Bem vindo(a)!</h1>
                        <p>Entre na sua conta</p>
                    </div>
                    <form onSubmit={handleSubmit(createUser)}>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" className={styles.input} 
                            placeholder="Digite aqui seu e-mail" {...register('email')}
                        />
                        {errors.email && <span>{errors.email.message}</span>}

                        <label htmlFor="password" id={styles.passwordLabel}>Senha</label>
                        <input type="password" className={styles.input} 
                            placeholder="Digite aqui sua senha" {...register('password')}
                        />
                        {errors.password && <span>{errors.password.message}</span>}

                        <button disabled={isSubmitting} className={styles.botaoEntrar}>{isSubmitting ? 'Carregando...': 'Entrar'}</button>
                        <button className={styles.botaoCadastro}>Cadastre-se</button>
                        {errors.root && <span>{errors.root.message}</span>}
                    </form>
                </div>
            </div>
        </main>
    )
}