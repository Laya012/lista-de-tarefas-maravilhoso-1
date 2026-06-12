function atualizarContador() {
    let lista = document.getElementById('lista');
    let contador = document.getElementById('contador');
    let total = lista.children.length;
    contador.textContent = total;
}

function salvarTarefas() {
    let lista = document.getElementById('lista');
    let tarefas = [];
    for (let item of lista.children) {
        let texto = item.querySelector('span').textContent;
        let concluida = item.classList.contains('concluida');
        tarefas.push({ texto: texto, concluida: concluida });
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    let tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        let tarefas = JSON.parse(tarefasSalvas);
        for (let tarefa of tarefas) {
            adicionarTarefaNaLista(tarefa.texto, tarefa.concluida);
        }
    }
}

function adicionarTarefaNaLista(texto, concluida = false) {
    let lista = document.getElementById('lista');
    
    let li = document.createElement('li');
    
    let span = document.createElement('span');
    span.textContent = texto;
    
    let divBotoes = document.createElement('div');
    
    let btnConcluir = document.createElement('button');
    btnConcluir.textContent = '✓ Concluir';
    btnConcluir.className = 'btn-concluir';
    btnConcluir.onclick = function() {
        li.classList.toggle('concluida');
        salvarTarefas();
    };
    
    let btnEditar = document.createElement('button');
    btnEditar.textContent = '✎ Editar';
    btnEditar.className = 'btn-editar';
    btnEditar.onclick = function() {
        let novoTexto = prompt('Editar tarefa:', span.textContent);
        if (novoTexto && novoTexto.trim() !== '') {
            span.textContent = novoTexto.trim();
            salvarTarefas();
        }
    };
    
    let btnRemover = document.createElement('button');
    btnRemover.textContent = '✗ Remover';
    btnRemover.className = 'btn-remover';
    btnRemover.onclick = function() {
        li.remove();
        atualizarContador();
        salvarTarefas();
    };
    
    divBotoes.appendChild(btnConcluir);
    divBotoes.appendChild(btnEditar);
    divBotoes.appendChild(btnRemover);
    
    li.appendChild(span);
    li.appendChild(divBotoes);
    
    if (concluida) {
        li.classList.add('concluida');
    }
    
    lista.appendChild(li);
    atualizarContador();
    salvarTarefas();
}

function adicionarTarefa() {
    let input = document.getElementById('tarefa');
    let texto = input.value.trim();
    
    if (texto === '') {
        alert('Digite uma tarefa!');
        return;
    }
    
    adicionarTarefaNaLista(texto);
    input.value = '';
    input.focus();
}

function limparTodasTarefas() {
    if (confirm('Tem certeza que quer limpar TODAS as tarefas?')) {
        let lista = document.getElementById('lista');
        lista.innerHTML = '';
        atualizarContador();
        salvarTarefas();
    }
}

window.onload = function() {
    carregarTarefas();
    
    document.getElementById('btnAdicionar').onclick = adicionarTarefa;
    document.getElementById('btnLimparTudo').onclick = limparTodasTarefas;
    
    document.getElementById('tarefa').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarTarefa();
        }
    });
};
