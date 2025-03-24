import { v4 as uuidv4 } from 'uuid';

export const addItem = (item) => ({
  type: 'ADD_ITEM',
  payload: { ...item, id: uuidv4() }
});

export const updateItem = (item) => ({
  type: 'UPDATE_ITEM',
  payload: item
});

export const deleteItem = (id) => ({
  type: 'DELETE_ITEM',
  payload: id
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error
});