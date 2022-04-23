import { LinkPreview } from '@dhaiwat10/react-link-preview';
// import * as React, {useState} from 'react';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from 'react-lottie';
import data from './87670-satisfied-bear.json'

import LectureInfo from './LectureInfo'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height:300
}));

function LectureCard({lectureData, setLectureData}) {
  
  let lectureInfo = [...lectureData];
  console.log(lectureData)
  console.log(lectureInfo)

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

    const customFetcher = async (url) => {
      const response = await fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`);
      const json = await response.json();
      
      for (let i = 0; i < lectureData.length; i++) {
        if (lectureData[i].url === url) {
          // json.metadata.title = lectureData[i].title + ' - ' + lectureData[i].speaker;
          json.metadata.title = lectureData[i].title + ' - ';
          console.log(json.metadata.title);
          for (let j = 0; j < lectureData[i].speakers.length; j++) {
            json.metadata.title += lectureData[i].speakers[j];
            if (lectureData[i].speakers.length >= 2) {
              json.metadata.title += ', ';
            }
          }

          // 두 번째 방법 (수정 후)
          lectureInfo[i]['videoimg'] = json.metadata.image;
          break;
        }
      }

      json.metadata.description = ''
      return json.metadata;
    };
    
    

    return (
      <div style={{display: 'flex'}}>
        <div>
          <Lottie options={defaultOptions}
                height={350}
                width={350}/>
        </div>
        <div>
          <div style={{border:'2px solid black', width:'1100px', marginLeft:'60px', height:'410px'}}>
            <h1 style={{marginLeft:'25px'}}>추천된 영상</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    >
                    {lectureData.map((data, index) => (
                      <Grid item xs="auto"  key={index}>
                        <Item>
                          <div>
                            <LinkPreview url={data.url} fetcher={customFetcher} width='300px' height='250px' fallback={<div>Fallback</div>} />
                          </div>
                          <LectureInfo videoInfo={lectureInfo[index]}></LectureInfo>
                        </Item>
                      </Grid>
                    ))}
                </Grid>
            </Box>
          </div>
          <div style={{border:'2px solid black', width:'1100px', marginLeft:'60px', height:'410px'}}>
            <h1 style={{marginLeft:'25px'}}>오늘의 영상</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    >
                    {lectureData.map((data, index) => (
                      <Grid item xs="auto"  key={index}>
                        <Item>
                          <div>
                            <LinkPreview url={data.url} fetcher={customFetcher} width='300px' height='250px' fallback={<div>Fallback</div>} />
                          </div>
                          <LectureInfo ></LectureInfo>
                        </Item>
                      </Grid>
                    ))}
                </Grid>
            </Box>
          </div>
        </div>
      </div>
    );
  }

export default LectureCard
