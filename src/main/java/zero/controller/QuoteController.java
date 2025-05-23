package zero.controller;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.*;
import zero.dto.QuoteDTO;
import zero.helpers.GenerateQuote;
import zero.repository.BusinessRepository;
import zero.repository.ClientRepository;
import zero.repository.QuoteRepository;
import zero.repository.QuoteItemRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import zero.repository.ProductRepository;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    private final QuoteRepository quoteRepository;
    private final ClientRepository clientRepository;
    private final BusinessRepository businessRepository;
    private final QuoteItemRepository quoteItemRepository;
    private final ProductRepository productRepository;

    public QuoteController(QuoteRepository quoteRepository,
                           ClientRepository clientRepository,
                           BusinessRepository businessRepository,
                           QuoteItemRepository quoteItemRepository,
                           ProductRepository productRepository) {
        this.quoteRepository = quoteRepository;
        this.clientRepository = clientRepository;
        this.businessRepository = businessRepository;
        this.quoteItemRepository = quoteItemRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Quote> getAllQuotes() {
        return quoteRepository.findByDeletedFalse();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Quote> getQuote(@PathVariable Long id) {
        return quoteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Quote> createQuote(@RequestBody QuoteDTO quoteDTO) {
        System.out.println("Received quote DTO: " + quoteDTO);
        Client client = clientRepository.findById(quoteDTO.clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not found"));

        Business business = businessRepository.findById(quoteDTO.businessId)
                .orElseThrow(() -> new IllegalArgumentException("Business not found"));

        Quote quote = new Quote(
                client,
                business,
                new ArrayList<>(), // empty quote items
                quoteDTO.issuedDate,
                quoteDTO.expiryDate,
                quoteDTO.status,
                BigDecimal.ZERO,
                BigDecimal.ZERO
        );

        Quote saved = quoteRepository.save(quote);
        return ResponseEntity.ok(saved);
    }

   @Transactional
@PutMapping("/{id}")
public ResponseEntity<Quote> updateQuote(@PathVariable Long id, @RequestBody QuoteDTO dto) {
    Optional<Quote> optionalQuote = quoteRepository.findById(id);
    if (optionalQuote.isEmpty()) return ResponseEntity.notFound().build();

    Quote existingQuote = optionalQuote.get();

    Client client = clientRepository.findById(dto.clientId)
            .orElseThrow(() -> new RuntimeException("Client not found"));
    Business business = businessRepository.findById(dto.businessId)
            .orElseThrow(() -> new RuntimeException("Business not found"));

    existingQuote.setClient(client);
    existingQuote.setBusiness(business);
    existingQuote.setIssuedDate(dto.issuedDate);
    existingQuote.setExpiryDate(dto.expiryDate);
    existingQuote.setStatus(dto.status);

    // 🚨 Delete old items
    quoteItemRepository.deleteById_QuoteId(id);

    // ✅ Add new items
    List<QuoteItem> newItems = dto.quoteItems.stream().map(itemDto -> {
        Product product = productRepository.findById(itemDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        QuoteItem item = new QuoteItem();
        item.setId(new QuoteItemPK(id, product.getProductId()));
        item.setQuote(existingQuote);  // Set only the ID
        item.setProduct(product);
        item.setQuantity(itemDto.getQuantity());
        item.setUnitPrice(itemDto.getUnitPrice());
        item.setDiscount(itemDto.getDiscount());
        return item;
    }).toList();

    // save the quote first
    Quote savedQuote = quoteRepository.save(existingQuote);

    // save the items
    quoteItemRepository.saveAll(newItems);

    return ResponseEntity.ok(savedQuote);
}

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generateQuotePDF(@PathVariable Long id) {
        System.out.println("Generating PDF for quote ID: " + id);
        return quoteRepository.findById(id)
                .map(quote -> {
                    byte[] pdfContent = GenerateQuote.generateQuote(quote);
                    return ResponseEntity.ok()
                            .header("Content-Type", "application/pdf")
                            .header("Content-Disposition", "inline; filename=quote.pdf")
                            .body(pdfContent);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuote(@PathVariable Long id) {
        Optional<Quote> optionalQuote = quoteRepository.findById(id);
        if (optionalQuote.isPresent()) {
            Quote quote = optionalQuote.get();
            quote.setDeleted(true);
            quoteRepository.save(quote);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
