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
from rasa_sdk.events import SlotSet, AllSlotsReset,UserUttered
import json

'''
    - [thongtinchinh][coso_default]
    format:
    "thongtinchinh": {
        "coso_default" : "data"
    }

    - [“nganh"][thongtinchinh][thongtinphu][coso]
    format: 
    "nganh": {
        "thongtinchinh": {
            "thongtinphu": {
                "coso": "data"
            }
        }
    }

    - [“nganh”][thongtinchinh][thongtinphu][coso_default]
    format: 
    "nganh": {
        "thongtinchinh": {
           "thongtinphu": {
                "coso_default": "data"
            }
        }
    }

'''
thongtinchinh_data  = [""]
thongtinphu_data = [""]
coso_data = ["chung","bac","nam"]
nganh_data = ["cntt", "ktdtvt"]
coso_default = "chung"

def get_thong_tin_nganh(nganh, thongtinphu, coso):
    f = open('./data/collections/data_collect.json', encoding="utf8")
    data = json.load(f)
    data_return = f"Khong tim thay data {thongtinphu}"
    if coso is None:
        coso = coso_default
    if data["nganh"][nganh][thongtinphu]:
        if data["nganh"][nganh][thongtinphu][coso]:
            data_return = data["nganh"][nganh][thongtinphu][coso]
        else:
            data_return = data["nganh"][nganh][thongtinphu][coso_default]

    
    return data_return

#### [thongtinchinh][coso_default]
class ActionTruyVanThongtinchinh(Action):
    def name(self):
        return "action_truyvan_thongtinchinh"
    def run(self, dispatcher, tracker, domain):
        thongtinchinh = tracker.get_slot("thongtinchinh")
        if thongtinchinh is None:
            dispatcher.utter_message(text=f"Bot chưa hiểu ý bạn")
            # return [UserUttered(text="/my_intent", parse_data=data)]
            print(thongtinchinh + "\n")
            return [UserUttered(text="/utter_hoi_chuc_nang")]
        else:    
            print("chua lay duoc thong tin chinh\n")

            f = open('./data/collections/data_collect.json', encoding="utf8")
            data = json.load(f)
            if data[thongtinchinh] and data[thongtinchinh][coso_default]:
                dispatcher.utter_message(text=f'{data[thongtinchinh][coso_default]}')
            else:
                return [UserUttered(text="Xin lỗi, hiện tại bot chưa hiểu ý bạn hoặc chưa có dữ liệu bạn mong muốn")]

#### [“nganh"][thongtinchinh][thongtinphu][coso]
class ActionTruyVanNganhThongTinPhuCoSo(Action):
    def name(self):
        return "action_truyvan_nganh_thongtinphu_coso"
    def run(self, dispatcher, tracker, domain):
        thongtinchinh = tracker.get_slot("thongtinchinh")
        thongtinphu = tracker.get_slot("thongtinphu")
        coso = tracker.get_slot("coso")
        dispatcher.utter_message(text=f'action_truyvan_nganh_thongtinphu_coso: {thongtinchinh} - {thongtinphu} - {coso}')
        return []
        

#### [“nganh”][thongtinchinh][coso_default]

class ActionTruyVanNganhThongTinPhu(Action):
    def name(self):
        return "action_truyvan_nganh_thongtinphu"
    def run(self, dispatcher, tracker, domain):
        thongtinchinh = tracker.get_slot("thongtinchinh")
        thongtinphu = tracker.get_slot("thongtinphu")
        coso = tracker.get_slot("coso")
        dispatcher.utter_message(text=f'action_truyvan_nganh_thongtinphu: {thongtinchinh} - {thongtinphu} - {coso}')
        return []

#### truy van can nganh
class ActionTruyvanNganh(Action):
    def name(self):
        return "action_truyvan_nganh"
    def run(self, dispatcher, tracker, domain):
            # return [UserUttered(text="/my_intent", parse_data=data)]
        nganh = tracker.get_slot("nganh")
        
        if nganh is None:
            dispatcher.utter_message(text=f"Bot chưa hiểu ý bạn")
            f = open('./data/collections/data_collect.json', encoding="utf8")
            data = json.load(f)
            if data["chung"]["nganh_dao_tao"]["tong_quan"]:
                dispatcher.utter_message(text=f'{data["chung"]["nganh_dao_tao"]["tong_quan"]}')
                return [UserUttered(text="/nganh_dao_tao")]
        else:    
            thongtinphu = tracker.get_slot("thongtinphu")
            f = open('./data/collections/data_collect.json', encoding="utf8")
            data = json.load(f)
            if thongtinphu is None:
                if data["chung"]["nganh_dao_tao"][nganh]["tong_quan"]:
                    dispatcher.utter_message(text=f'{data["chung"]["nganh_dao_tao"][nganh]["tong_quan"]}')
            else:
                 if data["chung"]["nganh_dao_tao"][nganh][thongtinphu]:
                    dispatcher.utter_message(text=f'{data["chung"]["nganh_dao_tao"][nganh][thongtinphu]}')
                 else:
                    return [UserUttered(text="Xin lỗi, hiện tại bot chưa hiểu ý bạn hoặc chưa có dữ liệu bạn mong muốn")]

#### truy van can thongtinphu

#### truy van can thongtinchinh,nganh

#### truy van can nganh,thongtinphu

#### truy van can thongtinchinh,nganh,thongtinphu






def get_thong_tin_chinh(thongtinchinh, thongtinphu, coso):
    f = open('./data/collections/data_collect.json', encoding="utf8")
    data = json.load(f)
    data_return = f"Khong tim thay data {thongtinchinh}"

    return data_return

    



class ActionTruyVanData(Action):
   def name(self):
      return "action_truyvan_data"

   def run(self, dispatcher, tracker, domain):
        thongtinchinh = tracker.get_slot("thongtinchinh")
        thongtinphu = tracker.get_slot("thongtinphu")
        coso = tracker.get_slot("coso")

        if thongtinchinh is None:
            dispatcher.utter_message(text=f"Chua ro thong tin chinh")
            # return [UserUttered(text="/my_intent", parse_data=data)]
            return [UserUttered(text="/utter_hoi_chuc_nang")]
        else:    

            f = open('./data/collections/data_collect.json', encoding="utf8")
            data = json.load(f)
            is_nganh = False
            data_return = ""
            if thongtinchinh in nganh_data:
                is_nganh = True

            if is_nganh:
                data_return=get_thong_tin_nganh(thongtinchinh, thongtinphu, coso)
                dispatcher.utter_message(text=f"{data_return} - {thongtinchinh} - {thongtinphu} - {coso}")
            # if thongtinphu:
            #     dispatcher.utter_message(text=f"{data['chung']['nganh_dao_tao']}")
            # else:
            #     dispatcher.utter_message(text=f"{data['chung']['nganh_dao_tao']}")

                # dispatcher.utter_message(text=f"{data['chung']['nganh_dao_tao']}")
            
              
        return []


class ActionDefaultFallback(Action):

   def name(self):
      return "action_default_fallback"

   def run(self, dispatcher, tracker, domain):
        nganh = tracker.get_slot("nganh")
        thongtinphu = tracker.get_slot("thongtinphu")
        dispatcher.utter_message(text=f"Xin loi, toi chua hieu y cua ban {nganh} - {thongtinphu}")

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
            dispatcher.utter_message(text=f"Học viện Công nghệ Bưu chính Viễn thông hiện đang đào tạo các ngành như:\n - Kỹ thuật Điện tử viễn thông\n - Công nghệ Kỹ thuật Điện, điện tử\n - Công nghệ thông tin\n - An toàn thông tin\n - Công nghệ đa phương tiện\n - Quản trị kinh doanh\n - Marketing\n - Kế toán")

        return []
    
    


########################################################################
# class ActionValidateMajorName(FormValidationAction):
#     def name(self) -> Text:
#         return "validate_request_time_learning_major_form"

#     def validate_request_time_learning_major_form(
#             self,
#             slot_value: Any,
#             dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: DomainDict,
#     ) -> Dict[Text, Any]:
#         # dispatcher.utter_message(text=f"OK! You want to have a {slot_value} pizza.")
#         return {"major": slot_value}

# class ActionGetTimeLearningMajor(Action):
#     def name(self):
#         return "action_get_time_learning_major"

#     def run(self, dispatcher, tracker, domain):
#         f = open('./data/data_db.json', encoding="utf8")
#         data = json.load(f)
#         major = tracker.get_slot("major")
#         if major:
#             major = major.lower()
#             print(f"major {major}")
#             for item in data["tuyen_sinh"]["bac"]["2023"]["nganh"]:
#                 for key in item["key_word"]:
#                     if key.lower().find(major) != -1:
#                         dispatcher.utter_message(text=f"Thời gian đào tạo của ngành {item['ten_nganh']} là {item['tgian']} ")
#                         break
#         else:
#             dispatcher.utter_message(text=f"Vui lòng cung cấp các ngành mà Học viện đào tạo")
#         f.close()
#         return []

# class ActionGetPoints(Action):
#     def name(self):
#         return "action_get_all_points"

#     def run(self, dispatcher, tracker, domain):
#         f = open('./data/data_db.json', encoding="utf8")
#         data = json.load(f)
#         result = ""
#         for item in data["tuyen_sinh"]["bac"]["2023"]["nganh"]:
#             result += f"{item['ten_nganh']}: {item['diem_chuan']['diem']}\n"

#         dispatcher.utter_message(text=f"{result}")
#         f.close()
#         return []

# class ActionGetAllJoins(Action):
#     def name(self):
#         return "action_get_all_joins"

#     def run(self, dispatcher, tracker, domain):
#         f = open('./data/data_db.json', encoding="utf8")
#         data = json.load(f)
#         dispatcher.utter_message(text=f"{data['tuyen_sinh']['bac']['2023']['phuong_thuc_tuyen_sinh']['noi_dung']}")
#         f.close()
#         return []


# class ActionGetAllMajors(Action):
#     def name(self):
#         return "action_get_all_majors"

#     def run(self, dispatcher, tracker, domain):
#         f = open('./data/data_db.json', encoding="utf8")
#         data = json.load(f)
#         dispatcher.utter_message(text=f"{data['tuyen_sinh']['nganh_dao_tao']}")
#         f.close()
#         return []



# class ActionValidateSchoolId(FormValidationAction):
#     def name(self) -> Text:
#         return "validate_request_school_id_form"

#     def validate_pizza_size(
#             self,
#             slot_value: Any,
#             dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: DomainDict,
#     ) -> Dict[Text, Any]:
#         # dispatcher.utter_message(text=f"OK! You want to have a {slot_value} pizza.")
#         return {"branch": slot_value}


# class ActionSchoolId(Action):
#     def name(self) -> Text:
#         return "action_school_id"

#     def run(self, dispatcher: CollectingDispatcher,
#                         tracker: Tracker,
#                         domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         f = open('./data/data_db.json', encoding="utf8")
#         data = json.load(f)
#         # branch = tracker.get_latest_entity_values("branch", None)
#         branch= tracker.get_slot("branch")
#         print(f"slottt  {branch}")
#         dispatcher.utter_message(text=f"run action {branch} - {data['tuyen_sinh']['bac']['ma_truong']}")
#         f.close()

#         return [SlotSet("branch", "")]

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
