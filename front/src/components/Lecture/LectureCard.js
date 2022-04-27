import Carousel from 'react-elastic-carousel'
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LectureInfo from './LectureInfo'
import './lecture.css'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:300,
    marginBottom:10
  }));
  
  function LectureCard({lectureData, type, cname=""}) {
    let lectureInfo = [...lectureData];
  
    const customFetcher = async (url) => {
      const response = await fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`);
      const json = await response.json();
      
      for (let i = 0; i < lectureData.length; i++) {
        if (lectureData[i].url === url) {
          json.metadata.title = lectureData[i].title + ' - ';
          for (let j = 0; j < lectureData[i].speakers.length; j++) {
            json.metadata.title += lectureData[i].speakers[j];
            if (lectureData[i].speakers.length >= 2) {
              json.metadata.title += ', ';
            }
          }
          lectureInfo[i]['videoimg'] = json.metadata.image;
          break;
        }
      }
  
      json.metadata.description = ''
      return json.metadata;
    };
      
  
      return (
        <>
            <div style={{width:'100%', height:'500px'}}>
              <div className={cname}>
                <h1 style={{marginLeft:'20px', verticalAlign: 'middle'}}>{type}</h1>
              </div>
              <Carousel itemsToShow={3}>
                {lectureData.map((data, index) => (
                  <Item key={index}>  
                    <div>
                      <LinkPreview url={data.url} fetcher={customFetcher} width='300px' height='250px' fallback={<div>Fallback</div>} />
                    </div>
                    <LectureInfo videoInfo={lectureInfo[index]}></LectureInfo>
                  </Item>
                ))}
              </Carousel>
            </div>
        </>
      );
    }
  
  export default LectureCard

  // bearname 추천 영상