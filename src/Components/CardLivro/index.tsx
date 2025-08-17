import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  preco: number;
  sinopse: string;
  capa: string;
}

interface CardLivroProps {
  livro: Livro;
  children?: React.ReactNode;
}

export default function CardLivro({ livro, children }: CardLivroProps) {
  return (
    <Link key={livro.id} to={`/livro/${livro.id}`} className={styles.cardLivro}>
      {children}
      <div className={styles.cardContent}>
        <img src={livro.capa} alt={`Capa do livro ${livro.titulo}`} className={styles.capaLivro} />
        <h3 className={styles.tituloLivro}>{livro.titulo}</h3>
        <div className={styles.infoLivro}>
          <p className={styles.autorLivro}>{livro.autor}</p>
          <p className={styles.precoLivro}>R$ {livro.preco.toFixed(2).replace(".", ",")}</p>
        </div>
      </div>
    </Link>
  );
}