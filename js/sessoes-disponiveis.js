function listarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const container = document.getElementById('lista-sessoes');
    const noSessions = document.getElementById('no-sessions');
    
    if (sessoes.length === 0) {
        container.innerHTML = '';
        noSessions.style.display = 'block';
        return;
    }
    
    noSessions.style.display = 'none';
    container.innerHTML = '';
    
    sessoes.forEach(sessao => {
        const data = new Date(sessao.dataHora);
        const dataFormatada = isNaN(data.getTime()) ? 'Data inválida' : data.toLocaleString();
        
        const sessaoElement = document.createElement('div');
        sessaoElement.className = 'col-md-6 mb-3';
        sessaoElement.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-white">
                    <h5 class="card-title">${sessao.filmeTitulo || 'Título não definido'}</h5>
                    <p class="card-text"><strong>Sala:</strong> ${sessao.salaNome || 'Sala não definida'}</p>
                    <p class="card-text"><strong>Data e Hora:</strong> ${dataFormatada}</p>
                    <p class="card-text"><strong>Preço:</strong> R$ ${sessao.preco ? sessao.preco.toFixed(2) : '0.00'}</p>
                    <p class="card-text"><strong>Idioma:</strong> ${sessao.idioma || 'Não definido'}</p>
                    <p class="card-text"><strong>Formato:</strong> ${sessao.formato || 'Não definido'}</p>
                    <div class="d-grid gap-2 d-md-flex">
                        <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-success me-md-2">Comprar Ingresso</a>
                        <button class="btn btn-danger" onclick="excluirSessao(${sessao.id})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(sessaoElement);
    });
}

function excluirSessao(sessaoId) {
    if (confirm('Tem certeza que deseja excluir esta sessão?')) {
        let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        sessoes = sessoes.filter(sessao => sessao.id !== sessaoId);
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        
        alert('Sessão excluída com sucesso!');
        listarSessoes();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    listarSessoes();
});