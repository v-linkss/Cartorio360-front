import { helpers } from '@vuelidate/validators';

export const cnpj = helpers.withMessage('CNPJ inválido', (value:string) => {
    if (!value) return false; // Se o valor estiver vazio, é inválido

    const cnpj = value.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cnpj.length !== 14) return false;
  
    // Elimina CNPJs inválidos conhecidos (como 11111111111111)
    if (/^(\d)\1+$/.test(cnpj)) return false;
  
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
  
    // Validação do primeiro dígito verificador
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
  
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0), 10)) return false;
  
    // Validação do segundo dígito verificador
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
  
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
  
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1), 10);
});
