/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import java.util.Objects;
import net.sf.oval.constraint.Email;
import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotNull;

/**
 *
 * @author kevin
 * 
 * 
 * TODO: Add address fields 
 */
public class Client {
    
    private Integer clientId;
    @NotNull(message = "ID must be provided.")
    @NotBlank(message = "ID must be provided.")
    @Length(min = 2, message = "ID must contain at least two characters.")
    
    private Integer physicalAddressID;
    @NotNull(message = "Physical address ID must be provided")
    @NotBlank(message = "Physical address ID must be provided")
    
    private Integer mailingAddressID;
    
    private String name;
    @NotNull(message = "name must be provided")
    @NotBlank(message = "name must be provided")
    @Length(message = "name must contain at least two characters.")
    
    private String email;
    @NotNull(message = "email must be provided")
    @NotBlank(message = "email must be provided")
    @Email(message = "Email address must be a valid email format.")
    
    private String phoneNum;
    @NotNull(message = "phone number must be provided")
    @NotBlank(message = "phone number must be provided")
    
    private String notes;
    
    public Client(){
        
    }
    
    public Client(String name, String email, String phoneNum, String notes){
        this.name = name;
        this.email = email;
        this.phoneNum = phoneNum;
        this.notes = notes;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public Integer getphysicalAddressID(){
        return physicalAddressID;
    }
    
    public Integer getmailingAddressID(){
        return physicalAddressID; 
    }


    @Override
    public int hashCode() {
        int hash = 7;
        hash = 31 * hash + Objects.hashCode(this.clientId);
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
        final Client other = (Client) obj;
        return Objects.equals(this.clientId, other.clientId);
    }

    
    @Override
    public String toString() {
        return "Client(" +
               "clientId=" + clientId +
               "physicalAddressID=" + physicalAddressID +
               "mailingAddressID=" + mailingAddressID + 
               ", name='" + name + '\'' +
               ", email='" + email + '\'' +
               ", phoneNum='" + phoneNum + '\'' +
               ", notes='" + notes + '\'' +
               ')';
    }
    
}
