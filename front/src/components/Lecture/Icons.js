import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { loadCSS } from 'fg-loadcss';
import React, {useState, useEffect} from 'react';

function Icons() {
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
    const [star, setStar] = useState(true);
    const [heart, setHeart] = useState(true);
    return (
        <div>
            {star ? <FavoriteIcon sx={{ color:"#e91e63", fontSize: 40, cursor:'pointer' }}></FavoriteIcon> : <FavoriteIcon sx={{ color:"#D7CCC8", fontSize: 40, cursor:'pointer' }}></FavoriteIcon>}
            {heart ? <StarIcon sx={{ color: '#EAE10B', fontSize: 40, cursor:'pointer' }}></StarIcon> : <StarIcon sx={{ color: '#D7CCC8', fontSize: 40, cursor:'pointer' }}></StarIcon>}
        </div>
    )    
}

export default Icons;