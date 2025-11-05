// Carregar filmes e salas nos selects
function carregarFilmes() {
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const select = document.getElementById('filme');
    
    select.innerHTML = '<option value="">Selecione um filme</option>';
    filmes.forEach(filme => {
        select.innerHTML += `<option value="${filme.id}">${filme.titulo}</option>`;
    });
}

function carregarSalas() {
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const select = document.getElementById('sala');
    
    select.innerHTML = '<option value="">Selecione uma sala</option>';
    salas.forEach(sala => {
        select.innerHTML += `<option value="${sala.id}">${sala.nome} (${sala.tipo})</option>`;
    });
}

// Inicializar
carregarFilmes();
carregarSalas();

// Salvar sessão
document.getElementById('form-sessao').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const filmeId = parseInt(document.getElementById('filme').value);
    const salaId = parseInt(document.getElementById('sala').value);
    
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    
    const filme = filmes.find(f => f.id === filmeId);
    const sala = salas.find(s => s.id === salaId);
    
    const sessao = {
        id: Date.now(),
        filmeId: filmeId,
        salaId: salaId,
        dataHora: document.getElementById('dataHora').value,
        preco: parseFloat(document.getElementById('preco').value),
        idioma: document.getElementById('idioma').value,
        formato: document.getElementById('formato').value,
        filmeTitulo: filme.titulo,
        salaNome: sala.nome
    };
    
    let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    sessoes.push(sessao);
    localStorage.setItem('sessoes', JSON.stringify(sessoes));
    
    alert('Sessão salva com sucesso!');
    this.reset();
});