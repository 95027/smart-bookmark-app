
export type Bookmark = {
  id?: string;
  title: string;
  url: string;
  description?: string;
};

export type PaginationType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};