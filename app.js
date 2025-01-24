// Lista vazia para armazenar os nomes dos amigos
let listaDeAmigos = []; // Lista global onde os amigos adicionados serão armazenados

// Lista para armazenar os amigos que já foram sorteados
let listaDeSorteados = []; // Lista global onde os amigos sorteados serão armazenados

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById("amigo"); // Localiza o campo de entrada (input) pelo ID "amigo"
    const nome = input.value.trim(); // Obtém o nome digitado e remove os espaços em branco no início e no fim

    if (nome === "") { // Verifica se o nome está vazio
        alert("Por favor, insira um nome válido!"); // Alerta o usuário para inserir um nome válido
        return; // Interrompe a execução da função se o nome estiver vazio
    }

    if (listaDeAmigos.includes(nome)) { // Verifica se o nome já foi adicionado à lista
        alert("Este nome já foi adicionado!"); // Alerta que o nome já foi adicionado
        return; // Interrompe a execução da função se o nome já estiver na lista
    }

    listaDeAmigos.push(nome); // Adiciona o nome à lista de amigos
    input.value = ""; // Limpa o campo de entrada após adicionar o nome
    input.focus(); // Coloca o foco novamente no campo de entrada para facilitar a próxima digitação
    atualizarListaDeAmigos(); // Atualiza a lista de amigos na tela
}

// Função para atualizar a lista de amigos na tela
function atualizarListaDeAmigos() {
    const lista = document.getElementById("listaAmigos"); // Localiza o elemento da lista de amigos no HTML
    lista.innerHTML = ""; // Limpa o conteúdo atual da lista, para evitar duplicação de itens

    // Interação sobre todos os amigos na lista de amigos
    listaDeAmigos.forEach((amigo) => {
        const item = document.createElement("li"); // Cria um novo item de lista (<li>) para cada amigo
        item.textContent = amigo; // Define o nome do amigo como conteúdo do item da lista
        item.classList.add("name-item"); // Adiciona uma classe CSS para estilizar o item

        const botaoRemover = document.createElement("button"); // Cria um botão de remoção para o amigo
        botaoRemover.textContent = "🗑"; // Define o texto do botão como (ícone de lixo)
        botaoRemover.classList.add("button-remove"); // Adiciona uma classe CSS para estilizar o botão de remoção

        botaoRemover.onclick = () => removerAmigo(amigo); // Quando o botão de remover é clicado, chama a função `removerAmigo` para esse amigo

        item.appendChild(botaoRemover); // Adiciona o botão de remoção ao item de lista
        lista.appendChild(item); // Adiciona o item completo (nome + botão) à lista de amigos na tela
    });
}

// Função para remover um amigo da lista
function removerAmigo(nome) {
    const index = listaDeAmigos.indexOf(nome); // Encontra o índice do amigo na lista de amigos
    if (index > -1) { // Se o amigo for encontrado na lista
        listaDeAmigos.splice(index, 1); // Remove o amigo da lista de amigos
        atualizarListaDeAmigos(); // Atualiza a lista de amigos na tela
    }
}

// Função para sortear um amigo secreto
function sortearAmigo() {
    // Verifica se a lista de amigos está vazia
    if (listaDeAmigos.length === 0) { 
        alert("A lista está vazia! Adicione amigos antes de realizar o sorteio."); // Exibe alerta se a lista estiver vazia
        return; // Interrompe a execução da função se a lista estiver vazia
    }

    // Filtra a lista de amigos para garantir que não sorteie amigos que já foram sorteados
    const amigosDisponiveis = listaDeAmigos.filter(amigo => !listaDeSorteados.includes(amigo));

    // Verifica se todos os amigos já foram sorteados
    if (amigosDisponiveis.length === 0) {
        const resultado = document.getElementById("resultado"); // Localiza o elemento onde o resultado será exibido
        resultado.innerHTML = `<li class="result-item">🎉 Sorteio finalizado! 🎉</li>`; // Exibe mensagem de fim do sorteio
        return; // Interrompe a execução da função, pois o sorteio acabou
    }

    // Gera um índice aleatório entre 0 e o tamanho da lista de amigos disponíveis
    const indiceSorteado = Math.floor(Math.random() * amigosDisponiveis.length); 
    const amigoSorteado = amigosDisponiveis[indiceSorteado]; // Obtém o amigo sorteado pelo índice aleatório

    listaDeSorteados.push(amigoSorteado); // Adiciona o amigo sorteado à lista de sorteados

    const resultado = document.getElementById("resultado"); // Localiza o elemento onde o resultado será exibido
    resultado.innerHTML = `<li class="result-item">🎉 Amigo sorteado: <strong>${amigoSorteado}</strong> 🎉`; // Exibe o nome do amigo sorteado

    atualizarListaDeAmigos(); // Atualiza a lista de amigos na tela para refletir a mudança
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    listaDeAmigos = []; // Limpa a lista de amigos
    listaDeSorteados = []; // Limpa a lista de sorteados
    atualizarListaDeAmigos(); // Atualiza a lista de amigos na tela
    document.getElementById("resultado").innerHTML = ""; // Limpa o resultado do sorteio na tela
}