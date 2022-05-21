package com.flight.bookingdetails.exceptions;

public class RecordAlreadyPresentException extends RuntimeException {
	public RecordAlreadyPresentException(String s) {
		super(s);
	}
}