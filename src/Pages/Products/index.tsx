import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import sinalMenor from "../../assets/sinalmenor.png";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  preco: number;
  sinopse: string;
  capa: string;
}

export default function Products() {
  const { id } = useParams<{ id: string }>();
  const [livro, setLivro] = useState<Livro | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/livros/${id}`)
        .then((response) => {
          setLivro(response.data);
        })
        .catch((error) => console.error("Erro ao buscar detalhes do livro: " + error));
    }
  }, [id]);

  if (!livro) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Link to="/home" className={styles.backLink}>
          <img src={sinalMenor} alt="Voltar" className={styles.backArrow} />
          Detalhes do Livro
        </Link>
        
        <div className={styles.bookLayout}>
          <div className={styles.bookCoverContainer}>
            <img src={livro.capa} alt={`Capa do livro ${livro.titulo}`} className={styles.bookCoverImage} />
          </div>

          <div className={styles.bookInfo}>
            <div className={styles.infoSection}>
              <h1 className={styles.bookTitle}>{livro.titulo}</h1>
              <h2 className={styles.bookAuthor}>{livro.autor}</h2>
            </div>

            <div className={styles.infoSectionSynopsis}>
              <h3 className={styles.synopsisTitle}>Sinopse</h3>
              <p className={styles.synopsisText}>{livro.sinopse}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.addToCartButton}>
                <p className={styles.bookPrice}>R$ {livro.preco.toFixed(2).replace(".", ",")}</p>
                <span className={styles.buttonText}>Adicionar ao carrinho</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}