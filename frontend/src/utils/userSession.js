export const USER_UPDATED_EVENT = "user-updated";

export function getStoredUser() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export function saveStoredUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event(USER_UPDATED_EVENT));
}

export function clearStoredUser() {
  localStorage.removeItem("user");
  window.dispatchEvent(new Event(USER_UPDATED_EVENT));
}
