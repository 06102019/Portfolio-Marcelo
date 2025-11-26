// ===== MAIN.JS - Menu, formulário, localStorage =====

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado - Iniciando configurações...");

  // ===== CONFIGURAÇÃO DO MENU HAMBURGUER =====
  const botaoMenu = document.getElementById("botaoMenu");
  const menuNavegacao = document.getElementById("menuNavegacao");

  if (botaoMenu && menuNavegacao) {
    console.log("✅ Elementos do menu encontrados");

    // Evento de clique no botão do menu
    botaoMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      const estaAtivo = menuNavegacao.classList.toggle("ativo");
      botaoMenu.textContent = estaAtivo ? "✕" : "☰";
      console.log(`📱 Menu ${estaAtivo ? "aberto" : "fechado"}`);
    });

    // Fecha o menu ao clicar em links
    document.querySelectorAll(".link-navegacao").forEach((link) => {
      link.addEventListener("click", () => {
        menuNavegacao.classList.remove("ativo");
        botaoMenu.textContent = "☰";
        console.log("🔗 Menu fechado ao clicar no link");
      });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        menuNavegacao.classList.contains("ativo") &&
        !menuNavegacao.contains(e.target) &&
        !botaoMenu.contains(e.target)
      ) {
        menuNavegacao.classList.remove("ativo");
        botaoMenu.textContent = "☰";
        console.log("📱 Menu fechado ao clicar fora");
      }
    });

    // Previne fechamento ao clicar no menu
    menuNavegacao.addEventListener("click", (e) => e.stopPropagation());
  }

  // ===== MANIPULAÇÃO DO FORMULÁRIO =====
  const formulario = document.getElementById("formularioContato");
  const mensagemStatus = document.getElementById("mensagemStatus");
  const botaoLimpar = document.getElementById("botaoLimpar");

  if (formulario) {
    console.log("✅ Formulário de contato encontrado");

    // Validação de email
    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Salva mensagem no localStorage
    const salvarMensagem = (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();

      // Validação
      if (!nome || !email || !mensagem) {
        if (mensagemStatus) {
          mensagemStatus.textContent = "❌ Preencha todos os campos.";
          mensagemStatus.style.color = "#ff4444";
        }
        return;
      }

      if (!validarEmail(email)) {
        if (mensagemStatus) {
          mensagemStatus.textContent = "❌ Digite um email válido.";
          mensagemStatus.style.color = "#ff4444";
        }
        return;
      }

      // Salva no localStorage
      const chave = "portfolio_contatos";
      const contatos = JSON.parse(localStorage.getItem(chave) || "[]");

      contatos.push({
        nome,
        email,
        mensagem,
        data: new Date().toLocaleString("pt-BR"),
        timestamp: new Date().getTime(),
      });

      localStorage.setItem(chave, JSON.stringify(contatos));

      // Feedback visual
      if (mensagemStatus) {
        mensagemStatus.textContent = "✅ Mensagem salva localmente!";
        mensagemStatus.style.color = "#00ffcc";
      }

      formulario.reset();

      // Limpa mensagem após 5 segundos
      setTimeout(() => {
        if (mensagemStatus) mensagemStatus.textContent = "";
      }, 5000);

      console.log("💾 Mensagem salva no localStorage");
    };

    // Event listeners
    formulario.addEventListener("submit", salvarMensagem);

    if (botaoLimpar) {
      botaoLimpar.addEventListener("click", () => {
        formulario.reset();
        if (mensagemStatus) mensagemStatus.textContent = "";
        console.log("🧹 Formulário limpo");
      });
    }

    // Limpa mensagens de erro ao digitar
    formulario.addEventListener("input", () => {
      if (mensagemStatus && mensagemStatus.textContent.includes("❌")) {
        mensagemStatus.textContent = "";
      }
    });
  }

  // ===== ANIMAÇÕES DE SCROLL =====
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity = "1";
          entrada.target.style.transform = "translateY(0)";
          console.log(`🎯 Elemento animado: ${entrada.target.tagName}`);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Aplica animação aos cards
  document
    .querySelectorAll(".cartao-blog, .cartao-projeto")
    .forEach((cartao) => {
      cartao.style.opacity = "0";
      cartao.style.transform = "translateY(20px)";
      cartao.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observador.observe(cartao);
    });

  console.log("🚀 Configurações inicializadas com sucesso!");
});

// ===== FUNÇÕES UTILITÁRIAS =====

/** Visualiza mensagens salvas no localStorage */
const verMensagensSalvas = () => {
  const contatos = JSON.parse(
    localStorage.getItem("portfolio_contatos") || "[]"
  );
  console.log("💌 Mensagens salvas:", contatos);
  return contatos;
};

/** Limpa todas as mensagens do localStorage */
const limparTodasMensagens = () => {
  localStorage.removeItem("portfolio_contatos");
  console.log("🗑️ Todas as mensagens removidas");
};

/** Exporta mensagens como arquivo JSON */
const exportarMensagens = () => {
  const contatos = JSON.parse(
    localStorage.getItem("portfolio_contatos") || "[]"
  );
  const dadosString = JSON.stringify(contatos, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dadosString);

  const elementoLink = document.createElement("a");
  elementoLink.setAttribute("href", dataUri);
  elementoLink.setAttribute("download", "contatos_portfolio.json");
  elementoLink.click();

  console.log("📤 Mensagens exportadas como JSON");
};

// Configuração dos Carrosséis - Conquistas e Projetos
$(document).ready(function() {
    
    // ===== CONFIGURAÇÃO DO CARROSSEL DE CONQUISTAS =====
    $('#carrosselConquistas').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        },
        onInitialized: function(event) {
            atualizarIndicadores(event, 'indicadoresConquistas');
        },
        onChanged: function(event) {
            atualizarIndicadores(event, 'indicadoresConquistas');
        }
    });

    // ===== CONFIGURAÇÃO DO CARROSSEL DE PROJETOS =====
    $('#carrosselProjetos').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        },
        onInitialized: function(event) {
            atualizarIndicadores(event, 'indicadoresProjetos');
        },
        onChanged: function(event) {
            atualizarIndicadores(event, 'indicadoresProjetos');
        }
    });

    // ===== CONTROLES DE NAVEGAÇÃO =====
    
    // Conquistas - Anterior
    $('.conquistas .controle-anterior').click(function() {
        $('#carrosselConquistas').trigger('prev.owl.carousel');
    });

    // Conquistas - Próximo
    $('.conquistas .controle-proximo').click(function() {
        $('#carrosselConquistas').trigger('next.owl.carousel');
    });

    // Projetos - Anterior
    $('.projetos .controle-anterior').click(function() {
        $('#carrosselProjetos').trigger('prev.owl.carousel');
    });

    // Projetos - Próximo
    $('.projetos .controle-proximo').click(function() {
        $('#carrosselProjetos').trigger('next.owl.carousel');
    });

    // ===== FUNÇÃO PARA ATUALIZAR INDICADORES =====
    function atualizarIndicadores(event, idContainer) {
        var totalItems = event.item.count;
        var currentItem = event.item.index + 1;
        var container = document.getElementById(idContainer);
        
        // Limpar indicadores existentes
        container.innerHTML = '';
        
        // Criar novos indicadores
        for (var i = 0; i < totalItems; i++) {
            var indicador = document.createElement('button');
            indicador.className = 'indicador' + (i === event.item.index ? ' ativo' : '');
            indicador.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
            indicador.setAttribute('data-index', i);
            
            // Adicionar evento de clique
            indicador.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                event.trigger('to.owl.carousel', [index, 300]);
            });
            
            container.appendChild(indicador);
        }
    }

    // ===== PAUSA NO HOVER =====
    $('.owl-carousel').hover(
        function() {
            $(this).trigger('stop.owl.autoplay');
        },
        function() {
            $(this).trigger('play.owl.autoplay');
        }
    );

    // ===== ANIMAÇÃO DE ENTRADA =====
    function animarEntradaElementos() {
        $('.cartao-conquista, .cartao-projeto').each(function(index) {
            var elemento = $(this);
            setTimeout(function() {
                elemento.css({
                    'opacity': '0',
                    'transform': 'translateY(30px)'
                }).animate({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                }, 600);
            }, index * 200);
        });
    }

    // Executar animação quando a página carregar
    animarEntradaElementos();

    // ===== KEYBOARD NAVIGATION =====
    $(document).keydown(function(e) {
        // Navegação com teclado apenas quando os carrosséis estão visíveis
        if ($('.conquistas').is(':visible')) {
            switch(e.which) {
                case 37: // Seta esquerda
                    $('#carrosselConquistas').trigger('prev.owl.carousel');
                    break;
                case 39: // Seta direita
                    $('#carrosselConquistas').trigger('next.owl.carousel');
                    break;
            }
        }
        
        if ($('.projetos').is(':visible')) {
            switch(e.which) {
                case 37: // Seta esquerda
                    $('#carrosselProjetos').trigger('prev.owl.carousel');
                    break;
                case 39: // Seta direita
                    $('#carrosselProjetos').trigger('next.owl.carousel');
                    break;
            }
        }
    });

    console.log('Carrosséis inicializados com sucesso!');
});