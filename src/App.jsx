import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [linhasOnibus, setLinhasOnibus] = useState([]);
  const [onibus, setOnibus] = useState([]);

  const [novoEstado, setNovoEstado] = useState({ nome: '', sigla: '' });
  const [novaCidade, setNovaCidade] = useState({ nome: '', estadoId: '' });
  const [novaLinhaOnibus, setNovaLinhaOnibus] = useState({ nome: '', cidadeId: '' });
  const [novoOnibus, setNovoOnibus] = useState({ placa: '', linhaOnibusId: '' });

  const [editandoEstado, setEditandoEstado] = useState(null);
  const [editandoCidade, setEditandoCidade] = useState(null);
  const [editandoLinhaOnibus, setEditandoLinhaOnibus] = useState(null);
  const [editandoOnibus, setEditandoOnibus] = useState(null);

  const [secaoAberta, setSecaoAberta] = useState('estados');

  const [snackbar, setSnackbar] = useState({ visivel: false, messagem: '', erro: false });

  const API_URL = 'http://localhost:5026';

  useEffect(() => {
    carregarEstados();
    carregarCidades();
    carregarLinhasOnibus();
    carregarOnibus();
  }, []);

  const mostrarMensagem = (messagem, erro = false) => {
    setSnackbar({ visivel: true, messagem: messagem, erro: erro });

    setTimeout(() => {
      setSnackbar({ visivel: false, messagem: '', erro: false });
    }, 5000);
  };
  //#region FUNÇÕES
  // Funções para Estados
  const carregarEstados = async () => {
    try {
      const response = await fetch(`${API_URL}/estados`);
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error('Erro ao carregar estados:', error);
    }
  };

  const adicionarEstado = async () => {
    try {
      const response = await fetch(`${API_URL}/estados`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoEstado)
      });
      if (response.ok) {
        carregarEstados();
        setNovoEstado({ nome: '', sigla: '' });
        mostrarMensagem('Estado adicionado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar estado:', error);
    }
  };

  const atualizarEstado = async () => {
    try {
      const response = await fetch(`${API_URL}/estados/${editandoEstado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoEstado)
      });
      if (response.ok) {
        carregarEstados();
        setNovoEstado({ nome: '', sigla: '' });
        setEditandoEstado(null);
        mostrarMensagem('Estado atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar estado:', error);
    }
  };

  const excluirEstado = async (id) => {
    try {
      const response = await fetch(`${API_URL}/estados/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        carregarEstados();
        mostrarMensagem('Estado excluído com sucesso!');
      } else {
        mostrarMensagem('Não é possível excluir este estado porque ele possui cidades vinculadas.', true);
      }
    } catch (error) {
      console.error('Erro ao excluir estado:', error);
      mostrarMensagem('Erro ao excluir estado.', true);
    }
  };

  // Funções para Cidades
  const carregarCidades = async () => {
    try {
      const response = await fetch(`${API_URL}/cidades`);
      const data = await response.json();
      setCidades(data);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
    }
  };

  const adicionarCidade = async () => {
    try {
      const response = await fetch(`${API_URL}/cidades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCidade)
      });
      if (response.ok) {
        carregarCidades();
        setNovaCidade({ nome: '', estadoId: '' });
        mostrarMensagem('Cidade adicionada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar cidade:', error);
    }
  };

  const atualizarCidade = async () => {
    try {
      const response = await fetch(`${API_URL}/cidades/${editandoCidade.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCidade)
      });
      if (response.ok) {
        carregarCidades();
        setNovaCidade({ nome: '', estadoId: '' });
        setEditandoCidade(null);
        mostrarMensagem('Cidade atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar cidade:', error);
    }
  };

  const excluirCidade = async (id) => {
    try {
      const response = await fetch(`${API_URL}/cidades/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        carregarCidades();
        mostrarMensagem('Cidade excluída com sucesso!');
      } else {
        mostrarMensagem('Não é possível excluir esta cidade porque ela possui linhas de ônibus vinculadas.', true);
      }
    } catch (error) {
      console.error('Erro ao excluir cidade:', error);
      mostrarMensagem('Erro ao excluir cidade.', true);
    }
  };

  // Funções para Linhas de Ônibus
  const carregarLinhasOnibus = async () => {
    try {
      const response = await fetch(`${API_URL}/linhasonibus`);
      const data = await response.json();
      setLinhasOnibus(data);
    } catch (error) {
      console.error('Erro ao carregar linhas de ônibus:', error);
    }
  };

  const adicionarLinhaOnibus = async () => {
    try {
      const response = await fetch(`${API_URL}/linhasonibus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaLinhaOnibus)
      });
      if (response.ok) {
        carregarLinhasOnibus();
        setNovaLinhaOnibus({ nome: '', cidadeId: '' });
        mostrarMensagem('Linha de ônibus adicionada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar linha de ônibus:', error);
    }
  };

  const atualizarLinhaOnibus = async () => {
    try {
      const response = await fetch(`${API_URL}/linhasonibus/${editandoLinhaOnibus.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaLinhaOnibus)
      });
      if (response.ok) {
        carregarLinhasOnibus();
        setNovaLinhaOnibus({ nome: '', cidadeId: '' });
        setEditandoLinhaOnibus(null);
        mostrarMensagem('Linha de ônibus atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar linha de ônibus:', error);
    }
  };

  const excluirLinhaOnibus = async (id) => {
    try {
      const response = await fetch(`${API_URL}/linhasonibus/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        carregarLinhasOnibus();
        mostrarMensagem('Linha de ônibus excluída com sucesso!');
      } else {
        mostrarMensagem('Não é possível excluir esta linha porque ela possui ônibus vinculados.', true);
      }
    } catch (error) {
      console.error('Erro ao excluir linha de ônibus:', error);
      mostrarMensagem('Erro ao excluir linha de ônibus.', true);
    }
  };

  // Funções para Ônibus
  const carregarOnibus = async () => {
    try {
      const response = await fetch(`${API_URL}/onibus`);
      const data = await response.json();
      setOnibus(data);
    } catch (error) {
      console.error('Erro ao carregar ônibus:', error);
    }
  };

  const adicionarOnibus = async () => {
    try {
      const response = await fetch(`${API_URL}/onibus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoOnibus)
      });
      if (response.ok) {
        carregarOnibus();
        setNovoOnibus({ placa: '', linhaOnibusId: '' });
        mostrarMensagem('Ônibus adicionado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar ônibus:', error);
    }
  };

  const atualizarOnibus = async () => {
    try {
      const response = await fetch(`${API_URL}/onibus/${editandoOnibus.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoOnibus)
      });
      if (response.ok) {
        carregarOnibus();
        setNovoOnibus({ placa: '', linhaOnibusId: '' });
        setEditandoOnibus(null);
        mostrarMensagem('Ônibus atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar ônibus:', error);
    }
  };

  const excluirOnibus = async (id) => {
    try {
      const response = await fetch(`${API_URL}/onibus/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        carregarOnibus();
        mostrarMensagem('Ônibus excluído com sucesso!');
      } else {
        mostrarMensagem('Erro ao excluir ônibus.', true);
      }
    } catch (error) {
      console.error('Erro ao excluir ônibus:', error);
      mostrarMensagem('Erro ao excluir ônibus.', true);
    }
  };

  // Funções para iniciar edição
  const iniciarEdicaoEstado = (estado) => {
    setNovoEstado({ nome: estado.nome, sigla: estado.sigla });
    setEditandoEstado(estado);
  };

  const iniciarEdicaoCidade = (cidade) => {
    setNovaCidade({ nome: cidade.nome, estadoId: cidade.estadoId });
    setEditandoCidade(cidade);
  };

  const iniciarEdicaoLinhaOnibus = (linha) => {
    setNovaLinhaOnibus({ nome: linha.nome, cidadeId: linha.cidadeId });
    setEditandoLinhaOnibus(linha);
  };

  const iniciarEdicaoOnibus = (onibus) => {
    setNovoOnibus({ placa: onibus.placa, linhaOnibusId: onibus.linhaOnibusId });
    setEditandoOnibus(onibus);
  };
  //#endregion
  //#region COMPONENTE
  return (
    <div className="container">
      <h1>Sistema de Gerenciamento de Ônibus</h1>

      {/* Navegação */}
      <div className="tabs">
        <button
          className={secaoAberta === 'estados' ? 'selecionado' : ''}
          onClick={() => setSecaoAberta('estados')}>
          Estados
        </button>
        <button
          className={secaoAberta === 'cidades' ? 'selecionado' : ''}
          onClick={() => setSecaoAberta('cidades')}>
          Cidades
        </button>
        <button
          className={secaoAberta === 'linhas' ? 'selecionado' : ''}
          onClick={() => setSecaoAberta('linhas')}>
          Linhas de Ônibus
        </button>
        <button
          className={secaoAberta === 'onibus' ? 'selecionado' : ''}
          onClick={() => setSecaoAberta('onibus')}>
          Ônibus
        </button>

        {snackbar.visivel && (
          <div className={`snackbar ${snackbar.erro ? 'falha' : 'ok'}`}>
            {snackbar.messagem}
          </div>
        )}
      </div>

      {/* Seção de Estados */}
      {secaoAberta === 'estados' && (
        <div className="secao">
          <h2>Gerenciar Estados</h2>

          <div className="form">
            <input
              type="text"
              placeholder="Nome do Estado"
              value={novoEstado.nome}
              onChange={(e) => setNovoEstado({ ...novoEstado, nome: e.target.value })}
            />

            <input
              type="text"
              placeholder="Sigla (UF)"
              value={novoEstado.sigla}
              onChange={(e) => setNovoEstado({ ...novoEstado, sigla: e.target.value })}
              maxLength="2"
            />

            {editandoEstado ? (
              <div className="btn-grupo">
                <button onClick={atualizarEstado}>Atualizar</button>
                <button onClick={() => {
                  setEditandoEstado(null);
                  setNovoEstado({ nome: '', sigla: '' });
                }}>Cancelar</button>
              </div>
            ) : (
              <button onClick={adicionarEstado}>Adicionar</button>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sigla</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {estados.map(estado => (
                <tr key={estado.id}>
                  <td>{estado.id}</td>
                  <td>{estado.nome}</td>
                  <td>{estado.sigla}</td>
                  <td>
                    <button onClick={() => iniciarEdicaoEstado(estado)}>Editar</button>
                    <button onClick={() => excluirEstado(estado.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Seção de Cidades */}
      {secaoAberta === 'cidades' && (
        <div className="secao">
          <h2>Gerenciar Cidades</h2>

          <div className="form">
            <input
              type="text"
              placeholder="Nome da Cidade"
              value={novaCidade.nome}
              onChange={(e) => setNovaCidade({ ...novaCidade, nome: e.target.value })}
            />

            <select
              value={novaCidade.estadoId}
              onChange={(e) => setNovaCidade({ ...novaCidade, estadoId: e.target.value })}
            >
              <option value="">Selecione um Estado</option>
              {estados.map(estado => (
                <option key={estado.id} value={estado.id}>
                  {estado.nome} ({estado.sigla})
                </option>
              ))}
            </select>

            {editandoCidade ? (
              <div className="btn-grupo">
                <button onClick={atualizarCidade}>Atualizar</button>
                <button onClick={() => {
                  setEditandoCidade(null);
                  setNovaCidade({ nome: '', estadoId: '' });
                }}>Cancelar</button>
              </div>
            ) : (
              <button onClick={adicionarCidade}>Adicionar</button>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cidades.map(cidade => (
                <tr key={cidade.id}>
                  <td>{cidade.id}</td>
                  <td>{cidade.nome}</td>
                  <td>{cidade.estadoSigla}</td>
                  <td>
                    <button onClick={() => iniciarEdicaoCidade(cidade)}>Editar</button>
                    <button onClick={() => excluirCidade(cidade.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Seção de Linhas de Ônibus */}
      {secaoAberta === 'linhas' && (
        <div className="secao">
          <h2>Gerenciar Linhas de Ônibus</h2>

          <div className="form">
            <input
              type="text"
              placeholder="Nome da Linha"
              value={novaLinhaOnibus.nome}
              onChange={(e) => setNovaLinhaOnibus({ ...novaLinhaOnibus, nome: e.target.value })}
            />

            <select
              value={novaLinhaOnibus.cidadeId}
              onChange={(e) => setNovaLinhaOnibus({ ...novaLinhaOnibus, cidadeId: e.target.value })}
            >
              <option value="">Selecione uma Cidade</option>
              {cidades.map(cidade => (
                <option key={cidade.id} value={cidade.id}>
                  {cidade.nome} ({cidade.estadoSigla})
                </option>
              ))}
            </select>

            {editandoLinhaOnibus ? (
              <div className="btn-grupo">
                <button onClick={atualizarLinhaOnibus}>Atualizar</button>
                <button onClick={() => {
                  setEditandoLinhaOnibus(null);
                  setNovaLinhaOnibus({ nome: '', cidadeId: '' });
                }}>Cancelar</button>
              </div>
            ) : (
              <button onClick={adicionarLinhaOnibus}>Adicionar</button>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {linhasOnibus.map(linha => (
                <tr key={linha.id}>
                  <td>{linha.id}</td>
                  <td>{linha.nome}</td>
                  <td>{linha.cidadeNome} ({linha.estadoSigla})</td>
                  <td>
                    <button onClick={() => iniciarEdicaoLinhaOnibus(linha)}>Editar</button>
                    <button onClick={() => excluirLinhaOnibus(linha.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Seção de Ônibus */}
      {secaoAberta === 'onibus' && (
        <div className="secao">
          <h2>Gerenciar Ônibus</h2>

          <div className="form">
            <input
              type="text"
              placeholder="Placa do Ônibus"
              value={novoOnibus.placa}
              onChange={(e) => setNovoOnibus({ ...novoOnibus, placa: e.target.value })}
            />

            <select
              value={novoOnibus.linhaOnibusId}
              onChange={(e) => setNovoOnibus({ ...novoOnibus, linhaOnibusId: e.target.value })}
            >
              <option value="">Selecione uma Linha</option>
              {linhasOnibus.map(linha => (
                <option key={linha.id} value={linha.id}>
                  {linha.nome} - {linha.cidadeNome}
                </option>
              ))}
            </select>

            {editandoOnibus ? (
              <div className="btn-grupo">
                <button onClick={atualizarOnibus}>Atualizar</button>
                <button onClick={() => {
                  setEditandoOnibus(null);
                  setNovoOnibus({ placa: '', linhaOnibusId: '' });
                }}>Cancelar</button>
              </div>
            ) : (
              <button onClick={adicionarOnibus}>Adicionar</button>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Placa</th>
                <th>Linha</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {onibus.map(onibus => (
                <tr key={onibus.id}>
                  <td>{onibus.id}</td>
                  <td>{onibus.placa}</td>
                  <td>{onibus.linhaOnibusNome} - {onibus.linhaOnibusCidadeNome}</td>
                  <td>
                    <button onClick={() => iniciarEdicaoOnibus(onibus)}>Editar</button>
                    <button onClick={() => excluirOnibus(onibus.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;