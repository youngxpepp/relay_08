import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tag from "./Tag";

export default function List(props) {
  const { name, content, tagList, tagFilter, setTagFilter } = props;
  const [isShowAll, setIsShowAll] = useState(false);

  const isPostClick = () => {
    setIsShowAll(true);
  };

  return (
    <PostWrapper onClick={isPostClick}>
      <UserInformation>{name}</UserInformation>
      <p>{!isShowAll && content.length >= 20 ? content.substr(0, 30) + "...더보기" : content}</p>
      <PostTagList>
        {tagList.map((tag) => {
          return <Tag tag={tag} tagFilter={tagFilter} setTagFilter={setTagFilter} />;
        })}
      </PostTagList>
    </PostWrapper>
  );
}

const PostWrapper = styled.div`
  border: 1px solid #aaa;
  margin-top: 10px;
  padding: 10px;
  &:hover {
    background: #eee;
  }
`;

const UserInformation = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: black;
  display: flex;
  margin-bottom: 5px;
`;

const PostTagList = styled.div`
  align-items: center;
  display: flex;
  padding: 5px;
`;
