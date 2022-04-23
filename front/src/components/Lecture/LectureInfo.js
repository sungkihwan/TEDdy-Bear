import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Icon from '@mui/material/Icon';
import { loadCSS } from 'fg-loadcss';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function LectureInfo({videoInfo}) {
    useEffect(() => {
        const node = loadCSS(
          'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
          // Inject before JSS
          document.querySelector('#font-awesome-css') || document.head.firstChild,
        );
        return () => {
          node.parentNode.removeChild(node);
        };
    }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
        <div style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', cursor:'pointer'}} onClick={handleOpen}>
            <h3>자세히 보기</h3>
            <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} />
        </div>
        {open && (
            <div>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <img style={{width: '100%'}} src={videoInfo.videoimg} alt="cat" />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    강연 주제 : {videoInfo.title}
                    <br></br>
                    연사 : {videoInfo.speakers.join(', ')}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    요약 : {videoInfo.description}
                    </Typography>
                    <PlayCircleIcon color="primary" sx={{ fontSize: 30 }} style={{cursor:'pointer'}} onClick={() => window.open(videoInfo.url , '_blank')}></PlayCircleIcon>
                </Box>
                </Modal>
            </div>
        )}
    </>
    
  );
}

export default LectureInfo;