function listarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const container = document.getElementById('lista-sessoes');
    
    if (sessoes.length === 0) {
        container.innerHTML = '<p>Nenhuma sessão disponível.</p>';
        return;
    }
    
    container.innerHTML = '';
    sessoes.forEach(sessao => {
        const data = new Date(sessao.dataHora);
        const sessaoElement = document.createElement('div');
        sessaoElement.className = 'sessao-item';
        sessaoElement.innerHTML = `
            <h3>${sessao.filmeTitulo}</h3>
            <p><strong>Sala:</strong> ${sessao.salaNome}</p>
            <p><strong>Data e Hora:</strong> ${data.toLocaleString()}</p>
            <p><strong>Preço:</strong> R$ ${sessao.preco.toFixed(2)}</p>
            <p><strong>Idioma:</strong> ${sessao.idioma}</p>
            <p><strong>Formato:</strong> ${sessao.formato}</p>
            <div class="sessao-actions">
                <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn-comprar">Comprar Ingresso</a>
                <button class="btn-excluir" onclick="excluirSessao(${sessao.id})">Excluir Sessão</button>
            </div>
        `;
        container.appendChild(sessaoElement);
    });
}

function excluirSessao(sessaoId) {
    if (confirm('Tem certeza que deseja excluir esta sessão?')) {
        let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        
        // Verificar se há ingressos vendidos para esta sessão
        const ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
        const ingressosDaSessao = ingressos.filter(ingresso => ingresso.sessaoId === sessaoId);
        
        if (ingressosDaSessao.length > 0) {
            if (!confirm(`Esta sessão possui ${ingressosDaSessao.length} ingresso(s) vendido(s). Deseja excluir mesmo assim?`)) {
                return;
            }
        }
        
        // Remover a sessão
        sessoes = sessoes.filter(sessao => sessao.id !== sessaoId);
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        
        // Remover ingressos relacionados a esta sessão
        const ingressosAtualizados = ingressos.filter(ingresso => ingresso.sessaoId !== sessaoId);
        localStorage.setItem('ingressos', JSON.stringify(ingressosAtualizados));
        
        alert('Sessão excluída com sucesso!');
        listarSessoes();
    }
}

// Carregar sessão específica se veio por parâmetro
function carregarSessaoParametro() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessaoId = urlParams.get('sessaoId');
    
    if (sessaoId) {
        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        const sessao = sessoes.find(s => s.id == sessaoId);
        
        if (sessao) {
            const container = document.getElementById('lista-sessoes');
            const data = new Date(sessao.dataHora);
            
            container.innerHTML = `
                <div class="sessao-item">
                    <h3>${sessao.filmeTitulo}</h3>
                    <p><strong>Sala:</strong> ${sessao.salaNome}</p>
                    <p><strong>Data e Hora:</strong> ${data.toLocaleString()}</p>
                    <p><strong>Preço:</strong> R$ ${sessao.preco.toFixed(2)}</p>
                    <p><strong>Idioma:</strong> ${sessao.idioma}</p>
                    <p><strong>Formato:</strong> ${sessao.formato}</p>
                    <div class="sessao-actions">
                        <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn-comprar">Comprar Ingresso</a>
                        <button class="btn-excluir" onclick="excluirSessao(${sessao.id})">Excluir Sessão</button>
                    </div>
                </div>
            `;
        }
    }
}

// Inicializar
if (window.location.search.includes('sessaoId')) {
    carregarSessaoParametro();
} else {
    listarSessoes();
}