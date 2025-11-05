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
});