import React, { useEffect, useState } from "react";
import { getBroadcasts } from "~/lib/services/broadcasts"; // Giữ nguyên logic gọi API
import Card from "../Card/Card"; // Component Card
import "./ListCard.css";

const ListCard = () => {
  const [broadcasts, setBroadcasts] = useState([]);

  // Fetch data từ API khi component được mount
  useEffect(() => {
    const fetchBroadcasts = async () => {
      const data = await getBroadcasts();
      setBroadcasts(data || []); // Đảm bảo dữ liệu là mảng nếu API trả về null hoặc undefined
    };
    fetchBroadcasts();
  }, []);

  return (
    <div className="list-warper">
      <div className="list-top">
        <span className="list-top-title green bold">Live Channels</span>
        <span className="list-top-title black">you might be interested in</span>
      </div>
      <div className="list-main">
        {/* Render danh sách các Card */}
        {broadcasts.map((item, index) => (
          <Card key={index} props={item} />
        ))}
      </div>
      <div className="list-bottom">
        <span className="line-list"></span>
        <span className="list-bottom-title">Show more</span>
        <svg
          fill="currentColor"
          strokeWidth="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          style={{ overflow: "visible", color: "#03AD5F" }}
        >
          <path
            fill="currentColor"
            d="m12 13.171 4.95-4.95 1.414 1.415L12 16 5.636 9.636 7.05 8.222l4.95 4.95Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ListCard;