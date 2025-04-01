/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package helpers;

import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.font.*;
import java.io.IOException;
import java.nio.file.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 *
 * @author kevin
 */



public class GenerateInvoice {
    
    
    public static void main(String[] args) {
        
        System.out.println(Paths.get("Arial.ttf").toAbsolutePath());

        List<String> items = List.of("Product A", "Product B", "Service C");
        List<Double> prices = List.of(49.99, 79.99, 29.99);
        double taxRate = 0.15; // 15% GST fixewd - should be final
        String outputFilePath = "invoice.pdf";

        createInvoice("Person 1", items, prices, taxRate, outputFilePath);
    }
    
    
    public static void createInvoice(String customerName, List<String> items, List<Double> prices, double taxRate, String outputFilePath) {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            // Load a custom TrueType font (ensure you have a .ttf file available)
            PDType0Font font = PDType0Font.load(document, Files.newInputStream(Paths.get("ARIAL.ttf")));

            
                                        //Title
            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            contentStream.setFont(font, 16);
            contentStream.beginText();
            contentStream.newLineAtOffset(50, 750);
            contentStream.showText("Tax Invoice");
            contentStream.endText();

                                        //User details
            contentStream.setFont(font, 12);
            contentStream.beginText();
            contentStream.newLineAtOffset(50, 720);
            contentStream.showText("Company Name");
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Bill to: " + customerName);
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Date: " + new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            contentStream.endText();

            
                                        //Invoice line headers
            float yPosition = 650;
            contentStream.beginText();
            contentStream.newLineAtOffset(50, yPosition);
            contentStream.showText("Item");
            contentStream.newLineAtOffset(200, 0);
            contentStream.showText("Price");
            contentStream.endText();
            yPosition -= 20;
                                        //Invoice lines
            double subtotal = 0;
            for (int i = 0; i < items.size(); i++) {
                contentStream.beginText();
                contentStream.newLineAtOffset(50, yPosition);
                contentStream.showText(items.get(i));
                contentStream.newLineAtOffset(200, 0);
                contentStream.showText(String.format("$%.2f", prices.get(i)));
                contentStream.endText();
                yPosition -= 20;
                subtotal += prices.get(i);
            }

            
            
                                        //Cost calc
            double tax = subtotal * taxRate;
            double total = subtotal + tax;

            yPosition -= 20;
            contentStream.beginText();
            contentStream.newLineAtOffset(50, yPosition);
            contentStream.showText("Subtotal: " + String.format("$%.2f", subtotal));
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Tax (" + (taxRate * 100) + "%): " + String.format("$%.2f", tax));
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Total: " + String.format("$%.2f", total));
            contentStream.endText();

            contentStream.close();
            document.save(outputFilePath);
            System.out.println("Invoice saved to " + outputFilePath);
        } catch (IOException e) {
            System.err.println("Error generating invoice: " + e.getMessage());
        }
    }


}
