package zero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zero.domain.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
