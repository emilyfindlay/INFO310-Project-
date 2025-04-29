package zero.helpers;

import zero.domain.*;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.font.*;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.*;
import java.util.Collection;

public class GenerateInvoice {

    public static byte[] generateInvoice(Invoice invoice) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        createInvoice(invoice.getBusiness(), invoice.getClient(), invoice.getInvoiceItems(), invoice, byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    public static void createInvoice(Business user, Client client, Collection<InvoiceItem> descriptions, Invoice invoice, ByteArrayOutputStream byteArrayOutputStream) {
        final String BANK_ACC = user.getBankAccountNumber();
        String dueDate = invoice.getDueDate().toString();

        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            PDType0Font font = PDType0Font.load(document, Files.newInputStream(Paths.get("ARIAL.ttf")));
            PDPageContentStream cs = new PDPageContentStream(document, page);

            float margin = 50;
            float pageWidth = page.getMediaBox().getWidth();
            float y = 720;

            // === Company Info (Top Left) ===
            cs.setFont(font, 12);
            cs.beginText();
            cs.newLineAtOffset(margin, y);
            cs.showText(user.getBusinessName());
            cs.newLineAtOffset(0, -15);
            cs.showText(user.getAddress().getStreetAddress1());
            cs.newLineAtOffset(0, -15);
            cs.showText(user.getAddress().getStreetAddress2());
            cs.newLineAtOffset(0, -15);
            cs.showText(user.getAddress().getRegion());
            cs.newLineAtOffset(0, -15);
            cs.showText(user.getAddress().getCity() + " " + client.getAddress().getPostCode());
            cs.newLineAtOffset(0, -30);
            cs.showText("Phone: " + user.getPhone());
            cs.newLineAtOffset(0, -15);
            cs.showText("Email: " + user.getEmail());
            cs.newLineAtOffset(0, -15);
            cs.showText("IRD Number: " + user.getBusinessId());
            cs.endText();

            // === INVOICE Info (Top Right) ===
            cs.setFont(font, 18);
            cs.beginText();
            cs.newLineAtOffset(pageWidth - margin - 200, y);
            cs.showText("INVOICE");
            cs.setFont(font, 12);
            cs.newLineAtOffset(0, -20);
            cs.showText("Invoice #: INV-" + invoice.getInvoiceId());
            cs.newLineAtOffset(0, -15);
            cs.showText("Date: " + invoice.getIssuedDate());
            cs.newLineAtOffset(0, -15);
            cs.showText("Due Date: " + dueDate);
            cs.endText();

            // Customer info
            y -= 100;
            cs.beginText();
            cs.newLineAtOffset(margin, y - 30);
            cs.showText("Bill To:");
            cs.newLineAtOffset(0, -15);
            cs.showText(client.getName());
            cs.newLineAtOffset(0, -15);
            cs.showText(client.getAddress().getStreetAddress1());
            cs.newLineAtOffset(0, -15);
            cs.showText(client.getAddress().getStreetAddress2());
            cs.newLineAtOffset(0, -15);
            cs.showText(client.getAddress().getRegion());
            cs.newLineAtOffset(0, -15);
            cs.showText(client.getAddress().getCity() + " " + client.getAddress().getPostCode());
            cs.endText();

            // Table header
            float tableTopY = y - 120;
            float rowHeight = 20;
            float tableWidth = 475;
            float tableX = margin;
            float[] colWidths = {200, 50, 75, 75, 75}; // Description, Qty, Unit Price, Discount, Total

            cs.setStrokingColor(0, 0, 0);
            cs.setLineWidth(1);

            // Draw header row
            float currentY = tableTopY;
            cs.addRect(tableX, currentY - rowHeight, tableWidth, rowHeight);
            cs.stroke();

            // Header text
            cs.beginText();
            cs.setFont(font, 12);
            float textY = currentY - 15;
            float x = tableX + 5;
            cs.newLineAtOffset(x, textY);
            cs.showText("Description");
            cs.newLineAtOffset(colWidths[0], 0);
            cs.showText("Qty");
            cs.newLineAtOffset(colWidths[1], 0);
            cs.showText("Unit Price");
            cs.newLineAtOffset(colWidths[2], 0);
            cs.showText("Discount");
            cs.newLineAtOffset(colWidths[3], 0);
            cs.showText("Total");
            cs.endText();

            // Rows
            currentY -= rowHeight;
            for (InvoiceItem item : descriptions) {
                String description = item.getProduct().getProductDescription();
                double quantity = item.getQuantity();
                BigDecimal unitPrice = item.getUnitPrice();
                BigDecimal discount = item.getDiscount();
                BigDecimal lineTotal = item.getSubtotal();

                // Draw row border
                cs.addRect(tableX, currentY - rowHeight, tableWidth, rowHeight);
                cs.stroke();

                // Row text
                cs.beginText();
                cs.newLineAtOffset(tableX + 5, currentY - 15);
                cs.showText(description);
                cs.newLineAtOffset(colWidths[0], 0);
                cs.showText(String.valueOf(quantity));
                cs.newLineAtOffset(colWidths[1], 0);
                cs.showText(String.format("$%.2f", unitPrice));
                cs.newLineAtOffset(colWidths[2], 0);
                cs.showText(String.format("$%.2f", discount));
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
            BigDecimal tax = invoice.getTotalGst();
            BigDecimal total = invoice.getInvoiceTotal();
            //BigDecimal subtotal = invoice.get      subtotal needed?

            currentY -= 30;
            cs.beginText();
            cs.setFont(font, 12);
            cs.newLineAtOffset(pageWidth - margin - 150, currentY);
            //cs.showText("Subtotal: " + String.format("$%.2f", subtotal));     as above
            cs.newLineAtOffset(0, -15);
            cs.showText("GST (15%): " + String.format("$%.2f", tax));
            cs.newLineAtOffset(0, -15);
            cs.showText("Total: " + String.format("$%.2f", total));
            cs.endText();

            // Footer
            cs.beginText();
            cs.setFont(font, 10);
            cs.newLineAtOffset(tableX, 100);
            cs.showText("Thank you for your business!");
            cs.newLineAtOffset(0, -15);
            cs.showText("Please make payments to: " + BANK_ACC);

            cs.endText();

            cs.close();
            document.save(byteArrayOutputStream);
            System.out.println("Invoice saved to byte stream.");
        } catch (IOException e) {
            System.err.println("Error generating invoice: " + e.getMessage());
        }
    }
}
