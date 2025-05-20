package zero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.*;
import zero.dto.InvoiceItemDTO;
import zero.repository.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/invoice-items")
public class InvoiceItemController {

    private final InvoiceItemRepository invoiceItemRepository;
    private final InvoiceRepository invoiceRepository;
    private final ProductRepository productRepository;

    public InvoiceItemController(
            InvoiceItemRepository invoiceItemRepository,
            InvoiceRepository invoiceRepository,
            ProductRepository productRepository) {
        this.invoiceItemRepository = invoiceItemRepository;
        this.invoiceRepository = invoiceRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<InvoiceItem> getAllInvoiceItems() {
        return invoiceItemRepository.findAll();
    }

    @PostMapping
public ResponseEntity<List<InvoiceItem>> createInvoiceItems(@RequestBody List<InvoiceItemDTO> dtos) {
    List<InvoiceItem> items = dtos.stream().map(dto -> {
        Invoice invoice = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID " + dto.getInvoiceId()));
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with ID " + dto.getProductId()));

        InvoiceItem item = new InvoiceItem();
        item.setInvoice(invoice);
        item.setProduct(product);
        item.setId(new InvoiceItemPK(invoice.getInvoiceId(), product.getProductId()));
        item.setQuantity(dto.getQuantity());       // ✅ set updated quantity
        item.setUnitPrice(dto.getUnitPrice());
        item.setDiscount(dto.getDiscount());       // ✅ set updated discount
        return item;
    }).toList();

    List<InvoiceItem> savedItems = invoiceItemRepository.saveAll(items);

    // (Optional) Recalculate totals
    Invoice invoice = savedItems.get(0).getInvoice();
    invoice.setInvoiceItems(savedItems);
    invoice.setTotalGst(invoice.getTotalGst());
    invoice.setInvoiceTotal(invoice.getInvoiceTotal());
    invoiceRepository.save(invoice);

    return ResponseEntity.ok(savedItems);
}


    @GetMapping("/invoice/{invoiceId}")
    public List<InvoiceItem> getItemsByInvoice(@PathVariable Long invoiceId) {
        return invoiceItemRepository.findById_InvoiceId(invoiceId);
    }
    
    @DeleteMapping("/invoice/{invoiceId}")
    public ResponseEntity<Void> deleteByInvoice(@PathVariable Long invoiceId) {
    Invoice invoice = invoiceRepository.findById(invoiceId)
            .orElseThrow(() -> new RuntimeException("Invoice not found"));
    invoiceItemRepository.deleteById_InvoiceId(invoiceId);
    return ResponseEntity.noContent().build();
    }

}
