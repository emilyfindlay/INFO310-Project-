package zero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Invoice;
import zero.repository.InvoiceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceRepository invoiceRepository;

    public InvoiceController(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Invoice> getInvoice(@PathVariable Long id) {
//        return invoiceRepository.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public Invoice createInvoice(@RequestBody Invoice invoice) {
//        return invoiceRepository.save(invoice);
//    }
}
