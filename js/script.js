// Função para exibir detalhes sobre um projeto
function mostrarDetalhes(projeto) {
    alert('Exibir ' + projeto + ' De Marcelo'); // Exibe um alerta com o nome do projeto
}

// Função para destacar o projeto ao passar o mouse
function destacarProjeto(elemento) {
    elemento.style.transform = 'scale(1.1)'; // Aumenta o tamanho do projeto
    elemento.style.boxShadow = '0 0 20px #8f0f0f'; // Adiciona um brilho 
}

// Função para remover o destaque quando o mouse sai
function removerDestaque(elemento) {
    elemento.style.transform = 'scale(1)'; // Retorna ao tamanho normal
    elemento.style.boxShadow = '0 0 10px #8f0f0f'; // Retorna à sombra original
}

// Função para enviar um formulário de contato
function enviarFormulario() {
    alert('Formulário enviado com sucesso!'); // Exibe um alerta de confirmação
}

// Função para destacar a foto de perfil ao passar o mouse
function destacarFotoPerfil(elemento) {
    elemento.style.transform = 'scale(1.4)'; // Aumenta ligeiramente o tamanho da foto
    elemento.style.boxShadow = '0 0 25px #ffcc00'; // Adiciona um brilho ao redor da foto
}

// Função para remover o destaque da foto de perfil quando o mouse sai
function removerDestaqueFotoPerfil(elemento) {
    elemento.style.transform = 'scale(1)'; // Retorna ao tamanho original
    elemento.style.boxShadow = '0 0 15px #fdfdfd'; // Retorna à sombra original
}

// Função para destacar a ferramenta ao passar o mouse
function destacarFerramenta(elemento) {
    elemento.style.transform = "scale(1.2)"; // Aumenta o tamanho da ferramenta
    elemento.style.boxShadow = "0 0 50px #8f0f0f"; // Adiciona um brilho 
}

// Função para remover o destaque quando o mouse sai
function removerDestaqueFerramenta(elemento) {
    elemento.style.transform = "scale(1)";
    elemento.style.boxShadow = "0 0 10px #8f0f0f";
}


