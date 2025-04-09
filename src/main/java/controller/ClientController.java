/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import domain.Client;
import repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    // Read all clients
    @GetMapping
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // Add new client
    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientRepository.save(client);
    }

    // Read a client by ID
    @GetMapping("/{id}")
    public Client getClientById(@PathVariable Integer id) {
        Optional<Client> client = clientRepository.findById(id);
        return client.orElse(null); 
    }

    // Update a client
    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Integer id, @RequestBody Client client) {
        if (clientRepository.existsById(id)) {
            client.setClientId(id);
            return clientRepository.save(client);
        }
        return null; 
    }

    // Delete a client
    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Integer id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
        }
    }
}
