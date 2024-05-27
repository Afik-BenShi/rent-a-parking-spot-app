/**
 * @template {(...args:any[]) => any} F
 * @param {number} countLimit
 * @param {number} intervalMs
 * @param {F} fn 
 * @param {(waitTime:number) => any} responseWhenLimited
 * limit a request to countLimit/intervalMs
 */
function createRateLimit(countLimit, intervalMs, fn, responseWhenLimited) {
    let lastExecution = 0;
    let count = 0;
    return async (...args) => {
        const now = Date.now();
        if (now - lastExecution < intervalMs) {
            if (count >= countLimit) {
                const waitTime = intervalMs - (now - lastExecution);
                return Promise.reject(responseWhenLimited(waitTime));
            }
        } else {
            count = 0;
        }

        count++;
        lastExecution = now;
        return await fn(...args).catch(err => ({status:500, err}));
    };
}

module.exports = createRateLimit;

