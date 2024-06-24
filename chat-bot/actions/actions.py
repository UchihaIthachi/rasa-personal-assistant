# actions/actions.py
# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
# actions/actions.py


class ActionBookRoom(Action):
    def name(self) -> Text:
        return "action_book_room"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        check_in_date = tracker.get_slot('check_in_date')
        check_out_date = tracker.get_slot('check_out_date')

        # Here, you would typically call an external API to book the room
        # For this example, we'll assume the booking is always successful
        dispatcher.utter_message(text=f"Room booked from {check_in_date} to {check_out_date}. Enjoy your stay!")
        return [SlotSet("booking_confirmed", True)]

class ActionCheckAvailability(Action):
    def name(self) -> Text:
        return "action_check_availability"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        check_in_date = tracker.get_slot('check_in_date')
        check_out_date = tracker.get_slot('check_out_date')

        # Here, you would typically call an external API to check room availability
        available = True  # Simulating availability check

        if available:
            dispatcher.utter_message(text="We have rooms available for your dates.")
        else:
            dispatcher.utter_message(text="I'm sorry, but we don't have any rooms available for those dates.")
        return []

class ActionCancelBooking(Action):
    def name(self) -> Text:
        return "action_cancel_booking"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Here, you would typically call an external API to cancel the booking
        dispatcher.utter_message(text="Your booking has been successfully canceled.")
        return []

class ActionMakeReservation(Action):
    def name(self) -> Text:
        return "action_make_reservation"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        reservation_date = tracker.get_slot('reservation_date')
        reservation_time = tracker.get_slot('reservation_time')

        # Here, you would typically call an external API to make the reservation
        dispatcher.utter_message(text=f"Your reservation at our restaurant for {reservation_date} at {reservation_time} has been confirmed.")
        return [SlotSet("reservation_confirmed", True)]

class ActionRoomService(Action):
    def name(self) -> Text:
        return "action_room_service"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Here, you would typically call an external API to order room service
        dispatcher.utter_message(text="Room service order has been placed.")
        return []

class ActionProvideInformation(Action):
    def name(self) -> Text:
        return "action_provide_information"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Provide information about the hotel
        dispatcher.utter_message(text="Our hotel offers a variety of amenities including a spa, fitness center, and free Wi-Fi.")
        return []
