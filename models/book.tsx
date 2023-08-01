export interface Book {
  id: number;
  title: string;
  description: string;
  discountRate: number;
  coverImg: string;
  price: number;
}

export interface BookList {
  books: Book[];
  currentPage: number;
  limit?: number;
}

export interface ListMeta {
  page: number;
  limit: number;
  total?: number;
}

export interface BookResponse extends ListMeta {
  data: Book[];
  lastPage: number;
}
