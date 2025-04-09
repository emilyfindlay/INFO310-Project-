package zero.controller;

import org.springframework.web.bind.annotation.*;
import zero.domain.Invoice;
import zero.domain.InvoiceItem;
import zero.repository.InvoiceItemRepository;

import java.util.List;

@RestController
@RequestMapping("/invoice-items")
public class InvoiceItemController {

    private final InvoiceItemRepository invoiceItemRepository;

    public InvoiceItemController(InvoiceItemRepository invoiceItemRepository) {
        this.invoiceItemRepository = invoiceItemRepository;
    }

    @GetMapping
    public List<InvoiceItem> getAllInvoiceItems() {
        return invoiceItemRepository.findAll();
    }

//    @GetMapping("/invoice/{invoiceId}")
//    public List<InvoiceItem> getItemsByInvoice(@PathVariable Integer invoiceId) {
//        return invoiceItemRepository.findByIdInvoice_InvoiceId(invoiceId);
//    }
//
//    @PostMapping
//    public InvoiceItem addItem(@RequestBody InvoiceItem item) {
//        return invoiceItemRepository.save(item);
//    }
}
