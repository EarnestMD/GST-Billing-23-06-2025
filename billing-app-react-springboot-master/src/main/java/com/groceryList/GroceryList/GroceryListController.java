package com.groceryList.GroceryList;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.groceryList.resource.Resource;
import com.groceryList.service.IService;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "http://localhost:3000")
public class GroceryListController implements Resource<Item>{
	
	@Autowired
    private IService<Item> itemService;

	@Override
	public ResponseEntity<Item> findById(Long id) {
		return new ResponseEntity<>(itemService.findById(id), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Item> save(Item item) {
		return new ResponseEntity<>(itemService.saveOrUpdate(item), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Item> update(Item item) {
		return new ResponseEntity<>(itemService.saveOrUpdate(item), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(itemService.deleteById(id), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Collection<Item>> findAll() {
		return new ResponseEntity<>(itemService.findAll(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Collection<Item>> findAll(String searchText) {
		return new ResponseEntity<>(itemService.findAll(searchText),HttpStatus.OK);
	}
}
