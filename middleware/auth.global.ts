export default defineNuxtRouteMiddleware((to, from) => {
  const tokenCookie = useCookie("auth_token");
  const token = tokenCookie.value;

  if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }
});
