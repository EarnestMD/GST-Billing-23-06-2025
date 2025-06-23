package com.groceryList.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.groceryList.GroceryList.Item;

@Repository
public interface GroceryListRepository extends JpaRepository<Item, Long>{
	
	@Query("From Item i WHERE i.product_code=:searchText OR i.product_name=:searchText")
	Collection<Item> findAllItems(@Param("searchText") String searchText);
}