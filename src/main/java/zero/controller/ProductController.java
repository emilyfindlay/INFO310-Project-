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
import java.util.Optional;

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
//
//    // Add new product
//    @PostMapping
//    public Product createProduct(@RequestBody Product product) {
//        System.out.println("Creating new product: " + product);
//        return productRepository.save(product);
//    }
//
//     // Read a product by ID
//    @GetMapping("/{id}")
//    public Product getProductById(@PathVariable Integer id) {
//        Optional<Product> product = productRepository.findById(id);
//        return product.orElse(null);
//    }
//
//    // Update a product
//    @PutMapping("/{id}")
//    public Product updateProduct(@PathVariable Integer id, @RequestBody Product product) {
//        if (productRepository.existsById(id)) {
//            product.setProductId(id);
//            return productRepository.save(product);
//        }
//        return null;
//    }
//
//    // Delete a product
//    @DeleteMapping("/{id}")
//    public void deleteProduct(@PathVariable Integer id) {
//        if (productRepository.existsById(id)) {
//            productRepository.deleteById(id);
//        }
//    }
}
