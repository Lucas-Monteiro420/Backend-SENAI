// EXERCÍCIO 4 - CLÍNICA VETERINÁRIA
// ==========================================
console.log("=== EXERCÍCIO 4 - CLÍNICA VETERINÁRIA ===");

// Criando array vazio para representar a fila da clínica
let clinica = [];

console.log("🏥 Clínica Veterinária - Início do dia");
console.log("Fila inicial:", clinica);

console.log("\n📝 Chegada dos animais:");

// Simulando a chegada de três animais diferentes
clinica.push("Bar (Cachorro)");
console.log("✅ Bar chegou! Fila atual:", clinica);

clinica.push("Aris (Gato)");
console.log("✅ Aris chegou! Fila atual:", clinica);

clinica.push("Cóquis (Coelho)");
console.log("✅ Cóquis chegou! Fila atual:", clinica);

console.log("\n🐾 Lista completa de animais na clínica:");
console.log("Fila de atendimento:", clinica);

console.log("\n🩺 Atendimento dos animais (removendo da fila):");

// Removendo os animais da lista um por vez
while (clinica.length > 0) {
    let animalAtendido = clinica.shift(); // Remove o primeiro da fila
    console.log(`🏥 ${animalAtendido} foi atendido!`);
    console.log("Fila restante:", clinica);
}

console.log("\n✨ Estado final da clínica:");
console.log("Fila final:", clinica);
console.log("🎉 Todos os animais foram atendidos! Clínica vazia.");