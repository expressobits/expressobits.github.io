document.addEventListener("DOMContentLoaded", async function() {
    const yearElement = document.getElementById("current-year");
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;

    function setupCarousel(carouselId, innerId, prevId, nextId) {
      const carousel = document.getElementById(carouselId);
      const inner = document.getElementById(innerId);
      const prev = document.getElementById(prevId);
      const next = document.getElementById(nextId);

      if (!carousel || !inner || !prev || !next) {
        console.warn(`Elementos do carrossel ${carouselId} não encontrados.`);
        return;
      }

      let leftValue = 0;

      // Pega a largura de um item do carrossel
      const cardWidth = inner.querySelector("article").getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(inner).getPropertyValue("gap") || 0);
      const totalMovementSize = cardWidth + gap;

      prev.addEventListener("click", () => {
        if (leftValue < 0) {
          leftValue += totalMovementSize;
          inner.style.transform = `translateX(${leftValue}px)`;
        }
      });

      next.addEventListener("click", () => {
        const viewportWidth = carousel.getBoundingClientRect().width;
        const innerWidth = inner.scrollWidth;

        if (innerWidth + leftValue > viewportWidth) {
          leftValue -= totalMovementSize;
          inner.style.transform = `translateX(${leftValue}px)`;
        }
      });
    }
    
    setupCarousel("cCarousel-games", "cCarousel-games-inner", "prevGames", "nextGames");
    setupCarousel("cCarousel-features", "cCarousel-features-inner", "prevFeatures", "nextFeatures");
  });