import React, { useRef, useEffect } from "react";
import styled from "styled-components";

// 태그 배경 색의 목록
const colorList = [
  "#fe4365",
  "#fc9d9a",
  "#f9cdad",
  "#D499B9",
  "#9055A2",
  "#6f2108",
  "indigo",
  "skyblue",
  "#011638",
  "#c8c8a9",
  "#f94e3f",
  "#e77e4d",
  "crimson",
  "hotpink",
  "#2E294E",
  "coral",
  "blueViolet",
  "gold",
  "#e3632d",
];

const BUCKET_SIZE = colorList.length;

function hashFunction(key) {
  const keyToNumber = key
    .toString()
    .split("")
    .map((word) => word.charCodeAt(0))
    .reduce((a, b) => a + b);
  return keyToNumber % BUCKET_SIZE;
}

export default function Tag({ tag, tagFilter, setTagFilter }) {
  const tagRef = useRef(null);

  useEffect(() => {
    let index = Math.floor(Math.random() * colorList.length);
    tagRef.current.style.background = colorList[hashFunction(tag)];
  }, []);

  // 필터를 추가
  const addTagFilter = () => {
    setTagFilter(tag);
  };
  return (
    <TagBox ref={tagRef} onClick={addTagFilter}>
      <TagContent>{tag}</TagContent>
    </TagBox>
  );
}

const TagBox = styled.div`
  border-radius: 10px;
  margin: 2px;
  height: fit-content;
  width: fit - content;
  background: skyblue;
  padding: 2px 8px 2px 8px;
`;

const TagContent = styled.p`
  font-weight: bold;
  font-size: 15px;
  color: ivory;
  width: fit-content;
  margin: 0;
`;
