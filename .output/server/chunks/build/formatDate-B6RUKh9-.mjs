const __unimport_formatDate = (data, tipo = "") => {
  const dataFormatada = new Date(data);
  switch (tipo) {
    case "dd/mm/yyyy":
      return dataFormatada.toLocaleString("pt-BR");
    case "hh:mm":
      return dataFormatada.toLocaleTimeString("pt-BR");
    default:
      return dataFormatada.toLocaleDateString("pt-BR");
  }
};

export { __unimport_formatDate as _ };
//# sourceMappingURL=formatDate-B6RUKh9-.mjs.map
