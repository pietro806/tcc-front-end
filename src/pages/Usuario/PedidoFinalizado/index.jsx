import './index.scss'
import UsuarioCabecalho from '../../../components/Usuario/UsuarioCabecalho'
import UsuarioRodape from '../../../components/Usuario/UsuarioRodape'
import ResumoPedido from '../../../components/Usuario/ResumoPedido'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function Index(){
    const navigate = useNavigate()
    const {id} = useParams()
    
    
    return(
        <div id='page-pedido-finalizado'>
            <UsuarioCabecalho />
            <main id='conteudo'>
                <section id='s1'>
                    <h2> Pedido Finalizado!</h2>
                    <p> Obrigado por comprar conosco </p>
                    <img src='/assets/images/pedido/icon-finalizado.svg' alt="icon-certo" />
                </section>
                <section id='s2'>
                    <ResumoPedido idPedido={id}/>
                </section>
                <section id='s3'>
                    <p>Parabéns! Sua compra estará contribuindo diretamente para a <span> causa verde!</span></p>
                    <article>
                        <Link id='voltar' to='/'>
                            <img src="/assets/images/icon-esquerda-curto.png" alt="" />
                            Voltar
                        </Link>
                        <Link id='acompanhar' to={{pathname: `/acompanhar-pedido/${id}`}}>
                            Acompanhar pedido
                        </Link>
                    </article>
                </section>
            </main>
            <UsuarioRodape />
        </div>
    )
}