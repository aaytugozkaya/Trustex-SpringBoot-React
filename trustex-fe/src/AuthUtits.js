export const isAuthenticated = () => {
    const token = localStorage.getItem("tokenKey");
    return !!token; // Token varsa true, yoksa false döner
};