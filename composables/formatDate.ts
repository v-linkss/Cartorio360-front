export default (data: string, tipo: string = "") => {
  const dataFormatada = new Date(data);
  switch (tipo) {
    case "dd/mm/yyyy":
    return dataFormatada.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    case "hh:mm":
      return dataFormatada.toLocaleTimeString("pt-BR", { timeZone: "UTC" });
    case "dd/mm/yyyy hh:mm":
      return `${dataFormatada.toLocaleDateString("pt-BR", { timeZone: "UTC" })} ${dataFormatada.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}`;
    default:
      return dataFormatada.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  }
};
export const formatToISO = (data:string) => {
  if (!data) return null;
  const parts = data.split("/");
  if (parts.length !== 3) return data; 
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};