package zero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.*;
import zero.dto.InvoiceItemDTO;
import zero.repository.*;
import jakarta.transaction.Transactional;

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
    
    @Transactional
    @PostMapping
    public ResponseEntity<List<InvoiceItem>> createInvoiceItems(@RequestBody List<InvoiceItemDTO> dtos) {
        // Retrieve and associate the parent Invoice
        if (dtos.isEmpty()) {
            throw new RuntimeException("No InvoiceItems to process");
        }

        Long invoiceId = dtos.get(0).getInvoiceId();
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID " + invoiceId));

        // Synchronize invoiceItems collection
        // Clear existing relationships (important for Hibernate)
        List<InvoiceItem> existingItems = invoice.getInvoiceItems();
        if (existingItems != null) {
            existingItems.clear();
        }

        // Map DTOs to InvoiceItems
        List<InvoiceItem> invoiceItems = dtos.stream().map(dto -> {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID " + dto.getProductId()));

            InvoiceItem item = new InvoiceItem();
            item.setId(new InvoiceItemPK(invoice.getInvoiceId(), product.getProductId()));
            item.setInvoice(invoice);  // Set parent reference
            item.setProduct(product);  // Set associated product
            item.setQuantity(dto.getQuantity());
            item.setUnitPrice(dto.getUnitPrice());
            item.setDiscount(dto.getDiscount());
            return item;
        }).toList();

        invoiceItemRepository.saveAll(invoiceItems);


        return ResponseEntity.ok(invoiceItems);
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
