/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import domain.Invoice;
import repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class InvoiceController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    // Read all invoice items
    @GetMapping
    public List<Invoice> getAllInvoice() {
        return invoiceRepository.findAll();
    }

    // Add new invoice item
    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    // Read an invoice item by ID
    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Integer id) {
        Optional<Invoice> invoice = invoiceRepository.findById(id);
        return invoice.orElse(null); 
    }

    // Delete an invoice item
    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable Integer id) {
        if (invoiceRepository.existsById(id)) {
            invoiceRepository.deleteById(id);
        }
    }
}
