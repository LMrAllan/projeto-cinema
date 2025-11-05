document.getElementById('form-sala').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const sala = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        capacidade: parseInt(document.getElementById('capacidade').value),
        tipo: document.getElementById('tipo').value
    };
    
    let salas = JSON.parse(localStorage.getItem('salas')) || [];
    salas.push(sala);
    localStorage.setItem('salas', JSON.stringify(salas));
    
    alert('Sala salva com sucesso!');
    this.reset();
});