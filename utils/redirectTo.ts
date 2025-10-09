interface AtoItem {
  id: string | number;
  rota: string;
  tipo_token: string;
  tipo: string;
  token: string;
}

interface RedirectOptions {
  item: AtoItem;
  id: string | number;
  numeroOs: string;
  origem?: string;
}

export function useRedirectTo() {
  const router = useRouter();

  const redirectTo = ({ item, id, numeroOs, origem }: RedirectOptions) => {
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
          origem: origem,
          id: id,
          ato_id: item.id,
          tipo_ato_token: item.tipo_token,
          tipo_ato: item.tipo,
          ato_token_edit: item.token,
          numero_os: numeroOs,
        },
      });
    } else {
      console.warn("Rota não reconhecida para redirecionamento:", item.rota);
    }
  };

  return {
    redirectTo,
  };
}


