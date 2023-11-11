import './index.scss';
import CabecalhoUsuario from '../../../../components/Usuario/UsuarioCabecalho';
import UsuarioRodape from '../../../../components/Usuario/UsuarioRodape';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import storage from 'local-storage'
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { URLRota } from '../../../../constants.js';

export default function Confirmacao () {

    const [preco, setPreco] = useState(0);
    const [precoFinal, setPrecoFinal] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [dataAtual, setDataAtual] = useState((new Date().toISOString()).substring(0, 10));
    const [proximaData, setProximaData] = useState([]);
    const [itensSelecionados, setItensSelecionados] = useState(storage('itens-selecionados'));
    const redir = useNavigate();
    
    const notificacao = () => {
        toast('Seja bem-vindo à nossa assinatura! :)', {
            icon: (
                <img
                    src="/assets/images/bunashikiSeta.svg"
                    alt='Erro ao encontrar imagem!'
                    style={{width: '40px', height: '40px', margin: '-8px'}}
                />
            ),
        })
    }

    function calcularPreco () {
        let precos = 0;
        for (let item of itensSelecionados) {
            precos = (Number(item.preco) * item.quantidade) + precos;
        }

        setPreco(precos);
        let descontoCalc = precos * 0.05;
        let ponto = (descontoCalc.toString().indexOf('.'));
        const desconto = (descontoCalc.toString().substring(0, (ponto + 3)));
        setDesconto(desconto);
        let total = precos - descontoCalc;
        setPrecoFinal(total);
    }

    useEffect(() => {
        calcularPreco();
        
        const datta = new Date();
        datta.setDate(datta.getDate() + 30);
        setProximaData((datta.toISOString()).substring(0, 10));
    }, [])

    function finalizar () {
        const assinatura = {
            idCliente: storage('usuario-logado').id,
            idEndereco: storage('usuario-logado')
        }
        const resposta = axios.post((URLRota + '/concluir-assinatura/'), );
        const dados = resposta.data;
        console.log(dados);
        // console.log(dados.id);
    }

    return (
        <main className='confirmacao-assinatura'>
            <CabecalhoUsuario/>
            <nav className='navegador' onClick={() => storage.remove('itens-selecionados')}>
                <Link to={'/assinatura'}><img src="/assets/images/icon-seta-preta.png" alt="" />
                <h1>Voltar à etapa anterior</h1></Link>
            </nav>

            <section className='conteudo'>
            <h1>Revise sua assinatura:</h1>

            <section className='cartao-principal'>
                <div className="imagem-tabela">
                    <img src="/assets/images/bunashikiSetaCinza.png" alt="" />
                    
                    <table>
                        <thead>
                            <tr>
                                <td><b>Itens</b></td>
                                <td><b>Quantidade</b></td>
                                <td><b>Valor</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {itensSelecionados.map((item) => {
                                return (
                                        <tr>
                                            <td>{item.produto}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R${item.preco}</td>
                                        </tr>
                                )
                            })}
                            <tr>
                                <td>
                                    Total
                                </td>
                                <td></td>
                                <td>R${preco}</td>
                            </tr>
                            <tr>
                                <td>
                                    Desconto de 5%
                                </td>
                                <td></td>
                                <td>-R${desconto}</td>
                            </tr>
                            <tr>
                                <td>
                                    Valor Final
                                </td>
                                <td></td>
                                <td>R${precoFinal}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                <div className="detalhes-assinatura">
                    <p>Código da assinatura: 123-A-123: 123-A-123</p>
                    <p>Primeiro pagamento: {dataAtual}</p>
                    <p>Próximo pagamento: {proximaData}</p>
                </div>

                <div className="permanencia">
                    Ao assinar este plano você concorda com o tempo mínimo de manutenção e permanência de 3 meses. As solicitações de cancelamento não serão acatadas antes da permanência mínima.
                </div>

                <button onClick={() => {finalizar();}}>Confirmar o pagamento</button>
                </section>
            </section>

            <UsuarioRodape/>
        </main>
    )
}