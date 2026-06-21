/**
 * Async pool: runs up to `limit` concurrent async operations at once.
 * @param {number} limit - Max concurrent operations
 * @param {Array} items  - Items to process
 * @param {Function} iteratorFn - Async function called for each item
 */
export async function asyncPool(limit, items, iteratorFn) {
    const ret = [];
    const executing = [];

    for (const item of items) {
        const p = Promise.resolve().then(() => iteratorFn(item));
        ret.push(p);

        if (limit <= items.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);

            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
    }

    return Promise.all(ret);
}
