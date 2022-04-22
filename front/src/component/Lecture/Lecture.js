import React, {useState} from 'react';
import LectureCard from './LectureCard'

function Lecture() {
  const [lectureData, setLectureData] = useState([
    {
      url:'https://ted.com/talks/al_gore_averting_the_climate_crisis',
      title:'앨 고어, 기후 변화 위기를 막으려면',
      speaker:'Al Gore',
      description:'영화 에서 보여준 유머와 인류애로, 하이브리드 자동차를 구입하는 것부터 지구 온난화의 새로운 브랜드 네임을 만드는 것에 이르기까지, 개개인이 바로 지구 온난화에 대응할 수 있는 15가지 방법을 앨 고어가 제시한다.'
    },
    {
      url:'https://ted.com/talks/david_pogue_simplicity_sells',
      title:'데이빗 포그의 "단순함이 통한다"',
      speaker:'David Pogue',
      description:'뉴욕타임즈의 칼럼 기고가인 데이빗 포그가 \'최악의 인터페이스 디자인\'에 대해 힐난하고, 잘 디자인 된 제품들에 대해 보여줍니다. 감정을 노래로 분출하는 재미있는 영상입니다.'
    },
    {
      url:'https://ted.com/talks/majora_carter_greening_the_ghetto',
      title:'마조라 카터의 도시 재개발 이야기',
      speaker:'Majora Carter',
      description:'맥아더상 수상자인 행동주의자 마조라 카터가 사우스 브롱스에서 정의를 지켜나가는 싸움을 감성적인 내용으로 강의한다. 또한 문제투성이인 도시 개발 정책 때문에 힘들어하는 소수민족 이웃들의 모습도 그려낸다.'
    },
    {
      url:'https://ted.com/talks/sir_ken_robinson_do_schools_kill_creativity',
      title:'학교가 창의력을 죽인다',
      speaker:'Sir Ken Robinson',
      description:'창의력을 억누르기 보다는 키워줄 수 있는 교육제도를 만드는 것에 대한 켄 로빈슨의 흥미롭고 감동적인 강연입니다.'
    },
    // {
    //   url:'https://ted.com/talks/hans_rosling_the_best_stats_you_ve_ever_seen',
    //   title:'한스 로슬링이 이제껏 보지 못했던 최고의 통계를 보여준다.',
    //   speaker:'Hans Rosling',
    //   description:'이 같은 데이터를 본 적이 없을 것이다. 드라마틱한 이야기 전개와 스포츠 캐스터 같은 열의있는 발표를 통해, 통계 전문가 한스 로슬링이 소위 말하는 개발 도상국에 관한 통계를 완전 해부한다.'
    // },
  ])

  return (
    <div>
      <LectureCard lectureData={lectureData} setLectureData={setLectureData}></LectureCard>
    </div>
  );
}

export default Lecture;
