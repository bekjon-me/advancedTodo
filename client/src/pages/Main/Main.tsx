import React from "react";
import styles from "./Main.module.scss";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";

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

export default function Main() {
  const handleAddTask = () => {
    console.log("Add task");
  };

  return (
    <div className={`container ${styles.main}`}>
      <Header />
      <Button className={styles.addBtn} onClick={handleAddTask}>
        Add something
      </Button>

      <div className={styles.tags}>
        {staticData.map((tag: any) => (
          <Tag key={tag.id} name={tag.name} color={tag.color} />
        ))}
      </div>
    </div>
  );
}
