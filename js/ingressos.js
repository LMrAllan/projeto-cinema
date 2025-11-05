// Carregar sessões no select
function carregarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const select = document.getElementById('sessao');
    
    select.innerHTML = '<option value="">Selecione uma sessão</option>';
    sessoes.forEach(sessao => {
        const data = new Date(sessao.dataHora);
        select.innerHTML += `<option value="${sessao.id}">${sessao.filmeTitulo} - ${data.toLocaleString()}</option>`;
    });
}

// Inicializar
carregarSessoes();

// Vender ingresso
document.getElementById('form-ingresso').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const ingresso = {
        id: Date.now(),
        sessaoId: parseInt(document.getElementById('sessao').value),
        nomeCliente: document.getElementById('nomeCliente').value,
        cpf: document.getElementById('cpf').value,
        assento: document.getElementById('assento').value,
        pagamento: document.getElementById('pagamento').value
    };
    
    let ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    ingressos.push(ingresso);
    localStorage.setItem('ingressos', JSON.stringify(ingressos));
    
    alert('Venda confirmada com sucesso!');
    this.reset();
});