/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import domain.Business;
import repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/businesses")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class BusinessController {

    @Autowired
    private BusinessRepository businessRepository;

    // Read all products
    @GetMapping
    public List<Business> getAllBusiness() {
        return businessRepository.findAll();
    }

    // Add new product
    @PostMapping
    public Business createProduct(@RequestBody Business product) {
        return businessRepository.save(product);
    }

    // Read a product by ID
    @GetMapping("/{id}")
    public Business getProductById(@PathVariable Integer id) {
        Optional<Business> product = businessRepository.findById(id);
        return product.orElse(null); 
    }

    // Update a product
    @PutMapping("/{id}")
    public Business updateProduct(@PathVariable Integer id, @RequestBody Business business) {
        if (businessRepository.existsById(id)) {
            business.setBusinessId(id);
            return businessRepository.save(business);
        }
        return null; 
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        if (businessRepository.existsById(id)) {
            businessRepository.deleteById(id);
        }
    }
}
