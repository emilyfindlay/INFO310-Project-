package zero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zero.domain.InvoiceItem;
import zero.domain.InvoiceItemPK;

import java.util.List;

@Repository
public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, InvoiceItemPK> {

    // Query to find InvoiceItems by Invoice's ID
    List<InvoiceItem> findByInvoice_InvoiceId(Integer invoiceId);
}
