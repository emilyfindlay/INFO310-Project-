/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import domain.Address;
import repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    // Read all addresses
    @GetMapping
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    // Add new address
    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        return addressRepository.save(address);
    }

    // Read an address by ID
    @GetMapping("/{id}")
    public Address getAddressById(@PathVariable Integer id) {
        Optional<Address> address = addressRepository.findById(id);
        return address.orElse(null); 
    }

    // Update an address
    @PutMapping("/{id}")
    public Address updateAddress(@PathVariable Integer id, @RequestBody Address address) {
        if (addressRepository.existsById(id)) {
            address.setAddressId(id);
            return addressRepository.save(address);
        }
        return null; 
    }

    // Delete an address
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Integer id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
        }
    }
}
