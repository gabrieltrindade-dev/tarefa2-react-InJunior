import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./styles.module.css";
import lupa from '../../assets/Search.png';
import sinalMenor from '../../assets/sinalmenor.png';
import { useDados } from "../../hooks/useDados";
import CardLivro from "../../Components/CardLivro";

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
  const { data: livros, loading, error } = useDados<Livro[]>(`http://localhost:3000/livros?genero=${genero}`);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const livrosFiltrados = livros
    ? livros.filter((livro) =>
        livro.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
      )
    : [];

  if (loading) {
    return <div>Carregando livros...</div>;
  }
  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.pesquisa}>
          <img src={lupa} alt="Ícone de pesquisa" className={styles.lupa} />
          <input
            type="text"
            placeholder="Pesquisar por título"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            className={styles.inputPesquisa}
          />
        </div>

        <div className={styles.headerGenero}>
          <Link to="/home" className={styles.irHome}>
            <img src={sinalMenor} alt="Voltar para a Home" className={styles.setaVoltar} />
            {genero}
          </Link>
        </div>

        <div className={styles.listaLivros}>
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro) => (
              <CardLivro key={livro.id} livro={livro} />
            ))
          ) : (
            <p>Nenhum livro encontrado para este gênero ou termo de pesquisa.</p>
          )}
        </div>
      </div>
    </>
  );
}