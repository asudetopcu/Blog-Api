export type Pagination = { page: number; limit: number; skip: number };

export function parsePagination(pageRaw?: unknown, limitRaw?: unknown): Pagination {
  const page = Math.max(1, Number(pageRaw ?? 1) || 1);
  const limit = Math.min(100, Math.max(1, Number(limitRaw ?? 10) || 10));
  return { page, limit, skip: (page - 1) * limit };
}
