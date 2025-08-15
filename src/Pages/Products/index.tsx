import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import sinalMenor from "../../assets/sinalmenor.png";
import useCartStore from "../../stores/CartStore";

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
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/livros/${id}`)
        .then((response) => {
          setLivro(response.data);
        })
        .catch((error) =>
          console.error("Erro ao buscar detalhes do livro: " + error)
        );
    }
  }, [id]);

  const handleAddToCart = () => {
    if (livro) {
      addToCart(livro);
      alert(`O livro "${livro.titulo}" foi adicionado ao seu carrinho!`);
    }
  };

  if (!livro) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link to="/home" className={styles.irHome}>
          <img src={sinalMenor} alt="Voltar" className={styles.imagemVoltar} />
          Detalhes do Livro
        </Link>

        <div className={styles.livroLayout}>
          <div className={styles.espaçoCapa}>
            <img
              src={livro.capa}
              alt={`Capa do livro ${livro.titulo}`}
              className={styles.capaLivro}
            />
          </div>

          <div className={styles.livroInfo}>
            <div className={styles.infoSection}>
              <h1 className={styles.tituloLivro}>{livro.titulo}</h1>
              <h2 className={styles.autorLivro}>{livro.autor}</h2>
            </div>

            <div className={styles.Sinopse}>
              <h3 className={styles.tituloSinopse}>Sinopse</h3>
              <p className={styles.textoSinopse}>{livro.sinopse}</p>
            </div>
          </div>
        </div>
        <button className={styles.botao} onClick={handleAddToCart}>
          <p className={styles.preçoLivro}>
            R$ {livro.preco.toFixed(2).replace(".", ",")}
          </p>
          <span className={styles.textoBotao}>Adicionar ao carrinho</span>
        </button>
      </div>
    </div>
  );
}