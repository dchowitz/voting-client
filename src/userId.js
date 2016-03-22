import cuid from 'cuid';

const key = 'voting-client-userid';

export default function getUserId() {
  let userId = localStorage.getItem(key);
  if (!userId) {
    localStorage.setItem(key, (userId = cuid()));
  }
  return userId;
}