import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import logo from "../../assets/Logo.png"
import pessoa from "../../assets/Icon.png"
import carrinho from "../../assets/carrinho.png"

export default function Header() {
    return (
        <header>
            <nav className={styles.links}>
                <Link to="/home"> <img src={logo} alt="Logo" /> </Link>
                <div className={styles.icones}>
                    <Link to="/" className={styles.btnPessoa}> <img src={pessoa} alt="Icone pessoa" /> </Link>
                    <Link to="/cart" className={styles.btnCarrinho}> <img src={carrinho} alt="Icone carrinho" /> </Link>
                </div>
            </nav>
        </header>
    )
}