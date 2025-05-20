package zero.controller;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Business;
import zero.domain.Client;
import zero.domain.Invoice;
import zero.domain.InvoiceItem;
import zero.domain.InvoiceItemPK;
import zero.dto.InvoiceDTO;
import zero.repository.BusinessRepository;
import zero.repository.ClientRepository;
import zero.repository.InvoiceItemRepository;
import zero.repository.ProductRepository;
import zero.repository.InvoiceRepository;
import zero.helpers.GenerateInvoice;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import zero.domain.Product;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;
    private final BusinessRepository businessRepository;
    private final InvoiceItemRepository invoiceItemRepository;
    private final ProductRepository productRepository;

    public InvoiceController(InvoiceRepository invoiceRepository, ClientRepository clientRepository, BusinessRepository businessRepository, InvoiceItemRepository invoiceItemRepository, ProductRepository productRepository) {
        this.invoiceRepository = invoiceRepository;
        this.clientRepository = clientRepository;
        this.businessRepository = businessRepository;
        this.invoiceItemRepository = invoiceItemRepository;
        this.productRepository = productRepository;
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

    @Transactional
@PutMapping("/{id}")
public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody InvoiceDTO dto) {
    Optional<Invoice> optionalInvoice = invoiceRepository.findById(id);
    if (optionalInvoice.isEmpty()) return ResponseEntity.notFound().build();

    Invoice existingInvoice = optionalInvoice.get();

    Client client = clientRepository.findById(dto.clientId)
            .orElseThrow(() -> new RuntimeException("Client not found"));
    Business business = businessRepository.findById(dto.businessId)
            .orElseThrow(() -> new RuntimeException("Business not found"));

    existingInvoice.setClient(client);
    existingInvoice.setBusiness(business);
    existingInvoice.setIssuedDate(dto.issuedDate);
    existingInvoice.setDueDate(dto.dueDate);
    existingInvoice.setStatus(dto.status);

    // ✅ Remove old items via orphanRemoval
    existingInvoice.getInvoiceItems().clear();

    // ✅ Rebuild new items
    List<InvoiceItem> newItems = dto.invoiceItems.stream().map(itemDto -> {
        Product product = productRepository.findById(itemDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        InvoiceItem item = new InvoiceItem();
        item.setId(new InvoiceItemPK(existingInvoice.getInvoiceId(), product.getProductId()));
        item.setInvoice(existingInvoice);
        item.setProduct(product);
        item.setQuantity(itemDto.getQuantity());
        item.setUnitPrice(itemDto.getUnitPrice());
        item.setDiscount(itemDto.getDiscount());
        return item;
    }).toList();

    existingInvoice.getInvoiceItems().addAll(newItems);
    existingInvoice.setTotalGst(existingInvoice.getTotalGst());
    existingInvoice.setInvoiceTotal(existingInvoice.getInvoiceTotal());

    Invoice saved = invoiceRepository.save(existingInvoice);
    return ResponseEntity.ok(saved);
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
