// import React, { useState } from "react";
// import "../styles/editForm.css";

// const EditForm = ({ onImageChange, isOpen, onClose, onSubmitEdit }) => {
//   const [formData, setFormData] = useState({
//     image: null,
//     resize: { width: "", height: "" },
//     rotate: "",
//     blur: "",
//     brightness: "",
//     contrast: "",
//     filter: "",
//     textOverlay: { text: "", x: "", y: "" },
//   });

//   const handleChange = (e, group = null) => {
//     const { name, value, type, checked, files } = e.target;

//     if (files) {
//       const file = files[0];
//       setFormData((prev) => ({ ...prev, image: file }));
//       if (onImageChange) {
//         onImageChange(file);
//       }
//     } else if (group) {
//       setFormData((prev) => ({
//         ...prev,
//         [group]: { ...prev[group], [name]: value },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//    e.preventDefault();
//     if (onSubmitEdit) {
//       await onSubmitEdit(formData);
//     }

//   const data = new FormData();
//   data.append("image", formData.image);
//   data.append("resize", JSON.stringify(formData.resize));
//   data.append("rotate", formData.rotate);
//   data.append("blur", formData.blur);
//   data.append("brightness", formData.brightness);
//   data.append("contrast", formData.contrast);
//   data.append("filter", formData.filter);
//   data.append("textOverlay", JSON.stringify(formData.textOverlay));

//   const res = await fetch("http://localhost:5000/api/image/edit", {
//     method: "POST",
//     body: data,
//   });

//   const blob = await res.blob();
//   const url = URL.createObjectURL(blob);
// };


//   return (
//     <form className={`edit-form ${isOpen ? "open" : ""}`} onSubmit={handleSubmit}>
//       {/* Nút đóng chỉ hiển thị trên mobile */}
//       <button type="button" className="close-btn" onClick={onClose}>
//         ×
//       </button>

//       <h2>Chỉnh sửa ảnh</h2>

//       {/* Tải ảnh */}
//       <label>Chọn ảnh</label>
//       <input type="file" name="image" onChange={handleChange} />

//       {/* Resize */}
//       <fieldset>
//         <legend>Thay đổi kích thước</legend>
//         <input
//           type="number"
//           name="width"
//           placeholder="Chiều rộng"
//           value={formData.resize.width}
//           onChange={(e) => handleChange(e, "resize")}
//         />
//         <input
//           type="number"
//           name="height"
//           placeholder="Chiều cao"
//           value={formData.resize.height}
//           onChange={(e) => handleChange(e, "resize")}
//         />
//       </fieldset>

//       {/* Rotate */}
//       <label>Xoay ảnh (độ)</label>
//       <input
//         type="number"
//         name="rotate"
//         value={formData.rotate}
//         onChange={handleChange}
//         placeholder="0, 90, 180..."
//       />

//       {/* Blur */}
//       <label>Làm mờ (kernel size)</label>
//       <input
//         type="number"
//         name="blur"
//         value={formData.blur}
//         onChange={handleChange}
//         placeholder="3, 5, 7..."
//       />

//       {/* Brightness & Contrast */}
//       <fieldset>
//         <legend>Độ sáng & tương phản</legend>
//         <input
//           type="number"
//           name="brightness"
//           value={formData.brightness}
//           onChange={handleChange}
//           placeholder="Brightness"
//         />
//         <input
//           type="number"
//           name="contrast"
//           value={formData.contrast}
//           onChange={handleChange}
//           placeholder="Contrast"
//         />
//       </fieldset>

//       <label>Bộ lọc ảnh</label>
//       <select name="filter" value={formData.filter} onChange={handleChange}>
//         <option value="">Không áp dụng</option>
//         <option value="invert">Đảo màu</option>
//         <option value="sepia">Sepia</option>
//         <option value="emboss">Emboss</option>
//         <option value="edge">Phát hiện cạnh</option>
//         <option value="warm">Tông ấm</option>
//         <option value="cool">Tông lạnh</option>
//         <option value="grayscale">Đen trắng</option>
//       </select>


//       {/* Thêm văn bản */}
//       <fieldset>
//         <legend>Thêm văn bản</legend>
//         <input
//           type="text"
//           name="text"
//           placeholder="Nội dung"
//           value={formData.textOverlay.text}
//           onChange={(e) => handleChange(e, "textOverlay")}
//         />
//         <input
//           type="number"
//           name="x"
//           placeholder="Vị trí X"
//           value={formData.textOverlay.x}
//           onChange={(e) => handleChange(e, "textOverlay")}
//         />
//         <input
//           type="number"
//           name="y"
//           placeholder="Vị trí Y"
//           value={formData.textOverlay.y}
//           onChange={(e) => handleChange(e, "textOverlay")}
//         />
//       </fieldset>

//       <button type="submit">Áp dụng chỉnh sửa</button>
//       <div className="save-continue-buttons">
//         <button type="button">Lưu</button>
//         <button type="button">Tiếp tục</button>
//       </div>
//     </form>
//   );
// };

// export default EditForm;


import React, { useState } from "react";
import "../styles/editForm.css";

const EditForm = ({ onImageChange, onEditComplete, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    resize: { width: "", height: "" },
    rotate: "",
    blur: "",
    brightness: "",
    contrast: "",
    filter: "",
    textOverlay: { text: "", x: "", y: "" },
  });

  const handleChange = (e, group = null) => {
    const { name, value, type, checked, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (onImageChange) {
        onImageChange(file);
      }
    } else if (group) {
      setFormData((prev) => ({
        ...prev,
        [group]: { ...prev[group], [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", formData.image);
    data.append("resize", JSON.stringify(formData.resize));
    data.append("rotate", formData.rotate);
    data.append("blur", formData.blur);
    data.append("brightness", formData.brightness);
    data.append("contrast", formData.contrast);
    data.append("filter", formData.filter);
    data.append("textOverlay", JSON.stringify(formData.textOverlay));

    try {
      const res = await fetch("http://localhost:5000/api/image/edit", {
        method: "POST",
        body: data,
      });

      const blob = await res.blob();
      if (onEditComplete) {
        onEditComplete(blob);
      }
    } catch (err) {
      console.error("Lỗi xử lý ảnh:", err);
    }
  };

  return (
    <form className={`edit-form ${isOpen ? "open" : ""}`} onSubmit={handleSubmit}>
      <button type="button" className="close-btn" onClick={onClose}>×</button>
      <h2>Chỉnh sửa ảnh</h2>

      <label>Chọn ảnh</label>
      <input type="file" name="image" onChange={handleChange} />

      <fieldset>
        <legend>Thay đổi kích thước</legend>
        <input type="number" name="width" placeholder="Chiều rộng" value={formData.resize.width} onChange={(e) => handleChange(e, "resize")} />
        <input type="number" name="height" placeholder="Chiều cao" value={formData.resize.height} onChange={(e) => handleChange(e, "resize")} />
      </fieldset>

      <label>Xoay ảnh (độ)</label>
      <input type="number" name="rotate" value={formData.rotate} onChange={handleChange} placeholder="0, 90, 180..." />

      <label>Làm mờ (kernel size)</label>
      <input type="number" name="blur" value={formData.blur} onChange={handleChange} placeholder="3, 5, 7..." />

      <fieldset>
        <legend>Độ sáng & tương phản</legend>
        <input type="number" name="brightness" value={formData.brightness} onChange={handleChange} placeholder="Brightness" />
        <input type="number" name="contrast" value={formData.contrast} onChange={handleChange} placeholder="Contrast" />
      </fieldset>

      <label>Bộ lọc ảnh</label>
      <select name="filter" value={formData.filter} onChange={handleChange}>
        <option value="">Không áp dụng</option>
        <option value="invert">Đảo màu</option>
        <option value="sepia">Sepia</option>
        <option value="emboss">Emboss</option>
        <option value="edge">Phát hiện cạnh</option>
        <option value="warm">Tông ấm</option>
        <option value="cool">Tông lạnh</option>
        <option value="grayscale">Đen trắng</option>
      </select>

      <fieldset>
        <legend>Thêm văn bản</legend>
        <input type="text" name="text" placeholder="Nội dung" value={formData.textOverlay.text} onChange={(e) => handleChange(e, "textOverlay")} />
        <input type="number" name="x" placeholder="Vị trí X" value={formData.textOverlay.x} onChange={(e) => handleChange(e, "textOverlay")} />
        <input type="number" name="y" placeholder="Vị trí Y" value={formData.textOverlay.y} onChange={(e) => handleChange(e, "textOverlay")} />
      </fieldset>

      <button type="submit">Áp dụng chỉnh sửa</button>
      <div className="save-continue-buttons">
        <button type="button">Lưu</button>
        <button type="button">Tiếp tục</button>
      </div>
    </form>
  );
};

export default EditForm;
