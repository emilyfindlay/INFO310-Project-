package zero.controller;

import org.springframework.http.ResponseEntity;
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

    //Add multiple products at once
    @PostMapping
    public ResponseEntity<?> createProducts(@RequestBody List<Product> products) {
        try {
            products.forEach(p -> System.out.println("→ Product received: " + p));
            System.out.println(">>> Received products: " + products);
            List<Product> savedProducts = productRepository.saveAll(products);
            return ResponseEntity.ok(savedProducts);
        } catch (Exception e) {
            e.printStackTrace(); // print full error
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // Read a product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    // Update a product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setProductType(updatedProduct.getProductType());
                    existingProduct.setProductName(updatedProduct.getProductName());
                    existingProduct.setProductDescription(updatedProduct.getProductDescription());
                    existingProduct.setProductPrice(updatedProduct.getProductPrice());
                    Product savedProduct = productRepository.save(existingProduct);
                    return ResponseEntity.ok(savedProduct);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        }
    }
}
