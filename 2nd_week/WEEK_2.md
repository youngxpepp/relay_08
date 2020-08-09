# Relay08

## 2nd Week

- 참가자

  - J015*권순주
    J016*권영길
    J053*김종은
    J054*김진관
    J089*박지홍
    J090*박진영
    J126*유진우
    J127*유현우
    J164*이청명
    J165*이한주
    J202*차효준
    J203*최기환

- **Front-end**

  1. 자연어 처리된 태그 값을 이용하여 `사연게시판 카테고리화`
  1. `카테고리별 필터링`

     ![사연게시판](https://github.com/boostcamp-2020/relay_08/raw/master/%EA%B8%B0%ED%9A%8D%EC%84%9C/img/board.png)

  - `React` 기반 (npm install -> npm run start)
  - 자연어 처리된 `.csv 파일`을 읽어와 리스트화
    (\*server 및 back-end 미존재)
  - `papaparse` 이용 .csv 로딩

https://www.notion.so/week2-Relay-08-e933c71e08e743398b39cce20305d3c0

## Python Docker 설정 부분

### pull&run image

docker pull chahtk/aipart
docker run -it -e LC_ALL=C.UTF-8 --rm chahtk/aipart bash

### in docker

cd gitworks
cd Mecag-ko-for-Google-Colab
python3.7 nlp.py

## 프론트 실행 부분

```
npm install 으로 노드 패키지 모듈 설치
npm run start 로 실행

```
