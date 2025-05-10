package zero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Business;
import zero.domain.Client;
import zero.repository.ClientRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class ClientController {

    @Autowired
    private ClientRepository clientRepo;

    @GetMapping
    public List<Client> getAllClients() {
        return clientRepo.findByDeletedFalse();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        return clientRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientRepo.save(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        return clientRepo.findById(id).map(client -> {
            client.setName(updatedClient.getName());
            client.setEmail(updatedClient.getEmail());
            client.setPhone(updatedClient.getPhone());
            client.setAddress(updatedClient.getAddress());

            return ResponseEntity.ok(clientRepo.save(client));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        Optional<Client> optionalClient = clientRepo.findById(id);
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            client.setDeleted(true);
            clientRepo.save(client);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
