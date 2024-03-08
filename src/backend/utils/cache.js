function serialize(args) {
    const jsonString = JSON.stringify(args);
    return btoa(jsonString);
}
/**
 * @template {(...args: any[]) => Promise<any>} F
 * @param {F} fn
 * @param {number} cacheIntervalSec
 * @returns
 */
function createCache(fn, cacheIntervalSec) {
    const cache = {};
    const cacheIntervalMs = 1000 * cacheIntervalSec;

    const addToCache = async (key, value) => {
        const time = Date.now();
        cache[key] = { time, value };
    };

    const executeWithCache = async (...args) => {
        let key;
        try {
            key = serialize(args);
        } catch {
            console.error("[execute with cache] could not serialize", ...args);
            return await fn(...args);
        }
        if (key in cache) {
            const { time, value } = cache[key];
            if (Date.now() - time < cacheIntervalMs) {
                return value;
            }
        }
        let value;
        try {
            value = await fn(...args);
            addToCache(key, value);
        } catch (err) {
            value = err;
        }
        return value;
    };

    const clearCache = () => {
        const now = Date.now();
        Object.entries(cache).forEach(([key, { time }]) => {
            if (now - time >= cacheIntervalMs) {
                delete cache[key];
            }
        });
    };

    setInterval(clearCache, 5 * cacheIntervalMs);

    return executeWithCache;
}

module.exports = createCache;
