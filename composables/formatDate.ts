export default (data: string, tipo: string = "") => {
  const dataFormatada = new Date(data);
  switch (tipo) {
    case "dd/mm/yyyy":
    return dataFormatada.toLocaleDateString("pt-BR");
    case "hh:mm":
      return dataFormatada.toLocaleTimeString("pt-BR");
    case "dd/mm/yyyy hh:mm":
      return `${dataFormatada.toLocaleDateString("pt-BR")} ${dataFormatada.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}`;
    default:
      return dataFormatada.toLocaleDateString("pt-BR");
  }
};
