import { bookingsAPI, CreateBookingRequest } from './api';
import { FormData } from '../store/types';

export interface BookingSubmissionData extends FormData {
  // Additional fields that might be needed for booking
}

export const submitBooking = async (formData: FormData) => {
  try {
    // Create the booking request
    const bookingRequest: CreateBookingRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      vehicleId: formData.vehicleModel, // vehicleModel contains the vehicle ID
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    // Submit the booking
    const response = await bookingsAPI.create(bookingRequest);

    return {
      success: true,
      booking: response.data.data,
      message: 'Booking created successfully!',
    };
  } catch (error: any) {
    console.error('Booking submission error:', error);

    // Handle specific error cases
    if (error.response?.status === 409) {
      throw new Error(
        'Vehicle is not available for the selected dates. Please choose different dates.'
      );
    }

    if (error.response?.status === 400) {
      throw new Error(
        error.response.data?.message ||
          'Invalid booking data. Please check your inputs.'
      );
    }

    if (error.response?.status === 404) {
      throw new Error(
        'Selected vehicle not found. Please refresh and try again.'
      );
    }

    throw new Error('Failed to create booking. Please try again later.');
  }
};

export const checkVehicleAvailability = async (
  vehicleId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await bookingsAPI.getAll();
    const bookings = response.data.data;

    // Check for overlapping bookings
    const conflictingBookings = bookings.filter(
      (booking) =>
        booking.vehicleId === vehicleId &&
        booking.status !== 'cancelled' &&
        ((new Date(startDate) >= new Date(booking.startDate) &&
          new Date(startDate) <= new Date(booking.endDate)) ||
          (new Date(endDate) >= new Date(booking.startDate) &&
            new Date(endDate) <= new Date(booking.endDate)) ||
          (new Date(startDate) <= new Date(booking.startDate) &&
            new Date(endDate) >= new Date(booking.endDate)))
    );

    return {
      available: conflictingBookings.length === 0,
      conflictingBookings,
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw new Error('Failed to check vehicle availability');
  }
};
