import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import banner from "../../assets/Banner.png";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  preco: number;
  sinopse: string;
  capa: string;
}

export default function Home() {
  const [livrosPorGenero, setLivrosPorGenero] = useState<{
    [key: string]: Livro[];
  }>({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/livros")
      .then((response) => {
        const livrosAgrupados: { [key: string]: Livro[] } = {};
        response.data.forEach((livro: Livro) => {
          if (!livrosAgrupados[livro.genero]) {
            livrosAgrupados[livro.genero] = [];
          }
          livrosAgrupados[livro.genero].push(livro);
        });
        setLivrosPorGenero(livrosAgrupados);
      })
      .catch((error) => console.error("Algo deu errado: " + error));
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.espaçoBanner}>
          <img src={banner} alt="Banner" className={styles.imagemBanner} />
          <p className={styles.textoBanner}>
            <span className={styles.destaqueTexto}>25% de desconto</span>
            <br />
            nos livros do Paulo
            <br />
            Coelho!
          </p>
        </div>

        {Object.keys(livrosPorGenero).map((genero) => (
          <section key={genero} className={styles.secaoGenero}>
            <div className={styles.cabecalhoSecao}>
              <h2 className={styles.tituloGenero}>{genero}</h2>
              <Link to={`/themes/${genero}`} className={styles.verMaisLink}>
                Ver mais
              </Link>
            </div>
            <div className={styles.listaLivros}>
              {livrosPorGenero[genero].slice(0, 4).map((livro) => (
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
        ))}
      </div>
    </>
  );
}