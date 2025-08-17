import React from "react";
import styles from "./styles.module.css";
import carrinhoIcon from "../../assets/carrinho.png";
import lixeiraIcon from "../../assets/lixeira.png";
import useCartStore from "../../stores/CartStore";
import CardLivro from "../../Components/CardLivro";

export default function Cart() {
    const { cart, removeFromCart } = useCartStore();

    const removerDoCarrinho = (e: React.MouseEvent, idLivro: number) => {
        e.preventDefault();
        e.stopPropagation();
        
        removeFromCart(idLivro);
    };

    const calcularTotal = () => {
        return cart.reduce((total, livro) => total + livro.preco, 0).toFixed(2).replace(".", ",");
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.headerCart}>
                    <h1 className={styles.tituloCart}>
                        <img src={carrinhoIcon} alt="Ícone de carrinho" className={styles.carrinhoIcon} />
                        Meu Carrinho
                    </h1>
                </div>
                
                <div className={styles.conteudo}>
                    {cart.length > 0 ? (
                        <>
                            <h2 className={styles.subtitulo}>Livros no Carrinho</h2>
                            <div className={styles.listaLivros}>
                                {cart.map((livro) => (
                                    <CardLivro key={livro.id} livro={livro}>
                                        <button onClick={(e) => removerDoCarrinho(e, livro.id)} className={styles.botaoRemover}>
                                            <img src={lixeiraIcon} alt="Remover livro" className={styles.lixeiraIcon} />
                                        </button>
                                    </CardLivro>
                                ))}
                            </div>
                            
                            <div className={styles.resumoCompra}>
                                <p className={styles.valorTotal}>Total: R$ {calcularTotal()}</p>
                                <button className={styles.botaoComprar}>Comprar</button>
                            </div>
                        </>
                    ) : (
                        <p className={styles.mensagemVazio}>Seu carrinho está vazio.</p>
                    )}
                </div>
            </div>
        </>
    );
}