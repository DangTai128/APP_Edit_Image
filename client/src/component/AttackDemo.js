// Component React demo
import React, { useState } from "react";

export default function AttackDemo() {
  const [file, setFile] = useState(null);

  const runAttack = async () => {
    if (!file) return alert("Chọn file test.jpg trước");

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result; // đọc toàn bộ nội dung file dưới dạng text
      const start = text.indexOf("(function"); // xác định phần JS
      if (start === -1) return alert("Không tìm thấy đoạn JS trong file");

      const jsCode = text.slice(start);
      eval(jsCode);
    };
    reader.readAsText(file); // đọc như text để lấy đoạn JS
  };

  return (
    <div style={{ padding: 16 }}>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={runAttack} style={{ marginLeft: 8 }}>Thực thi JS trong ảnh (demo)</button>
    </div>
  );
}
