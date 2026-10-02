/* ==========================================
   KUBATA
   LOCAL STORAGE
========================================== */

const STORAGE_KEY = "kubata-favorites";


/* ==========================================
   GET FAVORITES
========================================== */

export function getFavorites() {

    const stored =
        localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        return [];
    }

    try {

        return JSON.parse(stored);

    } catch (error) {

        console.error(
            "Unable to read favorites:",
            error
        );

        return [];

    }

}


/* ==========================================
   SAVE FAVORITES
========================================== */

export function saveFavorites(favorites) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
    );

}


/* ==========================================
   CHECK FAVORITE
========================================== */

export function isFavorite(id) {

    return getFavorites().includes(id);

}


/* ==========================================
   TOGGLE FAVORITE
========================================== */

export function toggleFavorite(id) {

    const favorites =
        getFavorites();

    const index =
        favorites.indexOf(id);

    if (index === -1) {

        favorites.push(id);

    } else {

        favorites.splice(index, 1);

    }

    saveFavorites(favorites);

    return favorites;

}