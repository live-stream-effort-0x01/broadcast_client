import React, { useState } from 'react';
import './Card.css';
import { FiBookmark } from 'react-icons/fi'; // Cập nhật import từ solid-icons sang react-icons
import { FaSolidBookmark } from 'react-icons/fa'; // Cập nhật import từ solid-icons sang react-icons
import { TbMovie } from 'react-icons/tb'; // Cập nhật import từ solid-icons sang react-icons

interface CardProps {
  props: {
    name: string;
    type: string;
    seri: string;
    img: string;
    year: string;
    description: string;
    icon: any;
  };
}

const Card: React.FC<CardProps> = ({ props }) => {
  const { name, type, seri, img, year, description, icon } = props;
  const [live, setLive] = useState<boolean>(true);

  return (
    <div className="card-wapper">
      <div className="card-image">
        <img
          alt=""
          src={
            img
              ? img
              : 'https://www.lacremedugaming.fr/wp-content/uploads/creme-gaming/2023/02/amouranth-dit-que-la-vie-est-meilleure-apres-avoir-echange.-646x410.jpg'
          }
        />
        <div className="card-favourite">
          {live ? <span className="red-point"></span> : <span className="none"></span>}
        </div>
        <div className="card-views">
          {live ? <span className="card-views-count">2.5k Views</span> : <span className="none"></span>}
        </div>
      </div>
      <div className="card-title">
        <div className="card-title-left">
          <img
            src="https://cdn-i.vtcnews.vn/files/f2/2016/03/13/than-hinh-boc-lua-cua-5-nu-dj-nong-bong-nhat-1.jpg"
            alt=""
            className="card-title-avatar"
          />
          <div className="card-title-content">
            <div className="card-name">{name}</div>
            <div className="card-price">$ 5.99</div>
            <div className="card-desc">sweetiefox</div>
          </div>
        </div>
        <div className="card-title-right">
          <svg
            fill="currentColor"
            strokeWidth="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            style={{ overflow: 'visible', color: '#02ad3b' }}
          >
            <path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm64 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zm384 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card;