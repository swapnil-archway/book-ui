import React, { useEffect, useRef, useState } from 'react';
import BookCard from '@/components/bookCard';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useRecoilState } from 'recoil';
import { bookState } from '@/recoil/recoil';
import { getBooks } from '@/api/api';
import { Book, BookResponse, ListMeta } from '@/models/book';
import { Loader } from '@/components/loader';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [bookData, setBookData] = useRecoilState(bookState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 10;

  useEffect(() => {
    fetchBooks();
    return () => {
      // Clean up when the component is unmounted
    };
  }, []);

  const fetchBooks = async (page = 1) => {
    try {
      setIsLoading(true);
      const meta: ListMeta = { page, limit: 10 };
      const { data }: BookResponse = await getBooks(meta);

      setBookData((prevData) => ({
        ...prevData,
        books: prevData ? prevData.books.concat(data) : data,
        currentPage: page,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const isRefreshing: Boolean = usePullToRefresh(listRef);

  return (
    <div className="h-screen flex flex-col">
      <InfiniteScroll
        dataLength={bookData?.books?.length || 0}
        next={() => fetchBooks((bookData?.currentPage || 1) + 1)}
        hasMore={(bookData?.books?.length ?? 0) < (bookData?.currentPage || 1) * pageSize}
        loader={isLoading && <Loader />}
        endMessage={<h4>No more books to load.</h4>}>
        <div className="m-4 text-xl text-center font-bold">Books</div>
        {isRefreshing && <div className="m-4 text-lg">Refreshing...</div>}
        {bookData && bookData.books.length > 0 ? (
          <div className="flex-grow overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1" ref={listRef}>
            {bookData &&
              bookData.books?.map((book: Book, index) => {
                return <BookCard key={index} book={book} />;
              })}
          </div>
        ) : (
          <div className="text-center">No book found</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
