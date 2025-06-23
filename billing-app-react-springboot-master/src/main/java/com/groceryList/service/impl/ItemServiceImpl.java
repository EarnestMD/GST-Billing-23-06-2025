package com.groceryList.service.impl;

import java.util.Collection;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groceryList.GroceryList.Item;
import com.groceryList.repository.GroceryListRepository;
import com.groceryList.service.IService;

@Service
public class ItemServiceImpl implements IService<Item> {
		
		@Autowired
		private GroceryListRepository groceryListRepository;

		@Override
		public Collection<Item> findAll() {
			return groceryListRepository.findAll();
		}

		@Override
		public Item saveOrUpdate(Item item) {
			return groceryListRepository.saveAndFlush(item);
		}

		@Override
		public Item findById(Long id) {
			return groceryListRepository.findById(id).get();
		}

		@Override
		public String deleteById(Long id) {
			JSONObject jsonObject = new JSONObject();
			try {
				groceryListRepository.deleteById(id);
				jsonObject.put("message", "Item deleted successfully");
			} catch (JSONException e) {
				e.printStackTrace();
			}
			return jsonObject.toString();
		}

		@Override
		public Collection<Item> findAll(String searchText) {
			return groceryListRepository.findAllItems(searchText);
		}
	}
