package zero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zero.domain.QuoteItem;
import zero.domain.QuoteItemPK;

import java.util.List;

@Repository
public interface QuoteItemRepository extends JpaRepository<QuoteItem, QuoteItemPK> {
    List<QuoteItem> findById_QuoteId(Long quoteId);

void deleteById_QuoteId(Long quoteId);
}
