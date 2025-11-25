// ======================================
// ==== SISTEMA DE USUÁRIOS LOCALSTORAGE =
// ======================================

// Recupera lista de usuários
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


// SALVAR LOGIN ATUAL
function logarUsuario(usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    atualizarAreaLogin();
}


// VERIFICA SE TEM ALGUÉM LOGADO
function obterUsuarioLogado() {
    return JSON.parse(localStorage.getItem("usuarioLogado"));
}


// EXIBE ÁREA (Login / Olá fulano / Sair)
function atualizarAreaLogin() {
    const area = document.getElementById("login-area");
    if (!area) return;

    const usuario = obterUsuarioLogado();

    if (usuario) {
        area.innerHTML = `
            <span class="welcome">Olá, <b>${usuario.usuario}</b></span>
            <button class="btnSair" onclick="logout()">Sair</button>
        `;
    } else {
        area.innerHTML = `
            <button class="btnLogin" onclick="abrirPopup()">Login</button>
        `;
    }
}


// LOGOUT
function logout() {
    localStorage.removeItem("usuarioLogado");
    atualizarAreaLogin();
    alert("Você saiu da conta.");
}



// ======================================
// =============== CADASTRAR ============
// ======================================

function cadastrar(event) {
    event.preventDefault();

    const usuario = document.getElementById("cadUsuario").value.trim();
    const senha = document.getElementById("cadSenha").value.trim();
    const confirmar = document.getElementById("cadConfirmar").value.trim();

    if (!usuario || !senha || !confirmar) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    // Pega usuários existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica duplicidade
    if (usuarios.some(u => u.usuario === usuario)) {
        alert("Usuário já existe! Escolha outro nome.");
        return;
    }

    // Adiciona usuário
    const novoUsuario = { usuario, senha };
    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Login automático
    logarUsuario(novoUsuario);

    alert("Cadastro realizado com sucesso!");

    // Redireciona
    window.location.href = "index.html";
}



// ======================================
// ================= LOGIN ==============
// ======================================

function login() {
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (!encontrado) {
        alert("Usuário ou senha incorretos!");
        return;
    }

    logarUsuario(encontrado);
    fecharPopup();

    alert("Bem-vindo, " + usuario + "!");
}



// ======================================
// ========= LISTA DE PRODUTOS ==========
// ======================================

const produtos = [
    { id: 1, nome: "Action-figure Goku", preco: 449.90, imagem: "img/action_goku.png" },
    { id: 2, nome: "Action-figure Gogeta", preco: 399.90, imagem: "img/action_gogeta.png" },
    { id: 3, nome: "Action-figure Gohan", preco: 430.90, imagem: "img/action_gohan.png" },
    { id: 4, nome: "Camiseta Bulma", preco: 79.90, imagem: "img/Camiseta_bulma.jpg" },
    { id: 5, nome: "Camiseta Goku", preco: 79.90, imagem: "img/Camiseta_vermelha_goku.webp" },
    { id: 6, nome: "Camiseta Goku e a Bruxa", preco: 79.90, imagem: "img/Camiseta_gokuebruxa.webp" },
    { id: 7, nome: "Mangá Dragon Ball Vol. 5", preco: 79.90, imagem: "img/manga_vol1.jpg" },
    { id: 8, nome: "Mangá Dragon Ball Vol. 21", preco: 79.90, imagem: "img/manga_vol2.jpg" },
    { id: 9, nome: "Mangá Dragon Ball Vol. 23", preco: 79.90, imagem: "img/manga_vol3.jpg" },
];

const container = document.getElementById("produtos");

if (container) {
    produtos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}">
        <h2>${p.nome}</h2>
        <p class="price">R$ ${p.preco.toFixed(2)}</p>
        <button class="btn" onclick="adicionarCarrinho(${p.id})">Adicionar ao Carrinho</button>
        `;
        container.appendChild(card);
    });
}



// ======================================
// ============ CARRINHO ================
// ======================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const existe = carrinho.find(item => item.id === id);

    if (existe) {
        existe.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const listaPopup = document.getElementById("lista-carrinho-popup");
    const totalEl = document.getElementById("total");
    const totalPopup = document.getElementById("total-popup");

    if (!lista || !listaPopup) return;

    lista.innerHTML = "";
    listaPopup.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)} x
            <input type="number" min="1" value="${item.quantidade}" 
            onchange="alterarQuantidade(${item.id}, this.value)">
            = R$ ${subtotal.toFixed(2)}
            <button onclick="removerCarrinho(${item.id})">X</button>
        `;

        lista.appendChild(li);
        listaPopup.appendChild(li.cloneNode(true));
    });

    if (totalEl) totalEl.textContent = "Total: R$ " + total.toFixed(2);
    if (totalPopup) totalPopup.textContent = "Total: R$ " + total.toFixed(2);

    const badge = document.getElementById("badgeCarrinho");
    if (badge) {
        badge.textContent = carrinho.reduce((s, i) => s + i.quantidade, 0);
    }
}

function alterarQuantidade(id, qtd) {
    const item = carrinho.find(i => i.id === id);
    if (item) {
        item.quantidade = parseInt(qtd);
        if (item.quantidade <= 0) removerCarrinho(id);
        salvarCarrinho();
        atualizarCarrinho();
    }
}

function removerCarrinho(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    salvarCarrinho();
    atualizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra finalizada!");
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
    fecharCarrinho();
}

atualizarCarrinho();


// ======================================
// =============== POPUPS ===============
// ======================================

function abrirPopup() {
    document.getElementById("popupLogin").style.display = "flex";
}

function fecharPopup() {
    document.getElementById("popupLogin").style.display = "none";
}

function abrirCarrinho() {
    document.getElementById("popupCarrinho").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("popupCarrinho").style.display = "none";
}



// ======================================
// ==== INICIALIZA ÁREA DE LOGIN ========
// ======================================

document.addEventListener("DOMContentLoaded", atualizarAreaLogin);
