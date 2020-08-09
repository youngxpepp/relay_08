import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Post from "./Sections/Post";
import Tag from "./Sections/Tag";
import Papa from "papaparse";
​
const postList = [
  {
    name: "유진우",
    content: "안녕하세요",
    tagList: ["안녕", "하세요", "하하"],
  },
  {
    name: "최기환",
    content: "사연입니다 ㅠㅠ",
    tagList: ["안녕", "하십니까"],
  },
  {
    name: "최기환",
    content: "너무 슬픈 사연입니다 ㅠㅠ",
    tagList: ["감사", "하세요"],
  },
  {
    name: "최기환",
    content: "즐거운 사연입니다 ^^",
    tagList: ["잘가", "하세요"],
  },
  {
    name: "최기환",
    content:
      "하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요하하하 너무 행복해요",
    tagList: ["안녕", "안냥"],
  },
];
​
const MAX_LENGTH = 10;
​
export default function List() {
  const [tagFilter, setTagFilter] = useState(null);
  // csv -> json or array로 변환한 파일을 저장할 state
  const [data, setData] = useState([]);
​
  // 배열을 오브젝트로 변경
  const arrToObj = (arr) =>
    arr
      .map((element, index, ar) => {
        if (index != 0 && index != ar.length -1)
          return new Object({
            name: element[1],
            content: element[2],
            tagList: element[3] ? element[3].split(/\s/) : []
          });
      })
      .splice(1, arr.length - 2);
​
  // csv를 object 파일로 변환
  const fetchCsv = () => {
    return fetch("/tag_contents.csv").then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder("utf-8");
      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  };
​
  useEffect(() => {
    getCsvData();
  }, []);
​
  const getData = (result) => {
    console.log(arrToObj(result.data));
    setData(arrToObj(result.data));
  };
​
  const getCsvData = async () => {
    let csvData = await fetchCsv();
    Papa.parse(csvData, {
      complete: getData,
    });
  };
​
  const tagListAll = (postList) => {
    let notDupTag = new Set();
    postList.map((post) => {
      post.tagList.map((tag) => {
        notDupTag.add(tag);
      });
    });
    return [...notDupTag];
  };
​
  // 태그에 숫자를 부여
​
  const addTagNumber = (os) => {
    let tagMap = new Map();
    let cnt = 0;
    for (let o of os) {
      let tagNumber = [];
      for (let d of o.tagList) {
        if (!tagMap.has(d)) {
          tagMap.set(d, cnt % MAX_LENGTH);
          cnt++;
        }
        tagNumber.push(tagMap.get(d));
      }
      o.tagNum = tagNumber;
    }
    return os;
  };
​
  console.log(addTagNumber(data));
​
  return (
    <Wrapper>
      <Title>사연게시판</Title>
      <Content>
        <PostList>
          {addTagNumber(data).map((post) => {
            if (tagFilter && !post.tagList.includes(tagFilter)) {
              return <div></div>;
            }
            return <Post {...post} tagFilter={tagFilter} setTagFilter={setTagFilter} />;
          })}
        </PostList>
        <TagList>
          {tagListAll(addTagNumber(data)).map((tag) => {
            return <Tag tag={tag} tagFilter={tagFilter} setTagFilter={setTagFilter} />;
          })}
        </TagList>
      </Content>
    </Wrapper>
  );
}
​
const Wrapper = styled.div`
  padding-top: 5%;
  padding-left: 30%;
  padding-right: 30%;
`;
​
const Content = styled.div`
  display: flex;
`;
​
const PostList = styled.div`
  width: 60%;
  border: 2px black solid;
  padding: 0 10px 10px 10px;
`;
​
const TagList = styled.div`
  padding: 15px;
  border: 2px black solid;
  width: 30%;
  margin-left: 10px;
`;
​
const Title = styled.div`
  text-align: center;
  font-size: 50px;
  margin: 30px;
  padding-right: 90px;
`;