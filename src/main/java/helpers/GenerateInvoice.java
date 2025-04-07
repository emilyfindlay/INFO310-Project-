package helpers;

import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.font.*;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.PDPageContentStream;

import java.io.IOException;
import java.nio.file.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class GenerateInvoice {

    public static void main(String[] args) {
        List<String> items = List.of("Widget A", "Gadget B", "Service C");
        List<String> descriptions = List.of("High quality widget", "Useful gadget", "Professional service");
        List<Integer> quantities = List.of(2, 1, 3);
        List<Double> unitPrices = List.of(49.99, 79.99, 29.99);
        double taxRate = 0.15;
        String outputFilePath = "invoice.pdf";

        createInvoice("Customer Name", "123 Customer St\nCity, Country", items, descriptions, quantities, unitPrices, taxRate, outputFilePath);
    }

    public static void createInvoice(String customerName, String customerAddress, List<String> items, List<String> descriptions,
                                     List<Integer> quantities, List<Double> unitPrices, double taxRate, String outputFilePath) {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            PDType0Font font = PDType0Font.load(document, Files.newInputStream(Paths.get("ARIAL.ttf")));
            PDPageContentStream cs = new PDPageContentStream(document, page);

            float margin = 50;
            float pageWidth = page.getMediaBox().getWidth();
            float y = 750;

// === Company Info (Top Left) ===
            cs.setFont(font, 12);
            cs.beginText();
            cs.newLineAtOffset(margin, y);
            cs.showText("Your Company Name");
            cs.newLineAtOffset(0, -15);
            cs.showText("123 Business Rd");
            cs.newLineAtOffset(0, -15);
            cs.showText("Wellington, NZ");
            cs.newLineAtOffset(0, -15);
            cs.showText("Phone: 021 123 4567");
            cs.newLineAtOffset(0, -15);
            cs.showText("Email: sales@company.com");
            cs.endText();

// === INVOICE Info (Top Right) ===
            cs.setFont(font, 14);
            cs.beginText();
            cs.newLineAtOffset(pageWidth - margin - 200, y);
            cs.showText("INVOICE");
            cs.setFont(font, 12);
            cs.newLineAtOffset(0, -20);
            cs.showText("Invoice #: INV-" + new SimpleDateFormat("yyyyMMddHHmm").format(new Date()));
            cs.newLineAtOffset(0, -15);
            cs.showText("Date: " + new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            cs.endText();


            // Customer info
            y -= 75;
            cs.beginText();
            cs.newLineAtOffset(margin, y - 30);
            cs.showText("Bill To:");
            cs.newLineAtOffset(0, -15);
            cs.showText(customerName);
            for (String line : customerAddress.split("\n")) {
                cs.newLineAtOffset(0, -15);
                cs.showText(line);
            }
            cs.endText();


            // shipping info
            cs.beginText();
            cs.newLineAtOffset(pageWidth - margin - 250, y - 30);
            cs.showText("Ship To:");
            cs.newLineAtOffset(0, -15);
            cs.showText(customerName);
            for (String line : customerAddress.split("\n")) {
                cs.newLineAtOffset(0, -15);
                cs.showText(line);
            }
            cs.endText();

            // Table header
            float tableTopY = y - 120;
            float rowHeight = 20;
            float tableWidth = 500;
            float tableX = margin;
            float[] colWidths = {100, 200, 50, 75, 75}; // Item, Desc, Qty, Unit, Total

            cs.setStrokingColor(0, 0, 0);
            cs.setLineWidth(1);

            // Draw header row
            float currentY = tableTopY;
            cs.addRect(tableX, currentY - rowHeight, tableWidth, rowHeight);
            cs.stroke();

            cs.beginText();
            cs.setFont(font, 12);
            float textY = currentY - 15;
            float x = tableX + 5;
            cs.newLineAtOffset(x, textY);
            cs.showText("Item");
            cs.newLineAtOffset(colWidths[0], 0);
            cs.showText("Description");
            cs.newLineAtOffset(colWidths[1], 0);
            cs.showText("Qty");
            cs.newLineAtOffset(colWidths[2], 0);
            cs.showText("Unit Price");
            cs.newLineAtOffset(colWidths[3], 0);
            cs.showText("Total");
            cs.endText();

            // Rows
            double subtotal = 0;
            currentY -= rowHeight;
            for (int i = 0; i < items.size(); i++) {
                double lineTotal = quantities.get(i) * unitPrices.get(i);
                subtotal += lineTotal;

                // Row border
                cs.addRect(tableX, currentY - rowHeight, tableWidth, rowHeight);
                cs.stroke();

                // Text
                cs.beginText();
                cs.newLineAtOffset(tableX + 5, currentY - 15);
                cs.showText(items.get(i));
                cs.newLineAtOffset(colWidths[0], 0);
                cs.showText(descriptions.get(i));
                cs.newLineAtOffset(colWidths[1], 0);
                cs.showText(String.valueOf(quantities.get(i)));
                cs.newLineAtOffset(colWidths[2], 0);
                cs.showText(String.format("$%.2f", unitPrices.get(i)));
                cs.newLineAtOffset(colWidths[3], 0);
                cs.showText(String.format("$%.2f", lineTotal));
                cs.endText();

                currentY -= rowHeight;
            }

            // Draw column lines
            float colX = tableX;
            for (float w : colWidths) {
                colX += w;
                cs.moveTo(colX, tableTopY);
                cs.lineTo(colX, currentY);
            }
            cs.stroke();

            // Totals
            double tax = subtotal * taxRate;
            double total = subtotal + tax;

            currentY -= 30;
            cs.beginText();
            cs.setFont(font, 12);
            cs.newLineAtOffset(pageWidth - margin - 150, currentY);
            cs.showText("Subtotal: " + String.format("$%.2f", subtotal));
            cs.newLineAtOffset(0, -15);
            cs.showText("GST (15%): " + String.format("$%.2f", tax));
            cs.newLineAtOffset(0, -15);
            cs.showText("Total: " + String.format("$%.2f", total));
            cs.endText();

            // Footer
            cs.beginText();
            cs.setFont(font, 10);
            cs.newLineAtOffset(tableX, 100);
            cs.showText("Thank you for your business!");        //business info needs default line for end of invoice
            cs.newLineAtOffset(0, -15);
            cs.showText("Please make payment within 14 days to: BANK ACC NUMBER");  //duedate calculation
            cs.endText();

            cs.close();
            document.save(outputFilePath);
            System.out.println("Invoice saved to " + outputFilePath);
        } catch (IOException e) {
            System.err.println("Error generating invoice: " + e.getMessage());
        }
    }
}
