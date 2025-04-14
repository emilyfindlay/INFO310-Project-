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
        System.out.println("Received DTOs: " + dtos);
        System.out.println("dto info: " + dtos.get(0).getInvoiceId() + " " + dtos.get(0).getProductId() + " " + dtos.get(0).getQuantity() + " " + dtos.get(0).getUnitPrice() + " " + dtos.get(0).getDiscount());

        List<InvoiceItem> items = dtos.stream().map(dto -> {
            Invoice invoice = invoiceRepository.findById(dto.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found with ID " + dto.getInvoiceId()));
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID " + dto.getProductId()));

            InvoiceItem item = new InvoiceItem();
            item.setInvoice(invoice);
            item.setProduct(product);
            item.setId(new InvoiceItemPK(invoice, product));
            item.setQuantity(dto.getQuantity());
            item.setUnitPrice(dto.getUnitPrice());
            item.setDiscount(dto.getDiscount());
            return item;
        }).collect(Collectors.toList());

        List<InvoiceItem> savedItems = invoiceItemRepository.saveAll(items);
        return ResponseEntity.ok(savedItems);
    }

    @GetMapping("/invoice/{invoiceId}")
    public List<InvoiceItem> getItemsByInvoice(@PathVariable Long invoiceId) {
        return invoiceItemRepository.findById_Invoice_InvoiceId(invoiceId);
    }
}
