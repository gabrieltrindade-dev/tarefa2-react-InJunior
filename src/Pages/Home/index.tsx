import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import banner from "../../assets/Banner.png";
import { useDados } from "../../hooks/useDados";
import SecaoLivrosHome from "../../Components/SecaoLivrosHome";

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
  const { data: livros, loading, error } = useDados<Livro[]>("http://localhost:3000/livros");
  const [livrosPorGenero, setLivrosPorGenero] = useState<{
    [key: string]: Livro[];
  }>({});

  useEffect(() => {
    if (livros) {
      const livrosAgrupados: { [key: string]: Livro[] } = {};
      livros.forEach((livro) => {
        if (!livrosAgrupados[livro.genero]) {
          livrosAgrupados[livro.genero] = [];
        }
        livrosAgrupados[livro.genero].push(livro);
      });
      setLivrosPorGenero(livrosAgrupados);
    }
  }, [livros]);

  if (loading) {
    return <div>Carregando livros...</div>;
  }
  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

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
          <SecaoLivrosHome
            key={genero}
            genero={genero}
            livros={livrosPorGenero[genero]}
          />
        ))}
      </div>
    </>
  );
}