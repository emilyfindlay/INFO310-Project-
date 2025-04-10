package zero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Address;
import zero.repository.AddressRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressRepository addressRepo;

    // Get all addresses
    @GetMapping
    public List<Address> getAllAddresses() {
        return addressRepo.findAll();
    }

    // Get address by ID
    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long id) {
        return addressRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new address
    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        System.out.println("Creating new address: " + address);
        return addressRepo.save(address);
    }

    // Update an existing address
    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address updatedAddress) {
        return addressRepo.findById(id).map(address -> {
            address.setStreetAddress1(updatedAddress.getStreetAddress1());
            address.setStreetAddress2(updatedAddress.getStreetAddress2());
            address.setCity(updatedAddress.getCity());
            address.setRegion(updatedAddress.getRegion());
            address.setPostCode(updatedAddress.getPostCode());
            address.setCountry(updatedAddress.getCountry());
            return ResponseEntity.ok(addressRepo.save(address));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete an address
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        if (addressRepo.existsById(id)) {
            addressRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
