import React, {useContext, useEffect, useState} from 'react';
import { DispatchContext, UserStateContext } from "../../App";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Api from '../../api';
import LectureCard from '../Lecture/LectureCard';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import ProfileEdit from './ProfileEdit';

function Profile() {
    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);
    const [recentLecture, setRecentLecture] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        Api.get('talks/today','?size=12')
          .then(res => setRecentLecture(res.data));
      }, []);
    
    return (
      <>
          <div style={{display:'flex', marginTop: 100, justifyContent: 'center'}}>
              <div style={{marginTop:10, width: 500, height: "100%" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image="squirrel.png"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      이름 : {userState.user.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      테디베어 : {userState.user.bearName}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {userState.user.myTopics.length !== 0 &&
                          userState.user.myTopics.map((data, index) => (
                            <Chip key={index} label={data} color="primary" />))}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      이메일 : {userState.user.email}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleOpen}>회원 정보 수정</Button>
                    <Button size="small">회원 탈퇴</Button>
                  </CardActions>
                </Card>
              </div>
              <div style={{width:'80%', height:500}}>
                <LectureCard lectureData={recentLecture} type="최근 시청기록"></LectureCard>
              </div>
              {open && <ProfileEdit open={open} handleClose={handleClose} userid={userState.id}></ProfileEdit>}
          </div>
      </>
    );
}

export default Profile;