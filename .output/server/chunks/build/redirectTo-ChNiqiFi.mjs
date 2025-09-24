import { u as useRouter$1 } from './server.mjs';

function useRedirectTo() {
  const router = useRouter$1();
  const redirectTo = ({ item, id, numeroOs, origem }) => {
    let path = "";
    switch (item.rota) {
      case "/fontes/atos/ato-com-bem/geral":
        path = `/fontes/atos/atos-com-bem/atualizar/${item.id}`;
        break;
      case "/fontes/atos/divorcio/geral":
        path = `/fontes/atos/divorcio/atualizar/${item.id}`;
        break;
      case "/fontes/atos/ato-sem-bem/geral":
        path = `/fontes/atos/atos-sem-bem/atualizar/${item.id}`;
        break;
    }
    if (path) {
      router.push({
        path,
        query: {
          origem,
          id,
          ato_id: item.id,
          tipo_ato_token: item.tipo_token,
          tipo_ato: item.tipo,
          ato_token_edit: item.token,
          numero_os: numeroOs
        }
      });
    } else {
      console.warn("Rota n\xE3o reconhecida para redirecionamento:", item.rota);
    }
  };
  return {
    redirectTo
  };
}

export { useRedirectTo as u };
//# sourceMappingURL=redirectTo-ChNiqiFi.mjs.map
