package com.flight.flightdetails.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Flight Details")
public class Flight {

    @Id
    private long id;
    private String flightNumber;
    private String source;
    private String destination;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate date;
    private double fare;

    public Flight() {
        super();
    }

    public Flight(long id, String flightNumber, String source, String destination, LocalDate date, double fare) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.fare = fare;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((flightNumber == null) ? 0 : flightNumber.hashCode());
        result = prime * result + (int) (id ^ (id >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Flight other = (Flight) obj;
        if (flightNumber == null) {
            if (other.flightNumber != null)
                return false;
        } else if (!flightNumber.equals(other.flightNumber))
            return false;
        if (id != other.id)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Flight [date=" + date + ", destination=" + destination + ", fare=" + fare + ", flightNumber="
                + flightNumber + ", id=" + id + ", source=" + source + "]";
    }

}