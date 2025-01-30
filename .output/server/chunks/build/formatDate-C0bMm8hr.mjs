const __unimport_formatDate = (data, tipo = "") => {
  const dataFormatada = new Date(data);
  switch (tipo) {
    case "dd/mm/yyyy":
      return dataFormatada.toLocaleDateString("pt-BR");
    case "hh:mm":
      return dataFormatada.toLocaleTimeString("pt-BR");
    case "dd/mm/yyyy hh:mm":
      return `${dataFormatada.toLocaleDateString("pt-BR")} ${dataFormatada.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    default:
      return dataFormatada.toLocaleDateString("pt-BR");
  }
};
const formatToISO = (data) => {
  if (!data) return null;
  const parts = data.split("/");
  if (parts.length !== 3) return data;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

export { __unimport_formatDate as _, formatToISO as f };
//# sourceMappingURL=formatDate-C0bMm8hr.mjs.map
