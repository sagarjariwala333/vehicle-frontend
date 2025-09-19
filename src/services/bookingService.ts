import { bookingsAPI, usersAPI } from './api';
import { FormData } from '../store/types';

export interface BookingSubmissionData extends FormData {
  // Additional fields that might be needed for booking
}

export const submitBooking = async (formData: FormData) => {
  try {
    let user;

    // First, try to create a user
    try {
      const userResponse = await usersAPI.create({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      });
      user = userResponse.data.data;
      console.log('New user created:', user.id);
    } catch (userError: any) {
      // If user creation fails due to duplicate email, try to find the existing user
      if (
        userError.response?.status === 400 ||
        userError.response?.status === 409
      ) {
        console.log('User might already exist, checking...');

        // Check if the error is about duplicate email
        const errorMessage =
          userError.response?.data?.error?.message ||
          userError.response?.data?.message ||
          '';
        if (
          errorMessage.toLowerCase().includes('email') ||
          errorMessage.toLowerCase().includes('unique')
        ) {
          // Try to find the user by email
          try {
            const existingUserResponse = await usersAPI.getAll();
            const users = existingUserResponse.data.data;
            const existingUser = users.find(
              (u: any) => u.email === formData.email
            );

            if (existingUser) {
              user = existingUser;
              console.log('Using existing user:', user.id);
            } else {
              throw new Error(
                'User with this email exists but could not be found.'
              );
            }
          } catch {
            throw new Error(
              'Unable to verify user information. Please try with a different email.'
            );
          }
        } else {
          // Re-throw the original error if it's not about duplicate email
          throw userError;
        }
      } else {
        // Re-throw the original error for other status codes
        throw userError;
      }
    }

    if (!user) {
      throw new Error('Failed to create or find user.');
    }

    // Convert dates to ISO 8601 format
    const startDate = new Date(formData.startDate).toISOString();
    const endDate = new Date(formData.endDate).toISOString();

    // Create the booking request with the user ID
    const bookingRequest = {
      user_id: user.id,
      vehicle_id: formData.vehicleModel, // vehicleModel contains the vehicle ID
      start_date: startDate,
      end_date: endDate,
    };

    // Submit the booking
    const response = await bookingsAPI.create(bookingRequest);

    return {
      success: true,
      booking: response.data.data,
      user: user,
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
      const errorMessage =
        error.response?.data?.error?.message || error.response?.data?.message;
      throw new Error(
        errorMessage || 'Invalid booking data. Please check your inputs.'
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
