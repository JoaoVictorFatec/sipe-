
document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("botao-notificacoes");
    const contador = document.getElementById("contador-notificacoes");

    if (!botao || !contador) {
        console.error("Botão de notificações não encontrado.");
        return;
    }

    const notificacoesIniciais = [
        {
            id: 1,
            titulo: "Atenção Pedagógica",
            mensagem: "O plano de aula de História (8.º Ano) exige adequação de competências.",
            data: "Hoje",
            lida: false
        }
    ];

    let notificacoes = [...notificacoesIniciais];
    let painel = null;

    try {
        const salvas = localStorage.getItem("sipe-notificacoes");

        if (salvas) {
            notificacoes = JSON.parse(salvas);
        }
    } catch (erro) {
        console.error("Erro ao carregar notificações:", erro);
    }

    function salvarNotificacoes() {
        try {
            localStorage.setItem(
                "sipe-notificacoes",
                JSON.stringify(notificacoes)
            );
            return true;
        } catch (erro) {
            console.error("Erro ao salvar notificações:", erro);
            alert("Não foi possível salvar as notificações.");
            return false;
        }
    }

    function atualizarContador() {
        const naoLidas = notificacoes.filter(
            notificacao => !notificacao.lida
        ).length;

        contador.textContent = naoLidas;
        contador.style.display = naoLidas > 0 ? "flex" : "none";

        botao.setAttribute(
            "aria-label",
            naoLidas > 0
                ? "Abrir notificações. " + naoLidas + " não lidas"
                : "Abrir notificações. Nenhuma não lida"
        );
    }

    function criarBotao(texto, cor) {
        const elemento = document.createElement("button");
        elemento.type = "button";
        elemento.textContent = texto;

        Object.assign(elemento.style, {
            padding: "9px 12px",
            border: "none",
            borderRadius: "7px",
            background: cor,
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600"
        });

        return elemento;
    }

    function renderizarNotificacoes() {
        const lista = painel.querySelector("#lista-notificacoes");
        lista.replaceChildren();

        if (notificacoes.length === 0) {
            const vazio = document.createElement("p");
            vazio.textContent = "Você não possui notificações.";
            vazio.style.color = "#64748b";
            vazio.style.textAlign = "center";
            vazio.style.padding = "20px 0";
            lista.appendChild(vazio);
            atualizarContador();
            return;
        }

        notificacoes.forEach(function (notificacao) {
            const item = document.createElement("div");

            Object.assign(item.style, {
                padding: "15px",
                borderBottom: "1px solid #e2e8f0",
                background: notificacao.lida ? "#ffffff" : "#f5f3ff",
                borderRadius: "6px",
                marginBottom: "8px"
            });

            const titulo = document.createElement("strong");
            titulo.textContent = notificacao.titulo;

            Object.assign(titulo.style, {
                display: "block",
                fontSize: "14px",
                marginBottom: "6px",
                color: "#1e293b"
            });

            const mensagem = document.createElement("p");
            mensagem.textContent = notificacao.mensagem;

            Object.assign(mensagem.style, {
                fontSize: "13px",
                lineHeight: "1.5",
                color: "#475569",
                margin: "0 0 8px"
            });

            const data = document.createElement("span");
            data.textContent = notificacao.data;

            Object.assign(data.style, {
                display: "block",
                fontSize: "11px",
                color: "#64748b",
                marginBottom: "10px"
            });

            item.append(titulo, mensagem, data);

            if (!notificacao.lida) {
                const marcar = criarBotao("Marcar como lida", "#6d28d9");

                marcar.addEventListener("click", function () {
                    notificacao.lida = true;

                    if (salvarNotificacoes()) {
                        renderizarNotificacoes();
                    } else {
                        notificacao.lida = false;
                    }
                });

                item.appendChild(marcar);
            } else {
                const estado = document.createElement("span");
                estado.textContent = "Lida";

                Object.assign(estado.style, {
                    color: "#15803d",
                    fontSize: "12px",
                    fontWeight: "600"
                });

                item.appendChild(estado);
            }

            lista.appendChild(item);
        });

        atualizarContador();
    }

    function fecharPainel() {
        if (painel) {
            painel.remove();
            painel = null;
        }

        botao.setAttribute("aria-expanded", "false");
        document.removeEventListener("keydown", tratarTecla);
        document.removeEventListener("click", tratarCliqueFora);
    }

    function tratarTecla(evento) {
        if (evento.key === "Escape") {
            fecharPainel();
        }
    }

    function tratarCliqueFora(evento) {
        if (
            painel &&
            !painel.contains(evento.target) &&
            !botao.contains(evento.target)
        ) {
            fecharPainel();
        }
    }

    function abrirPainel() {
        if (painel) {
            fecharPainel();
            return;
        }

        painel = document.createElement("section");
        painel.id = "painel-notificacoes";
        painel.setAttribute("aria-label", "Central de notificações");

        Object.assign(painel.style, {
            position: "absolute",
            top: "calc(100% + 12px)",
            right: "0",
            width: "min(380px, calc(100vw - 32px))",
            maxHeight: "70vh",
            overflowY: "auto",
            padding: "18px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 12px 35px rgba(0,0,0,0.16)",
            zIndex: "9998",
            boxSizing: "border-box",
            color: "#1e293b"
        });

        const cabecalho = document.createElement("div");

        Object.assign(cabecalho.style, {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "15px"
        });

        const titulo = document.createElement("h3");
        titulo.textContent = "Notificações";

        Object.assign(titulo.style, {
            fontSize: "18px",
            margin: "0"
        });

        const fechar = document.createElement("button");
        fechar.type = "button";
        fechar.textContent = "×";
        fechar.setAttribute("aria-label", "Fechar notificações");

        Object.assign(fechar.style, {
            border: "none",
            background: "transparent",
            color: "#64748b",
            fontSize: "26px",
            cursor: "pointer"
        });

        fechar.addEventListener("click", fecharPainel);

        cabecalho.append(titulo, fechar);

        const acoes = document.createElement("div");

        Object.assign(acoes.style, {
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "15px"
        });

        const marcarTodas = criarBotao("Marcar todas como lidas", "#6d28d9");

        marcarTodas.addEventListener("click", function () {
            const anteriores = notificacoes.map(n => n.lida);

            notificacoes.forEach(n => {
                n.lida = true;
            });

            if (salvarNotificacoes()) {
                renderizarNotificacoes();
            } else {
                notificacoes.forEach((n, i) => {
                    n.lida = anteriores[i];
                });
            }
        });

        const limpar = criarBotao("Limpar", "#64748b");

        limpar.addEventListener("click", function () {
            if (notificacoes.length === 0) return;

            if (confirm("Deseja excluir todas as notificações?")) {
                const anteriores = notificacoes;
                notificacoes = [];

                if (salvarNotificacoes()) {
                    renderizarNotificacoes();
                } else {
                    notificacoes = anteriores;
                    renderizarNotificacoes();
                }
            }
        });

        acoes.append(marcarTodas, limpar);

        const lista = document.createElement("div");
        lista.id = "lista-notificacoes";

        painel.append(cabecalho, acoes, lista);

        const areaBotao = botao.parentElement;

        if (getComputedStyle(areaBotao).position === "static") {
            areaBotao.style.position = "relative";
        }

        areaBotao.appendChild(painel);

        botao.setAttribute("aria-expanded", "true");

        renderizarNotificacoes();

        document.addEventListener("keydown", tratarTecla);
        document.addEventListener("click", tratarCliqueFora);
    }

    botao.addEventListener("click", abrirPainel);

    atualizarContador();
});


