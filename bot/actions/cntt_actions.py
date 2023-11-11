

from typing import Any, Text, Dict, List

from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, AllSlotsReset
import json

class ActionCnttTongQuan(Action):

   def name(self):
      return "action_cntt_tongquan"

   def run(self, dispatcher, tracker, domain):
        nganh = tracker.get_slot("nganh")
        thongtinphu = tracker.get_slot("thongtinphu")
        thongtinchinh = tracker.get_slot("thongtinchinh")
        coso = tracker.get_slot("coso")

        dispatcher.utter_message(text=f"cntt tong quan cústom action.{thongtinchinh} -  {nganh}  - {thongtinphu} - {coso}")