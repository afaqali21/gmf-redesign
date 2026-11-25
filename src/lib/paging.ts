// Listing pagination, shared by the blog views and src/proxy.ts.
export const PER_PAGE = 9;
export const pageCount = (n: number) => Math.max(1, Math.ceil(n / PER_PAGE));
