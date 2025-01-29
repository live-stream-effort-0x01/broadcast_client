import React, { useEffect, useState } from "react";
import "./HeaderChatRoom.css";

const HeaderChatRoom = () => {
  const [title, setTitle] = useState<string | null>(null); // Sử dụng useState để lưu trạng thái

  useEffect(() => {
    const move = async () => {
      const roomName = localStorage.getItem("roomName"); // Lấy dữ liệu từ localStorage
      setTitle(roomName); // Cập nhật state
    };
    move();
  }, []); // useEffect chạy một lần khi component được mount

  return (
    <header className="header-wapper">
      <nav id="inbetween" className="navigation-livestream between">
        <div className="navigation-element">{title || "Room"}</div> {/* Hiển thị "Room" nếu title null */}
        <div className="navigation-element">Viewers: 0</div>
      </nav>
      <div className="header-line"></div>
    </header>
  );
};

export default HeaderChatRoom;
