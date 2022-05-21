package com.flight.flightdetails;

import com.flight.flightdetails.model.Flight;
import com.flight.flightdetails.repository.FlightRepo;
import com.flight.flightdetails.service.FlightServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class FlightDetailsApplicationTests {

	@Autowired
	private FlightServiceImpl flightServiceImpl;

	@MockBean
	private FlightRepo flightRepo;

	@Test
	void contextLoads() {
	}

	@Test
	public void setFlightTest() {

		Flight flight = new Flight();
		flight.setId(1);
		flight.setFlightNumber("BY101");
		flight.setSource("Nagpur");
		flight.setDestination("Mumbai");
		flight.setDate(LocalDate.ofEpochDay(14-04-2022));
		flight.setFare(13000);

		Mockito.when(flightRepo.save(flight)).thenReturn(flight);

		assertEquals(flightServiceImpl.setFlightDetails(flight), flight);
	}

	@Test
	public void getAllFlightsTest() {

		Flight flight = new Flight();
		flight.setId(1);
		flight.setFlightNumber("BY101");
		flight.setSource("Nagpur");
		flight.setDestination("Mumbai");
		flight.setDate(LocalDate.ofEpochDay(14-04-2022));
		flight.setFare(13000);

		Flight flight2 = new Flight();
		flight2.setId(1);
		flight2.setFlightNumber("BY102");
		flight2.setSource("Delhi");
		flight2.setDestination("Bangalore");
		flight2.setDate(LocalDate.ofEpochDay(14-04-2022));
		flight2.setFare(15000);

		List<Flight> airportList = new ArrayList<>();

		airportList.add(flight);
		airportList.add(flight2);

		Mockito.when(flightRepo.findAll()).thenReturn(airportList);

		assertEquals(flightServiceImpl.getAllFlights(), airportList);
	}

	@Test
	public void getFlightByIdTest() {

		Flight flight = new Flight();
		flight.setId(1);
		flight.setFlightNumber("BY101");
		flight.setSource("Nagpur");
		flight.setDestination("Mumbai");
		flight.setDate(LocalDate.ofEpochDay(16-04-2022));
		flight.setFare(13000);

		Mockito.when(flightRepo.findByFlightNumber(flight.getFlightNumber())).thenReturn(flight);

		assertEquals(flightServiceImpl.getFlightByFlightNumber("BY101"), flight);

//		Mockito.when(flightRepo.findByAirportId(2)).thenReturn(null);
//
//		assertEquals(flightServiceImpl.getAirportByAirportId(2), null);
	}

}
