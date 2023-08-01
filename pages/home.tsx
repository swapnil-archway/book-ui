import React, { useEffect, useRef, useState } from 'react';
import BookCard from '@/components/bookCard';
import { useRecoilState } from 'recoil';
import { bookState } from '@/recoil/recoil';
import { getBooks } from '@/api/api';
import { Book, BookList, BookResponse, ListMeta } from '@/models/book';
import { Loader } from '@/components/loader';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage = () => {
  const [bookData, setBookData] = useRecoilState<BookList>(bookState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');
  const pageSize = 10;

  const fetchBooks = async (page: number): Promise<BookResponse> => {
    try {
      const meta: ListMeta = { page, limit: 10 };
      const bookResponse: BookResponse = await getBooks(meta);
      setErrMessage('');

      return bookResponse;
    } catch (error) {
      setErrMessage('Something went wrong.');
      throw error;
    }
  };

  const loadBooksData = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const bookResponse = await fetchBooks(page);
      setBookData((prevData: BookList) => ({
        ...prevData,
        books: prevData ? prevData.books.concat(bookResponse.data) : bookResponse.data,
        currentPage: page,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooksData();
    return () => {};
  }, []);

  useEffect(() => {
    if (errMessage) {
      setTimeout(() => {
        setErrMessage('');
      }, 3000);
    }

    return () => {};
  }, [errMessage]);


  return (
    <div className="h-screen flex flex-col">
      <div className="m-4 text-xl text-center font-bold">Books</div>
      {/* <div className="flex-grow overflow-y-auto" ref={listRef}> */}
        <InfiniteScroll
          dataLength={bookData?.books?.length || 10}
          next={() => loadBooksData((bookData?.currentPage || 1) + 1)}
          hasMore={(bookData?.books?.length ?? 0) < (bookData?.currentPage || 1) * pageSize}
          loader={isLoading && <Loader />}
          endMessage={<h4>No more books to load.</h4>}
          refreshFunction={() => loadBooksData(1)}
          pullDownToRefresh
          pullDownToRefreshThreshold={200}
          pullDownToRefreshContent={
            <Loader />
          }
        >
          {bookData && bookData.books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {bookData &&
                bookData.books?.map((book: Book) => {
                  return <BookCard key={book.id} book={book} />;
                })}
            </div>
          ) : (
            <div className="text-center">No book found</div>
          )}
        </InfiniteScroll>
      {/* </div> */}

      {errMessage && (
        <div className="fixed bottom-4 right-8 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">
          <p className="text-sm">{errMessage}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
