# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, FormValidationAction, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, AllSlotsReset
import json


class ActionResetAllSlots(Action):
    def name(self):
        return "action_reset_all_slots"

    def run(self, dispatcher, tracker, domain):
        return [AllSlotsReset()]
    
class ActionNganhDaoTao(Action):
    def name(self):
        return "action_nganh_dao_tao"

    def run(self, dispatcher, tracker, domain):
        f = open('./data/collections/data_collect.json', encoding="utf8")
        data = json.load(f)
        if data["chung"]["nganh_dao_tao"]:
            dispatcher.utter_message(text=f"{data['chung']['nganh_dao_tao']}")
        else:
            dispatcher.utter_message(text=f"Bot chưa có thông tin gì về vấn đề này")

        return []
    
    


########################################################################
class ActionValidateMajorName(FormValidationAction):
    def name(self) -> Text:
        return "validate_request_time_learning_major_form"

    def validate_request_time_learning_major_form(
            self,
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text, Any]:
        # dispatcher.utter_message(text=f"OK! You want to have a {slot_value} pizza.")
        return {"major": slot_value}

class ActionGetTimeLearningMajor(Action):
    def name(self):
        return "action_get_time_learning_major"

    def run(self, dispatcher, tracker, domain):
        f = open('./data/data_db.json', encoding="utf8")
        data = json.load(f)
        major = tracker.get_slot("major")
        if major:
            major = major.lower()
            print(f"major {major}")
            for item in data["tuyen_sinh"]["bac"]["2023"]["nganh"]:
                for key in item["key_word"]:
                    if key.lower().find(major) != -1:
                        dispatcher.utter_message(text=f"Thời gian đào tạo của ngành {item['ten_nganh']} là {item['tgian']} ")
                        break
        else:
            dispatcher.utter_message(text=f"Vui lòng cung cấp các ngành mà Học viện đào tạo")
        f.close()
        return []

class ActionGetPoints(Action):
    def name(self):
        return "action_get_all_points"

    def run(self, dispatcher, tracker, domain):
        f = open('./data/data_db.json', encoding="utf8")
        data = json.load(f)
        result = ""
        for item in data["tuyen_sinh"]["bac"]["2023"]["nganh"]:
            result += f"{item['ten_nganh']}: {item['diem_chuan']['diem']}\n"

        dispatcher.utter_message(text=f"{result}")
        f.close()
        return []

class ActionGetAllJoins(Action):
    def name(self):
        return "action_get_all_joins"

    def run(self, dispatcher, tracker, domain):
        f = open('./data/data_db.json', encoding="utf8")
        data = json.load(f)
        dispatcher.utter_message(text=f"{data['tuyen_sinh']['bac']['2023']['phuong_thuc_tuyen_sinh']['noi_dung']}")
        f.close()
        return []


class ActionGetAllMajors(Action):
    def name(self):
        return "action_get_all_majors"

    def run(self, dispatcher, tracker, domain):
        f = open('./data/data_db.json', encoding="utf8")
        data = json.load(f)
        dispatcher.utter_message(text=f"{data['tuyen_sinh']['nganh_dao_tao']}")
        f.close()
        return []



class ActionValidateSchoolId(FormValidationAction):
    def name(self) -> Text:
        return "validate_request_school_id_form"

    def validate_pizza_size(
            self,
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text, Any]:
        # dispatcher.utter_message(text=f"OK! You want to have a {slot_value} pizza.")
        return {"branch": slot_value}


class ActionSchoolId(Action):
    def name(self) -> Text:
        return "action_school_id"

    def run(self, dispatcher: CollectingDispatcher,
                        tracker: Tracker,
                        domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        f = open('./data/data_db.json', encoding="utf8")
        data = json.load(f)
        # branch = tracker.get_latest_entity_values("branch", None)
        branch= tracker.get_slot("branch")
        print(f"slottt  {branch}")
        dispatcher.utter_message(text=f"run action {branch} - {data['tuyen_sinh']['bac']['ma_truong']}")
        f.close()

        return [SlotSet("branch", "")]

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
