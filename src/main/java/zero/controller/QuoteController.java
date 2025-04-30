package zero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Business;
import zero.domain.Client;
import zero.domain.Quote;
import zero.dto.QuoteDTO;
import zero.helpers.GenerateQuote;
import zero.repository.BusinessRepository;
import zero.repository.ClientRepository;
import zero.repository.QuoteRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    private final QuoteRepository quoteRepository;
    private final ClientRepository clientRepository;
    private final BusinessRepository businessRepository;

    public QuoteController(QuoteRepository quoteRepository,
                           ClientRepository clientRepository,
                           BusinessRepository businessRepository) {
        this.quoteRepository = quoteRepository;
        this.clientRepository = clientRepository;
        this.businessRepository = businessRepository;
    }

    @GetMapping
    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
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

    @PutMapping("/{id}")
    public ResponseEntity<Quote> updateQuote(@PathVariable Long id, @RequestBody Quote updatedQuote) {
        return quoteRepository.findById(id)
                .map(existing -> {
                    updatedQuote.setQuoteItems(existing.getQuoteItems()); // Keep existing items
                    Quote saved = quoteRepository.save(updatedQuote);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuote(@PathVariable Long id) {
        if (!quoteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        quoteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
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
}
