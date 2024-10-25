import { helpers } from '@vuelidate/validators';

const cpf = helpers.withMessage("CPF inv\xE1lido", (value) => {
  if (!value)
    return false;
  const cpf2 = value.replace(/[^\d]+/g, "");
  if (cpf2.length !== 11)
    return false;
  if (/^(\d)\1+$/.test(cpf2))
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf2.charAt(i)) * (10 - i);
  }
  let rev = 11 - add % 11;
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf2.charAt(9)))
    return false;
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf2.charAt(i)) * (11 - i);
  }
  rev = 11 - add % 11;
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf2.charAt(10)))
    return false;
  return true;
});

export { cpf as c };
//# sourceMappingURL=validaCpf-DuucUl6O.mjs.map
