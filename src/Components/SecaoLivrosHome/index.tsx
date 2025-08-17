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

interface SecaoLivrosHomeProps {
  genero: string;
  livros: Livro[];
}

export default function SecaoLivrosHome({ genero, livros }: SecaoLivrosHomeProps) {
  return (
    <section className={styles.secaoGenero}>
      <div className={styles.cabecalhoSecao}>
        <h2 className={styles.tituloGenero}>{genero}</h2>
        <Link to={`/themes/${genero}`} className={styles.verMaisLink}>
          Ver mais
        </Link>
      </div>
      <div className={styles.listaLivros}>
        {livros.slice(0, 4).map((livro) => (
          <Link key={livro.id} to={`/livro/${livro.id}`} className={styles.cardLivro}>
            <div className={styles.conteudoCard}>
              <img src={livro.capa} alt={`Capa do livro ${livro.titulo}`} className={styles.capaLivro} />
              <div className={styles.detalhesLivro}>
                <h3 className={styles.tituloLivro}>{livro.titulo}</h3>
                <p className={styles.autorLivro}>{livro.autor}</p>
                <p className={styles.precoLivro}>R$ {livro.preco.toFixed(2).replace(".", ",")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}