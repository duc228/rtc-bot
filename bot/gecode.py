

if __name__ == '__main__':
    namhoc_data = ["2023", "2022", "2021", "2020", "2019"]
    ten_nganh_co_dau = [
        ["cntt", "IT", "it",  "công nghệ thông tin",],
        ["ktdtvt", "kỹ thuật điện tử viễn thông"],
        ["ktddt","kỹ thuật điện điện tử","kỹ thuật điện điện tử","kỹ thuật điện tử"],
        ["attt","an toàn thông tin","An toàn thông tin"],
        ["ktdkvtdh","kỹ thuật điều khiển và tự động hoá","Kỹ thuật điều khiển và tự động hoá"],
        ["iot","công nghệ internet vạn vật","công nghệ internet iot","Công nghệ internet iot","Công nghệ internet vạn vật"],
        ["cndpt","công nghệ đa phương tiện","Công nghệ đa phương tiện"],
        ["qtkd","quản trị kinh doanh","Quản trị kinh doanh"],
        ["mkt","marketing","Marketing"],
        ["kt","kế toán","Kế toán"],
    ]
    ten_co_dau =          ["kt","kế toán","Kế toán"]
    ten_nganh_ko_dau = [
        ["cntt", "it", "cong nghe thong tin", "Cong nghe thong tin"],
        ["ktdtvt", "Ky thuat dien tu vien thong", "ky thuat dien tu vien thong"],
        ["ktddt","ky thuat dien dien tu","ky thuat dien tu"],
        ["attt","an toan thong tin","An toan thong tin"],
        ["ktdkvtdh","ky thuat dieu khien va tu dong hoa","ky thuat dieu khien va tu dong hoa",],
        ["iot","cong nghe internet van vat","cong nghe internet iot","Công nghệ internet iot"],
        ["cndpt","cong nghe da phuong tien","Cong nghe da phuong tien"],
        ["qtkd","quan tri kinh doanh","quản trị kinh doanh","Quan tri kinh doanh"],
        ["mkt","marketing","Marketing"],
        ["kt","ke toan","Ke toan"],
    ]
    ten_ko_dau =       ["kt","ke toan","Ke toan"]

    et_nganh = ["cntt", "ktdtvt", "ktddt", "attt" , "ktdkvtdh", "iot", "cndpt", "qtkd", "mkt", "kt"]
    ex_co_dau = ['[giới thiệu]{"entity":"thongtinphu","value":"tong_quan"} về ngành', '[cho em hỏi]{"entity":"thongtinphu","value":"tong_quan"} về ngành', '[em muốn biết]{"entity":"thongtinphu","value":"tong_quan"} về ngành','[em muốn hỏi]{"entity":"thongtinphu","value":"tong_quan"} về ngành']
    ex_ko_dau = ['[gioi thieu]{"entity":"thongtinphu","value":"tong_quan"} ve nganh', '[cho em hoi]{"entity":"thongtinphu","value":"tong_quan"} ve nganh', '[em muon biet]{"entity":"thongtinphu","value":"tong_quan"} ve nganh', '[em muon hoi]{"entity":"thongtinphu","value":"tong_quan"} ve nganh']
    # nganh= ["cntt", "IT", "it", "cong nghe thong tin","CNTT", "công nghệ thông tin", "CÔNG NGHỆ THÔNG TIN", "Cong nghe thong tin"]

    '''
        giới thiệu về ngành
        gioi thieu ve nganh
        cho em hỏi về ngành
        cho em hoi ve nganh
        em muốn biết về ngành
        em muon biet ve nganh
        em muốn hỏi về ngành
        em muon hoi ve nganh
    '''

    print(f'\n\n')
    # for et in et_nganh:
    for ex in ex_co_dau:
        for ten in ten_co_dau:
            print(f'- {ex} [{ten}]{{"entity":"thongtinchinh","value":"kt"}}')
    
    for ex in ex_ko_dau:
        for ten in ten_ko_dau:
            print(f'- {ex} [{ten}]{{"entity":"thongtinchinh","value":"kt"}}')
    print("\n") 
        

            
    print("ok")