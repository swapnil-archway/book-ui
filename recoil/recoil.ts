import { atom } from 'recoil';
import { BookList } from '../models/book';
  
export const bookState = atom<BookList>({
  key: 'bookState',
  default: { books: [], currentPage: 1 ,limit:10},
});


