import React, {useContext} from 'react';
import { DispatchContext, UserStateContext } from "../../App";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function Profile() {
    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);

    console.log(userState)
    
    return (
      <div style={{ width: "100%", height: "100%", marginTop: 100 }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
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
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
}

export default Profile;