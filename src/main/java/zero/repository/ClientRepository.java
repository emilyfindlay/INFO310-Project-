package zero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zero.domain.Client;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    // Optional: Add custom queries like:
//    Client findByEmail(String email);
    //List<Client> findByNameContainingIgnoreCase(String name);
}
