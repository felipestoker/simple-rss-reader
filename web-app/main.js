document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-rss");
  const input = document.getElementById("input-rss");
  const feedContainer = document.getElementById("feed-container");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = input.value;
    if (!url) return;

    feedContainer.innerHTML = ""; // Limpa o container de feeds

    const parser = new RSSParser({
      customFields: {
        item: [["dc:creator", "creator"]],
      },
    });

    const feedUrl = `http://localhost:8080/${url}`;

    try {
      const feed = await parser.parseURL(feedUrl);

      feed.items.forEach((item) => {
        const feedItem = document.createElement("div");
        feedItem.className = "feed-item";

        const title = document.createElement("h2");
        title.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;

        const pubDate = document.createElement("p");
        pubDate.textContent = item.pubDate;

        const content = document.createElement("p");
        content.innerHTML = item.contentSnippet;

        feedItem.appendChild(title);
        feedItem.appendChild(pubDate);
        feedItem.appendChild(content);
        feedContainer.appendChild(feedItem);
      });
    } catch (error) {
      console.error("Erro ao processar o feed:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "Erro ao buscar o feed. Por favor, tente novamente.";
      feedContainer.appendChild(errorMessage);
    }
  });
});
