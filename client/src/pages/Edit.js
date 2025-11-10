// import React, { useState, useEffect } from "react";
// import Header from "../component/header";
// import SidebarTabs from "../component/sideBar";
// import EditForm from "../component/editForm";
// import "../styles/edit.css";


// const Edit = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false); // trạng thái mở/đóng form
//   const handleImageChange = (file) => {
//     const imageUrl = URL.createObjectURL(file);
//     setSelectedImage(imageUrl);
//   };
//   const handleSubmitEdit = async (formData) => {
//   const data = new FormData();
//   data.append("image",formData.image);
//   data.append("resize", JSON.stringify(formData.resize));
//   data.append("rotate", formData.rotate);
//   data.append("blur", formData.blur);
//   data.append("brightness", formData.brightness);
//   data.append("contrast", formData.contrast);
//   data.append("filter", formData.filter);
//   data.append("textOverlay", JSON.stringify(formData.textOverlay));

//   try {
//     const res = await fetch("http://localhost:5000/api/image/edit", {
//       method: "POST",
//       body: data,
//     });

//     const blob = await res.blob();
//     const imageUrl = URL.createObjectURL(blob);
//     setSelectedImage(imageUrl); // cập nhật ảnh đã xử lý
//     setIsFormOpen(false); // đóng form sau khi xử lý
//   } catch (err) {
//     console.error("Lỗi xử lý ảnh:", err);
//   }
// };


//   return (
//     <>
//       <Header />
//       <SidebarTabs />

//       {/* Nút mở form trên giao diện di động */}
//       {!isFormOpen && (
//         <button className="open-form-btn" onClick={() => setIsFormOpen(true)}>
//           ✏️
//         </button>
//       )}

//       {/* Form chỉnh sửa ảnh */}
//       <EditForm
//         onImageChange={handleImageChange}
//         isOpen={isFormOpen}
//         onClose={() => setIsFormOpen(false)}
//         onSubmitEdit={handleSubmitEdit}
//         setSelectedImage = {selectedImage}
//       />


//       <div className="edit-center">
//         <div className="inner-box">
//           {!selectedImage ? (
//             <>
//               <h2>Vùng chỉnh sửa</h2>
//               <p>Đây là nơi bạn có thể chỉnh sửa thông tin ảnh.</p>
//             </>
//           ) : (
//             <div className="image-preview-box">
//               <img
//                 src={selectedImage}
//                 alt="Ảnh đã chọn"
//                 className="preview-image"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Edit;

import React, { useState } from "react";
import Header from "../component/header";
import SidebarTabs from "../component/sideBar";
import EditForm from "../component/editForm";
import "../styles/edit.css";

const Edit = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const displayImage = editedImage || originalImage;

  return (
    <>
      <Header />
      <SidebarTabs />

      {!isFormOpen && (
        <button className="open-form-btn" onClick={() => setIsFormOpen(true)}>
          ✏️
        </button>
      )}

      <EditForm
        onImageChange={(file) => {
          if (file) {
            const url = URL.createObjectURL(file);
            setOriginalImage(url);
          }
        }}
        onEditComplete={(blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setEditedImage(url);
            setIsFormOpen(false);
          }
        }}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <div className="edit-center">
        <div className="inner-box">
          {!displayImage ? (
            <>
              <h2>Vùng chỉnh sửa</h2>
              <p>Đây là nơi bạn có thể chỉnh sửa thông tin ảnh.</p>
            </>
          ) : (
            <div className="image-preview-box">
              <img
                src={displayImage}
                alt="Ảnh hiển thị"
                className="preview-image"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
