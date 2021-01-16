const nome = "Silvana";
const sexo = "F";
const idade = 80;
const contribuicao = 29;
const calcContribuicao = idade + contribuicao;

const homemAposenta =
  sexo == "M" && calcContribuicao > 95 && contribuicao >= 35;
const mulherAposenta =
  sexo == "F" && calcContribuicao > 85 && contribuicao >= 30;
if (homemAposenta || mulherAposenta) {
  console.log(`${nome}, você pode se aposentar!`);
} else {
  console.log(`${nome}, você NÃO pode se aposentar!`);
}
