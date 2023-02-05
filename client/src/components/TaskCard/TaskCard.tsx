import React from "react";
import Tag from "../Tag/Tag";
import styles from "./TaskCard.module.scss";

let staticData: any = [
  {
    id: 1,
    name: "Work",
    color: "#B2AFA1",
  },
  {
    id: 2,
    name: "Home",
    color: "#D1E5F7",
  },
  {
    id: 3,
    name: "Work",
    color: "#FFCECE",
  },
  {
    id: 4,
    name: "Home",
    color: "#D2CEFF",
  },
  {
    id: 5,
    name: "Work",
    color: "#B2AFA1",
  },
  {
    id: 6,
    name: "Home",
    color: "#D1E5F7",
  },
  {
    id: 7,
    name: "Work",
    color: "#FFCECE",
  },
  {
    id: 8,
    name: "Home",
    color: "#D2CEFF",
  },
];

export default function TaskCard() {
  const [modal, setModal] = React.useState(false);

  const handleModalToggle = () => {
    setModal(!modal);
  };

  return (
    <div className={styles.card}>
      <h2>The title</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>

      <div className={styles.tags}>
        <div className={styles.tags}>
          {staticData.map((tag: any) => (
            <Tag key={tag.id} color={tag.color} />
          ))}
        </div>
      </div>

      <div className={styles.edit} onClick={handleModalToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={styles.editModal}
        style={{ display: modal ? "flex" : "none" }}
      >
        <span>Edit...</span>
        <hr />
        <span>Delete</span>
      </div>

      <div className={styles.checkBox}>
        <label>done</label>
        <input type="checkbox" />
      </div>
    </div>
  );
}
