package zero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Business;
import zero.domain.Client;
import zero.domain.Invoice;
import zero.dto.InvoiceDTO;
import zero.repository.BusinessRepository;
import zero.repository.ClientRepository;
import zero.repository.InvoiceRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;
    private final BusinessRepository businessRepository;

    public InvoiceController(InvoiceRepository invoiceRepository,
                             ClientRepository clientRepository,
                             BusinessRepository businessRepository) {
        this.invoiceRepository = invoiceRepository;
        this.clientRepository = clientRepository;
        this.businessRepository = businessRepository;
    }

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoice(@PathVariable Long id) {
        return invoiceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        System.out.println("Received invoice DTO: " + invoiceDTO);
        Client client = clientRepository.findById(invoiceDTO.clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not found"));

        Business business = businessRepository.findById(invoiceDTO.businessId)
                .orElseThrow(() -> new IllegalArgumentException("Business not found"));

        // Create invoice with no items and zero total initially
        Invoice invoice = new Invoice(
                client,
                business,
                new ArrayList<>(), // empty invoice items
                invoiceDTO.issuedDate,
                invoiceDTO.dueDate,
                invoiceDTO.status,
                BigDecimal.ZERO,
                BigDecimal.ZERO
        );

        Invoice saved = invoiceRepository.save(invoice);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice updatedInvoice) {
        return invoiceRepository.findById(id)
                .map(existing -> {
                    updatedInvoice.setInvoiceItems(existing.getInvoiceItems()); // Keep existing items
                    Invoice saved = invoiceRepository.save(updatedInvoice);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        if (!invoiceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        invoiceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
