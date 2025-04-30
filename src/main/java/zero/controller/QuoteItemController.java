package zero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Quote;
import zero.domain.QuoteItem;
import zero.domain.QuoteItemPK;
import zero.domain.Product;
import zero.dto.QuoteItemDTO;
import zero.repository.QuoteItemRepository;
import zero.repository.QuoteRepository;
import zero.repository.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quote-items")
public class QuoteItemController {

    private final QuoteItemRepository quoteItemRepository;
    private final QuoteRepository quoteRepository;
    private final ProductRepository productRepository;

    public QuoteItemController(
            QuoteItemRepository quoteItemRepository,
            QuoteRepository quoteRepository,
            ProductRepository productRepository) {
        this.quoteItemRepository = quoteItemRepository;
        this.quoteRepository = quoteRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<QuoteItem> getAllQuoteItems() {
        return quoteItemRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<List<QuoteItem>> createQuoteItems(@RequestBody List<QuoteItemDTO> dtos) {
        System.out.println("Received DTOs: " + dtos);
        System.out.println("dto info: " + dtos.get(0).getQuoteId() + " " + dtos.get(0).getProductId() + " " + dtos.get(0).getQuantity() + " " + dtos.get(0).getUnitPrice() + " " + dtos.get(0).getDiscount());

        List<QuoteItem> items = dtos.stream().map(dto -> {
            Quote quote = quoteRepository.findById(dto.getQuoteId())
                    .orElseThrow(() -> new RuntimeException("Quote not found with ID " + dto.getQuoteId()));
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID " + dto.getProductId()));

            QuoteItem item = new QuoteItem();
            item.setQuote(quote);
            item.setProduct(product);
            item.setId(new QuoteItemPK(quote.getQuoteId(), product.getProductId()));
            item.setQuantity(dto.getQuantity());
            item.setUnitPrice(dto.getUnitPrice());
            item.setDiscount(dto.getDiscount());
            return item;
        }).collect(Collectors.toList());

        List<QuoteItem> savedItems = quoteItemRepository.saveAll(items);
        return ResponseEntity.ok(savedItems);
    }

    @GetMapping("/quote/{quoteId}")
    public List<QuoteItem> getItemsByQuote(@PathVariable Long quoteId) {
        return quoteItemRepository.findById_QuoteId(quoteId);
    }
}
