export const TMDB_API_KEYS = [
  "fb7bb23f03b6994dafc674c074d01761",
  "e55425032d3d0f371fc776f302e7c09b",
  "8301a21598f8b45668d5711a814f01f6",
  "8cf43ad9c085135b9479ad5cf6bbcbda",
  "da63548086e399ffc910fbc08526df05",
  "13e53ff644a8bd4ba37b3e1044ad24f3",
  "269890f657dddf4635473cf4cf456576",
  "a2f888b27315e62e471b2d587048f32e",
  "8476a7ab80ad76f0936744df0430e67c",
  "5622cafbfe8f8cfe358a29c53e19bba0",
  "ae4bd1b6fce2a5648671bfc171d15ba4",
  "257654f35e3dff105574f97fb4b97035",
  "2f4038e83265214a0dcd6ec2eb3276f5",
  "9e43f45f94705cc8e1d5a0400d19a7b7",
  "af6887753365e14160254ac7f4345dd2",
  "06f10fc8741a672af455421c239a1ffc",
  "fb7bb23f03b6994dafc674c074d01761",
  "09ad8ace66eec34302943272db0e8d2c",
];

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function withApiKey(path, key) {
  const hasQuery = path.includes("?");
  return `${TMDB_BASE_URL}${path}${hasQuery ? "&" : "?"}api_key=${key}`;
}

export async function checkTMDBKeys(keys = TMDB_API_KEYS) {
  const checks = await Promise.all(
    keys.map(async (key) => {
      try {
        const response = await fetch(withApiKey("/configuration", key));
        return {
          key,
          ok: response.ok,
          status: response.status,
        };
      } catch (error) {
        return {
          key,
          ok: false,
          status: 0,
          error: error.message,
        };
      }
    }),
  );

  return checks;
}

export async function fetchTMDBJson(path, keys = TMDB_API_KEYS) {
  const attempts = [];

  for (const key of keys) {
    try {
      const response = await fetch(withApiKey(path, key));

      if (!response.ok) {
        attempts.push({
          key,
          status: response.status,
        });
        continue;
      }

      return {
        key,
        status: response.status,
        data: await response.json(),
      };
    } catch (error) {
      attempts.push({
        key,
        status: 0,
        error: error.message,
      });
    }
  }

  const error = new Error("No working TMDB API key found.");
  error.attempts = attempts;
  throw error;
}
