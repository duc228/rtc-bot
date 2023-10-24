type Props = {};

export const NewsItem = (props: Props) => {
  return (
    <div className="w-full h-48  flex gap-6">
      <div className="w-64">
        <img
          className="h-full w-full object-cover"
          src="https://ptithcm.edu.vn/wp-content/uploads/2023/10/TuyenSinhTrinhDoTienSi.pnp-1-350x250.png"
        />
      </div>
      <div className="h-full text-sm flex-1">
        <p className="uppercase text-xl mb-3">
          THÔNG BÁO TUYỂN SINH TRÌNH ĐỘ TIẾN SĨ ĐỢT 2 NĂM 2023
        </p>
        <p className="uppercase mb-3 text-xs">BỞI HẢI LÝ 17/10/2023 0</p>
        <p className="normal-case break-all ">
          Căn cứ Thông tư số 18/2021/TT-BGDĐT ngày 28/06/2021 của Bộ trưởng Bộ
          Giáo dục và Đào tạo về việc ban hành Quy chế tuyển sinh và đào tạo
          trình độ tiến sĩ; Căn cứ Quyết định số 555/QĐ-HV ngày 22/04/2022 của
          Giám đốc Học viện Công nghệ Bưu chính Viễn thông...
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
