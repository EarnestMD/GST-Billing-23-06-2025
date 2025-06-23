package com.groceryList.service;

import java.util.Collection;

public interface IService<T> {
	Collection<T> findAll();
	
	T findById(Long id);
	
	T saveOrUpdate(T t);
	
	String deleteById(Long id);

	Collection<T> findAll(String searchText);
}
