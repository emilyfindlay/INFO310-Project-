/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package zero.controller;

import zero.domain.Product;
import zero.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Read all products
    @GetMapping
    public List<Product> getAllProducts() {
        System.out.println("Fetching all products");
        return productRepository.findAll();
    }

    // Add new product
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        System.out.println("Creating new product: " + product);
        return productRepository.save(product);
    }
}
