package zero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zero.domain.InvoiceItem;
import zero.domain.InvoiceItemPK;

import java.util.List;

@Repository
public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, InvoiceItemPK> {
    List<InvoiceItem> findById_Invoice_InvoiceId(Long invoiceId);

}
