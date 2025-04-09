package zero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zero.domain.Business;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
}
