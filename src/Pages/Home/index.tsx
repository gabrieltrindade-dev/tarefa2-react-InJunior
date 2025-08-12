import axios from "axios"
import { useEffect, useState } from "react"

interface Livro {
    id: number
    titulo: string
    autor: string
    genero: string
    preco: number
    sinopse: string
    capa: string
}

export default function Home() {
    const [livros, setLivros] = useState<Livro[]>([])

    useEffect(()=> {
        axios.get('http://localhost:3000/livros')
        .then(response => setLivros(response.data))
        .catch(error => console.error('Algo deu errado: ' + error))
    }, [])

    return (
        <>
            <h1>livros: </h1>
            <ul>
                {livros.map(livro => (
                    <li>
                        <p>titulo: {livro.titulo}</p>
                        <p>titulo: {livro.autor}</p>
                        <p>titulo: {livro.capa}</p>
                        <p>titulo: {livro.genero}</p>
                        <p>titulo: {livro.sinopse}</p>
                        <p>titulo: {livro.preco}</p>
                        
                    </li>
                ))}
            </ul>
        </>
    )
}