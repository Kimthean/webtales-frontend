export function getTokenExpirationTime(token: string | undefined): number {
  try {
    const base64Url = token?.split(".")[1];
    const base64 = base64Url
      ? base64Url.replace(/-/g, "+").replace(/_/g, "/")
      : "";
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const payload = JSON.parse(jsonPayload);
    return payload.exp * 1000;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return 0;
  }
}
