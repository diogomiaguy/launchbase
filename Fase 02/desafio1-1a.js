const nome = "Carlos";
const peso = 84;
const altura = 1.88;

const imc = peso / (altura * altura);

if (imc >= 30) {
  console.log(`Carlos você está acima do peso ${imc.toFixed(2)}`);
} 
else {
  console.log(`Carlos você não está acima do peso ${imc.toFixed(2)}`);
}
