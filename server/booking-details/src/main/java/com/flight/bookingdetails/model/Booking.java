package com.flight.bookingdetails.model;

import java.math.BigInteger;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;



@EntityScan
public class Booking {
	@Id
	// @GeneratedValue(strategy=GenerationType.AUTO)
	private BigInteger bookingId;
	private String bookingDate;
	private int noOfPassengers;

	public BigInteger getBookingId() {
		return bookingId;
	}

	public void setBookingId(BigInteger bookingId) {
		this.bookingId = bookingId;
	}

	public String getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(String bookingDate) {
		this.bookingDate = bookingDate;
	}

	public int getNoOfPassengers() {
		return noOfPassengers;
	}

	public void setNoOfPassengers(int noOfPassengers) {
		this.noOfPassengers = noOfPassengers;
	}
}