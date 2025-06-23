export default defineNuxtRouteMiddleware((to, from) => {
  const tokenCookie = useCookie('auth_token');
  const token = tokenCookie.value;

  // Lista de rotas públicas (que não precisam de autenticação)
  const publicRoutes = ["/login", "/chat_bot"]; // Adicione aqui as rotas que deseja excluir

  // Se a rota atual for pública, não faz a verificação de autenticação
  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Se o token não existir e a rota não for pública, redireciona para "/login"
  if (!token) {
    return navigateTo("/login");
  }
});