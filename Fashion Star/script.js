let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');
const botaocarrinho = document.querySelector('.carrinho');
const caixacarrinho = document.getElementById('caixacarrinho');
const cancelar = document.getElementById('cancelar-compra');
const items = document.querySelector('.items');
const totals = document.querySelector('.total');
const botaoadd = document.querySelectorAll('.adicionar');

let carrinho = [];

menuToggle.addEventListener('click', () => {

    document.body.style.overflow = show ? 'hidden' : 'initial'

    menuContent.classList.toggle('on', show);
    show = !show;
})

botaocarrinho.addEventListener('click', () => {
    caixacarrinho.style.display = 'flex';
});

cancelar.addEventListener('click', () => {
    caixacarrinho.style.display = 'none';
});

function atualizarCarrinho() {
    items.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';
        li.style.gap = '10px';
        li.style.margin = '10px 0';

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.nome;
        img.style.width = '100px';
        img.style.borderRadius = '8px';
        img.style.objectFit = 'cover';
        

        const info = document.createElement('div');
        info.classList.add('info-item');
        info.innerHTML = `
        <p class="nome-produto">${item.nome}</p>
        <p class="preco-produto">R$ ${item.preco.toFixed(2)}</p>
        `;

        

        const remover = document.createElement('button');
        remover.textContent = 'Remover';
        remover.style.background = '#ff3b3b';
        remover.style.color = '#fff';
        remover.style.border = 'none';
        remover.style.padding = '5px 10px';
        remover.style.borderRadius = '5px';
        remover.style.cursor = 'pointer';

        remover.addEventListener('click', () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });

        li.appendChild(img);
        li.appendChild(info);
        li.appendChild(remover);
        items.appendChild(li);

        total += item.preco;
    });

    totals.textContent = total.toFixed(2);
}

botaoadd.forEach(btn => {
    btn.addEventListener('click', () => {
        const nome = btn.dataset.name;
        const preco = parseFloat(btn.dataset.price);
        const produtoDiv = btn.closest('.shopping-div');
        const img = produtoDiv ? produtoDiv.querySelector('img').src : '';

        carrinho.push({ nome, preco, img });
        atualizarCarrinho();
    });
});