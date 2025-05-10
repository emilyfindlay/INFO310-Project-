package zero.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Business;
import zero.domain.Client;
import zero.domain.Invoice;
import zero.dto.InvoiceDTO;
import zero.repository.BusinessRepository;
import zero.repository.ClientRepository;
import zero.repository.InvoiceRepository;
import zero.helpers.GenerateInvoice;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        return invoiceRepository.findByDeletedFalse();
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
        Optional<Invoice> optionalInvoice = invoiceRepository.findById(id);
        if (optionalInvoice.isPresent()) {
            Invoice invoice = optionalInvoice.get();
            invoice.setDeleted(true);
            invoiceRepository.save(invoice);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


    // New endpoint to generate and download the PDF for a specific invoice
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generateInvoicePDF(@PathVariable Long id) {
        System.out.println("Generating PDF for invoice ID: " + id);
        return invoiceRepository.findById(id)
                .map(invoice -> {
                    byte[] pdfContent = GenerateInvoice.generateInvoice(invoice);
                    return ResponseEntity.ok()
                            .header("Content-Type", "application/pdf")
                            .header("Content-Disposition", "inline; filename=invoice.pdf")
                            .body(pdfContent);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
