import { fetchTMDBJson } from "./config.js";

(async () => {
  const HomeAPIRoutes = {
    "Trending Movies": { url: "/trending/movie/week" },
    "Popular Movies": { url: "/movie/popular" },
    "Top Rated Movies": { url: "/movie/top_rated" },
    "Now Playing at Theatres": { url: "/movie/now_playing" },
    "Upcoming Movies": { url: "/movie/upcoming" },
  };

  try {
    const entries = await Promise.all(
      Object.entries(HomeAPIRoutes).map(async ([label, route]) => {
        const { data, key } = await fetchTMDBJson(route.url);
        console.log(`TMDB key used for ${label}: ${key}`);
        return [label, data.results || []];
      }),
    );

    const data = Object.fromEntries(entries);
    const trending = data["Trending Movies"] || [];

    if (!trending.length) {
      throw new Error("Trending Movies returned no data.");
    }

    const main = trending[new Date().getDate() % trending.length];

    document.querySelector("#hero-image").src =
      `https://image.tmdb.org/t/p/original${main.backdrop_path}`;
    document.querySelector("#hero-preview-image").src =
      `https://image.tmdb.org/t/p/w300${main.poster_path}`;
    document.querySelector("#hero-title").innerText = main.title || main.name;
    document.querySelector("#hero-description").innerText = main.overview;
    document.querySelector("#watch-now-btn").href =
      `./watch.html?id=${main.id}`;
    document.querySelector("#view-info-btn").href = `./info.html?id=${main.id}`;

    Object.keys(data).forEach((key) => {
      document.querySelector("main").innerHTML += /*html*/ `
      <div class="section">
        <h2>${key}</h2>
        <div class="movie-list">
          ${data[key]
            .map((item) => {
              return `
            <a href="./info.html?id=${item.id}" class="movie-card">
              <img
                src="https://image.tmdb.org/t/p/w200${item.poster_path}"
                alt=""
              />
              <p>${item.title || item.name}</p>
            </a>
            `;
            })
            .join("")}
        </div>
      </div>
      `;
    });
  } catch (error) {
    console.error(error);
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `<p style="padding: 24px; color: #fff;">Không thể tải dữ liệu TMDB. Kiểm tra API key hoặc mạng.</p>`;
    }
  }
})();
