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
    listarSalas();
});

function listarSalas() {
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const container = document.getElementById('lista-salas');
    const noSalas = document.getElementById('no-salas');
    
    if (salas.length === 0) {
        container.innerHTML = '';
        noSalas.style.display = 'block';
        return;
    }
    
    noSalas.style.display = 'none';
    container.innerHTML = '';
    
    salas.forEach(sala => {
        const salaElement = document.createElement('div');
        salaElement.className = 'col-12 mb-3';
        salaElement.innerHTML = `
            <div class="card">
                <div class="card-body text-white">
                    <h5 class="card-title">${sala.nome}</h5>
                    <p class="card-text"><strong>Capacidade:</strong> ${sala.capacidade} lugares</p>
                    <p class="card-text"><strong>Tipo:</strong> ${sala.tipo}</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-danger btn-sm" onclick="excluirSala(${sala.id})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(salaElement);
    });
}

function excluirSala(id) {
    if (confirm('Tem certeza que deseja excluir esta sala?')) {
        let salas = JSON.parse(localStorage.getItem('salas')) || [];
        salas = salas.filter(sala => sala.id !== id);
        localStorage.setItem('salas', JSON.stringify(salas));
        
        alert('Sala excluída com sucesso!');
        listarSalas();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    listarSalas();
});