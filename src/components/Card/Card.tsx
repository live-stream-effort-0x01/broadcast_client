import { createSignal } from "solid-js";
import "./Card.css";
import { FiBookmark } from "solid-icons/fi";
import { FaSolidBookmark } from "solid-icons/fa";
import { TbMovie } from "solid-icons/tb";
export default function Card(props: any) {
  const name: string = props?.props?.name;
  const type: string = props?.props?.type;
  const seri: string = props?.props?.seri;
  const img: string = props?.props?.img;
  const year: string = props?.props?.year;
  const icon: any = props?.props?.icon;
  const [like, setLike] = createSignal(true);

  return (
    <div class="card-wapper">
      <div class="card-image">
        <img
          alt=""
          src={
            img
              ? img
              : "https://cdn.tuoitre.vn/thumb_w/640/2021/9/23/maxresdefault-1632364307368131537391.jpeg"
          }
        ></img>
        <div class="card-favourite" onClick={() => setLike(!like())}>
          {like() ? <FaSolidBookmark /> : <FiBookmark />}
        </div>
      </div>
      <div class="card-title">
        <p class="card-year">{year ? year : "2023"}</p>
        <p class="dot"></p>
        <p class="card-seri">
          {icon ? icon : <TbMovie />} {seri ? seri : "Movie"}
        </p>
        <p class="dot"></p>
        <p class="card-type">{type ? type : "PG"}</p>
      </div>
      <div class="card-name"> {name}</div>
    </div>
  );
}
