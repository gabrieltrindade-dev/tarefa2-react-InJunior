import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import lupa from '../../assets/Search.png'; 
import sinalMenor from '../../assets/sinalmenor.png'; 

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  preco: number;
  sinopse: string;
  capa: string;
}

export default function Themes() {
  const { genero } = useParams<{ genero: string }>();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    if (genero) {
      axios
        .get(`http://localhost:3000/livros?genero=${genero}`)
        .then((response) => {
          setLivros(response.data);
        })
        .catch((error) => console.error("Erro ao buscar livros: " + error));
    }
  }, [genero]);

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <>
      <div className={styles.mainContainer}>
        {/* Barra de pesquisa */}
        <div className={styles.searchContainer}>
          <img src={lupa} alt="Ícone de pesquisa" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Pesquisar por título"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Cabeçalho da seção */}
        <div className={styles.headerGenero}>
          <Link to="/home" className={styles.backLink}>
            <img src={sinalMenor} alt="Voltar para a Home" className={styles.arrowIcon} />
            {genero}
          </Link>
        </div>

        {/* Lista de livros */}
        <div className={styles.listaLivros}>
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro) => (
              <Link key={livro.id} to={`/livro/${livro.id}`} className={styles.cardLivro}>
                <div className={styles.cardContent}>
                  <img src={livro.capa} alt={`Capa do livro ${livro.titulo}`} className={styles.capaLivro} />
                  <div className={styles.infoLivro}>
                    <div className={styles.textosInfo}>
                      <h3 className={styles.tituloLivro}>{livro.titulo}</h3>
                      <p className={styles.autorLivro}>{livro.autor}</p>
                    </div>
                    <p className={styles.precoLivro}>R$ {livro.preco.toFixed(2).replace(".", ",")}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhum livro encontrado para este gênero ou termo de pesquisa.</p>
          )}
        </div>
      </div>
    </>
  );
}