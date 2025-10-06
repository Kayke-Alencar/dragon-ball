//popup
function login(){
      const usuario = document.getElementById ("usuario").value;
      const senha = document.getElementById ("senha").value;
      if (usuario === "Helder" && senha === "123") {
        document.getElementById ("popupLogin").style.display = "none";
        alert ("Bem-vindo ") + usuario + "!";
      } else {
        alert ("Usuário ou senha incorretos!")
      }
}
    
// Lista de produtos
const produtos = [
      { id: 1, nome: "action-figure Goku", preco: 449.90, imagem: "img/action_goku.png" },
      { id: 2, nome: "Action-figure Gogeta", preco: 399.90, imagem: "img/action_gogeta.png" },
      { id: 3, nome: "Action-figure Gohan", preco: 430.90, imagem: "img/action_gohan.png" },
      { id: 4, nome: "Camiseta  Bulma", preco: 79.90, imagem: "img/Camiseta_bulma.jpg" },
      { id: 5, nome: "Camiseta Goku", preco: 79.90, imagem: "img/Camiseta_vermelha_goku.webp" },
      { id: 6, nome: "Camiseta Goku e a bruxa", preco: 79.90, imagem: "img/Camiseta_gokuebruxa.webp" },
      { id: 7, nome: "Manga dragon ball vol. 5", preco: 79.90, imagem: "img/manga_vol1.jpg" },
      { id: 8, nome: "Manga dragon ball vol. 21", preco: 79.90, imagem: "img/manga_vol2.jpg" },
      { id: 9, nome: "Manga dragon ball vol. 23", preco: 79.90, imagem: "img/manga_vol3.jpg" },
    ];

    const container = document.getElementById("produtos");
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total");

    let carrinho = [];

    

    // Renderizar produtos
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

    function adicionarCarrinho(id) {
      const produto = produtos.find(p => p.id === id);
      carrinho.push(produto);
      atualizarCarrinho();
    }

    function removerCarrinho(index) {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    }

    function atualizarCarrinho() {
  // Atualiza a lista na seção principal (se quiser deixar)
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)}
      <button class="remover" onclick="removerCarrinho(${index})">X</button>
    `;
    listaCarrinho.appendChild(li);
    total += item.preco;
  });

  totalEl.textContent = "Total: R$ " + total.toFixed(2);

  // Atualiza o badge da navbar
  const badge = document.getElementById("badgeCarrinho");
  badge.textContent = carrinho.length;

  // Atualiza a lista no popup
  const listaPopup = document.getElementById("lista-carrinho-popup");
  listaPopup.innerHTML = "";
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.padding = "8px 0";
    li.style.borderBottom = "1px solid #eee";

    li.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <button class="remover" onclick="removerCarrinho(${index})">X</button>
    `;
    listaPopup.appendChild(li);
  });

  const totalPopup = document.getElementById("total-popup");
  totalPopup.textContent = "Total: R$ " + total.toFixed(2);
}

    function fecharPopup() {
  document.getElementById("popupLogin").style.display = "none";
}

function abrirPopup() {
  document.getElementById("popupLogin").style.display = "flex";
 document.getElementById("usuario").focus();
}

function abrirCarrinho() {
  document.getElementById("popupCarrinho").style.display = "flex";
}

function fecharCarrinho() {
  document.getElementById("popupCarrinho").style.display = "none";
}