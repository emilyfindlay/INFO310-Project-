package zero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.InvoiceItem;
import zero.repository.InvoiceItemRepository;

import java.util.List;

@RestController
@RequestMapping("/api/invoice-items")
public class InvoiceItemController {

    private final InvoiceItemRepository invoiceItemRepository;

    public InvoiceItemController(InvoiceItemRepository invoiceItemRepository) {
        this.invoiceItemRepository = invoiceItemRepository;
    }

    @GetMapping
    public List<InvoiceItem> getAllInvoiceItems() {
        return invoiceItemRepository.findAll();
    }

    // Endpoint to save multiple invoice items
    @PostMapping
    public ResponseEntity<List<InvoiceItem>> createInvoiceItems(@RequestBody List<InvoiceItem> invoiceItems) {
        // Save all invoice items to the database
        List<InvoiceItem> savedItems = invoiceItemRepository.saveAll(invoiceItems);
        return ResponseEntity.ok(savedItems);  // Return the saved items
    }

    // Optional: Get items by invoice ID
    @GetMapping("/invoice/{invoiceId}")
    public List<InvoiceItem> getItemsByInvoice(@PathVariable Integer invoiceId) {
        return invoiceItemRepository.findByInvoice_InvoiceId(invoiceId);
    }
}
