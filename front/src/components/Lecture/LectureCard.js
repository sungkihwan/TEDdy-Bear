import { LinkPreview } from '@dhaiwat10/react-link-preview';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LectureInfo from './LectureInfo'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height:300
}));

function LectureCard({lectureData, type}) {
  
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
          <div style={{border:'2px solid black', width:'1100px', height:'410px'}}>
            <h1 style={{marginLeft:'25px'}}>{type}</h1>
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
      </>
    );
  }

export default LectureCard
