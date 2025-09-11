// livro.js - Exercício 5
// Criando um objeto que representa as informações de um livro

const livro = {
    titulo: "Das Kapital",
    autor: "Karl Marx und Friedrich Engels",
    anoPublicacao: 1867,
    genero: "Filosofia"
};

// Exibindo as informações do livro
console.log("=== INFORMAÇÕES DO LIVRO ===");
console.log("Título:", livro.titulo);
console.log("Autor:", livro.autor);
console.log("Ano de Publicação:", livro.anoPublicacao);
console.log("Gênero:", livro.genero);

// Exibindo o objeto completo
console.log("\n=== OBJETO COMPLETO ===");
console.log(livro);

// Exemplo alternativo de como acessar as propriedades
console.log("\n=== FORMATAÇÃO PERSONALIZADA ===");
console.log(`📚 "${livro.titulo}" foi escrito por ${livro.autor} em ${livro.anoPublicacao}.`);
console.log(`📖 Gênero: ${livro.genero}`);

// ==========================================
// INSTANCIANDO UM NOVO OBJETO LIVRO
// ==========================================

// Criando uma nova instância de livro com um livro que eu recomendaria
const meuLivroFavorito = {
    titulo: "O Terceiro Tira",
    autor: "Flann O' Brien",
    anoPublicacao: 1967,
    genero: "Romance; Cômico; Absurdo-sombrio"
};

console.log("\n\n🌟 === MEU LIVRO FAVORITO ===");
console.log("Título:", meuLivroFavorito.titulo);
console.log("Autor:", meuLivroFavorito.autor);
console.log("Ano de Publicação:", meuLivroFavorito.anoPublicacao);
console.log("Gênero:", meuLivroFavorito.genero);

console.log("\n=== OBJETO COMPLETO ===");
console.log(meuLivroFavorito);

console.log("\n=== DESCRIÇÃO DETALHADA ===");
console.log(`🚀 "${meuLivroFavorito.titulo}" é uma obra-prima de ${meuLivroFavorito.autor},`);
console.log(`   publicada em ${meuLivroFavorito.anoPublicacao}. Este clássico da ${meuLivroFavorito.genero}`);
console.log(`   combina humor inteligente com aventuras espaciais inesquecíveis!`);
console.log(`\n`)


const meuSegundoLivroFavorito = {
    titulo: "O Estrangeiro",
    autor: "Albert Camus",
    anoPublicacao: 1947,
    genero: "Romance; Tragédia"
};

console.log("\n\n🌟 === MEU SEGUNDO LIVRO FAVORITO ===");
console.log("Título:", meuSegundoLivroFavorito.titulo);
console.log("Autor:", meuSegundoLivroFavorito.autor);
console.log("Ano de Publicação:", meuSegundoLivroFavorito.anoPublicacao);
console.log("Gênero:", meuSegundoLivroFavorito.genero);

console.log("\n=== OBJETO COMPLETO ===");
console.log(meuLivroFavorito);

console.log("\n=== DESCRIÇÃO DETALHADA ===");
console.log(`🚀 "${meuSegundoLivroFavorito.titulo}" é uma obra-prima de ${meuSegundoLivroFavorito.autor},`);
console.log(`   publicada em ${meuSegundoLivroFavorito.anoPublicacao}. Este clássico da ${meuSegundoLivroFavorito.genero}`);
console.log(`   combina humor inteligente com aventuras espaciais inesquecíveis!`);
console.log(`\n`)
