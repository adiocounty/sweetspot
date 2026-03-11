(() => {
  const header = document.querySelector("[data-header]");

  if (!header) {
    return;
  }

  const toggle = header.querySelector("[data-menu-toggle]");
  const panel = header.querySelector("[data-menu-panel]");
  const isMobile = () => window.matchMedia("(max-width: 990px)").matches;

  if (header.dataset.sticky === "true") {
    const onScroll = () => {
      header.classList.toggle("is-sticky", window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (!toggle || !panel) {
    return;
  }

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    panel.classList.add("is-open");
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    if (expanded) {
      closeMenu();
      return;
    }

    openMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!isMobile()) {
      return;
    }

    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

(() => {
  const formatPrice = (priceInCents, currencyCode) => {
    const locale = document.documentElement.lang || "en-US";

    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode
      }).format(priceInCents / 100);
    } catch (error) {
      return (priceInCents / 100).toFixed(2);
    }
  };

  document.querySelectorAll("[data-product-root]").forEach((root) => {
    const select = root.querySelector("[data-variant-select]");
    const hiddenVariantInput = root.querySelector("[data-variant-id]");
    const priceElement = root.querySelector("[data-product-price]");
    const statusElement = root.querySelector("[data-availability]");
    const submitButton = root.querySelector("[data-add-to-cart]");
    const variantsElement = root.querySelector("[data-variants-json]");
    const addText = submitButton ? submitButton.dataset.addText : "Add to cart";
    const soldOutText = submitButton ? submitButton.dataset.soldOutText : "Sold out";

    if (!variantsElement) {
      return;
    }

    let variants = [];

    try {
      variants = JSON.parse(variantsElement.textContent);
    } catch (error) {
      return;
    }

    const findVariant = () => {
      if (select) {
        return variants.find((variant) => String(variant.id) === String(select.value));
      }

      if (hiddenVariantInput) {
        return variants.find((variant) => String(variant.id) === String(hiddenVariantInput.value));
      }

      return variants[0];
    };

    const updateFormState = () => {
      const variant = findVariant();

      if (!variant) {
        return;
      }

      if (hiddenVariantInput) {
        hiddenVariantInput.value = variant.id;
      }

      if (priceElement) {
        priceElement.textContent = formatPrice(variant.price, root.dataset.currency || "USD");
      }

      if (statusElement) {
        statusElement.textContent = variant.available ? statusElement.dataset.inStock : statusElement.dataset.outOfStock;
      }

      if (submitButton) {
        submitButton.disabled = !variant.available;
        submitButton.textContent = variant.available ? addText : soldOutText;
      }
    };

    if (select) {
      select.addEventListener("change", updateFormState);
    }

    updateFormState();

    const mainImage = root.querySelector("[data-main-product-image]");

    root.querySelectorAll("[data-thumb-image]").forEach((thumbButton) => {
      thumbButton.addEventListener("click", () => {
        if (!mainImage) {
          return;
        }

        mainImage.src = thumbButton.dataset.src;
        if (thumbButton.dataset.srcset) {
          mainImage.srcset = thumbButton.dataset.srcset;
        }
        mainImage.alt = thumbButton.dataset.alt || mainImage.alt;
      });
    });
  });
})();
