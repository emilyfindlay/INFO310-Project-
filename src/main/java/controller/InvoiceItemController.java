/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import domain.InvoiceItem;
import repository.InvoiceItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoiceitems")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class InvoiceItemController {

    @Autowired
    private InvoiceItemRepository invoiceItemRepository;

    // Read all invoice items
    @GetMapping
    public List<InvoiceItem> getAllInvoiceItems() {
        return invoiceItemRepository.findAll();
    }

    // Add new invoice item
    @PostMapping
    public InvoiceItem createInvoiceItem(@RequestBody InvoiceItem invoiceItem) {
        return invoiceItemRepository.save(invoiceItem);
    }

    // Read an invoice item by ID
    @GetMapping("/{id}")
    public InvoiceItem getInvoiceItemById(@PathVariable Integer id) {
        Optional<InvoiceItem> invoiceItem = invoiceItemRepository.findById(id);
        return invoiceItem.orElse(null); 
    }

    // Delete an invoice item
    @DeleteMapping("/{id}")
    public void deleteInvoiceItem(@PathVariable Integer id) {
        if (invoiceItemRepository.existsById(id)) {
            invoiceItemRepository.deleteById(id);
        }
    }
}
