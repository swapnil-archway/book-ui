import  { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axios';
import {  BookResponse, ListMeta } from '../models/book';

export const getBooks = async (meta: ListMeta): Promise<BookResponse> => {
  try {
    const response: AxiosResponse<BookResponse> = await axiosInstance.get('/books', {
      params: {... meta },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
