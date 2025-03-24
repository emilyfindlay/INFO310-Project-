/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import java.math.BigDecimal;
import java.util.Objects;

/**
 *
 * @author kevin
 */
public class Product {
    private Integer productId;
    private String name;
    private BigDecimal price;

    
    public Product() {
        
    }
    
    public Product(Integer productId, String name, BigDecimal price) {
        this.productId = productId;
        this.name = name;
        this.price = price;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.productId);
        hash = 59 * hash + Objects.hashCode(this.name);
        hash = 59 * hash + Objects.hashCode(this.price);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Product other = (Product) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.productId, other.productId)) {
            return false;
        }
        return Objects.equals(this.price, other.price);
    }

    @Override
    public String toString() {
        return "Product(" +
               "productId=" + productId +
               ", name='" + name + '\'' +
               ", price=" + price +
               ')';
    }

    
    
    
    
}
