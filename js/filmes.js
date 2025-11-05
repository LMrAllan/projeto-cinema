document.getElementById('form-filme').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const filme = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        genero: document.getElementById('genero').value,
        classificacao: document.getElementById('classificacao').value,
        duracao: parseInt(document.getElementById('duracao').value),
        estreia: document.getElementById('estreia').value
    };
    
    let filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    filmes.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmes));
    
    alert('Filme salvo com sucesso!');
    this.reset();
    listarFilmes();
});

function listarFilmes() {
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const container = document.getElementById('lista-filmes');
    const noFilmes = document.getElementById('no-filmes');
    
    if (filmes.length === 0) {
        container.innerHTML = '';
        noFilmes.style.display = 'block';
        return;
    }
    
    noFilmes.style.display = 'none';
    container.innerHTML = '';
    
    filmes.forEach(filme => {
        const filmeElement = document.createElement('div');
        filmeElement.className = 'col-12 mb-3';
        filmeElement.innerHTML = `
            <div class="card">
                <div class="card-body text-white">
                    <h5 class="card-title">${filme.titulo}</h5>
                    <p class="card-text"><strong>Gênero:</strong> ${filme.genero}</p>
                    <p class="card-text"><strong>Classificação:</strong> ${filme.classificacao} anos</p>
                    <p class="card-text"><strong>Duração:</strong> ${filme.duracao} minutos</p>
                    <p class="card-text"><strong>Estreia:</strong> ${new Date(filme.estreia).toLocaleDateString('pt-BR')}</p>
                    ${filme.descricao ? `<p class="card-text">${filme.descricao}</p>` : ''}
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-danger btn-sm" onclick="excluirFilme(${filme.id})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(filmeElement);
    });
}

function excluirFilme(id) {
    if (confirm('Tem certeza que deseja excluir este filme?')) {
        let filmes = JSON.parse(localStorage.getItem('filmes')) || [];
        filmes = filmes.filter(filme => filme.id !== id);
        localStorage.setItem('filmes', JSON.stringify(filmes));
        
        alert('Filme excluído com sucesso!');
        listarFilmes();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    listarFilmes();
});