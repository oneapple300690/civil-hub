<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends BaseController
{
    /**
     * Display a list of all bookings.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->user()->tokenCan('booking-list')) {
            return $this->sendError('Unauthorised Token Ability', []);
        }

        if ($request->user()->is_admin) {
            $bookings = Booking::all();
        } else {
            $bookings = Booking::where('customer_id', $request->user()->id)->get();
        }

        return $this->sendResponse(BookingResource::collection($bookings), 'Bookings retrieved successfully.');
    }
    /**
     * Store a newly created booking in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!$request->user()->tokenCan('booking-store')) {
            return $this->sendError('Unauthorised Token Ability', []);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'package_id' => 'required',
            'booking_date' => 'required|date',
            'booking_price' => 'required|numeric',
            'service_price' => 'required|numeric',
            'booking_status' => 'required',
            'payment_status' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $booking = Booking::create($input);

        return $this->sendResponse(new BookingResource($booking), 'Booking created successfully.');
    }

    /**
     * Display the specified booking.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (!$request->user()->tokenCan('booking-show')) {
            return $this->sendError('Unauthorised Token Ability', []);
        }

        if ($request->user()->is_admin) {
            $booking = Booking::find($id);
        } else {
            $booking = Booking::where('id', $id)->where('customer_id', $request->user()->id)->first();
        }

        if (is_null($booking)) {
            return $this->sendError('Booking not found.');
        }

        return $this->sendResponse(new BookingResource($booking), 'Booking retrieved successfully.');
    }

    /**
     * Update the specified booking in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Booking $booking)
    {
        if (!$request->user()->tokenCan('booking-update')) {
            return $this->sendError('Unauthorised Token Ability', []);
        }

        //  Should not allow 'update' on booking that it does not belong to the user
        if (!$request->user()->is_admin && $booking->customer_id !== $request->user()->id) {
            return $this->sendError('Unauthorised Token Ability', []);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'package_id' => 'required',
            'booking_date' => 'required|date',
            'booking_price' => 'required|numeric',
            'service_price' => 'required|numeric',
            'booking_status' => 'required',
            'payment_status' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $booking->package_id = $input['package_id'];
        $booking->booking_date = $input['booking_date'];
        $booking->booking_price = $input['booking_price'];
        $booking->service_price = $input['service_price'];
        $booking->booking_status = $input['booking_status'];
        $booking->payment_status = $input['payment_status'];
        $booking->save();

        return $this->sendResponse(new BookingResource($booking), 'Booking updated successfully.');
    }

    /**
     * Remove the specified booking from database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Booking $booking)
    {
        if (!$request->user()->tokenCan('booking-destroy')) {
            return $this->sendError('Unauthorised Token Ability', []);
        }

        $booking->delete();

        return $this->sendResponse([], 'Booking deleted successfully.');
    }
}
