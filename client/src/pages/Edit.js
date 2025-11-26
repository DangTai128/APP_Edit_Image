import React, { useState } from "react";
import Header from "../component/header";
import SidebarTabs from "../component/sideBar";
import EditForm from "../component/editForm";
import "../styles/edit.css";

const Edit = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedBlob, setEditedBlob] = useState(null);

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
            setEditedBlob(blob);
            setIsFormOpen(false);
          }
        }}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editedBlob={editedBlob}
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
