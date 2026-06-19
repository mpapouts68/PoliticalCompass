const PROFILE_STORAGE_KEY = "ideologos-profile-id";

export function getStoredProfileId(): string {
  let id = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(PROFILE_STORAGE_KEY, id);
  }
  return id;
}

export function clearStoredProfileId(): void {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
}
