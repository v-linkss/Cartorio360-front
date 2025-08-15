export default defineNuxtRouteMiddleware((to, from) => {
  const tokenCookie = useCookie("auth_token");
  const token = tokenCookie.value;

  // Permitir acesso à rota "/chat_bot" sem autenticação
  if (
    !token &&
    to.path !== "/login" &&
    to.path !== "/chat_bot" &&
    to.path !== "/recupera_senha"
  ) {
    return navigateTo("/login");
  }
});
