const t = (t2, e = "") => {
  const r = new Date(t2);
  switch (e) {
    case "dd/mm/yyyy":
      return r.toLocaleString("pt-BR");
    case "hh:mm":
      return r.toLocaleTimeString("pt-BR");
    default:
      return r.toLocaleDateString("pt-BR");
  }
};

export { t };
//# sourceMappingURL=formatDate-Dt3m51Lf.mjs.map
