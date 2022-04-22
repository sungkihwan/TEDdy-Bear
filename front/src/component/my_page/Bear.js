import { useEffect, useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import { theme } from "../common/Style";

const textColor = { color: theme.brown.dark };

export default function Bear() {
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [cotton, setCotton] = useState(1000);
  let maxExp = level * 10;
  const [progress, setProgress] = useState(exp / maxExp);

  useEffect(() => {
    setProgress((exp / maxExp) * 100);
    if (exp === maxExp) {
      setExp(0);
      setProgress(0);
      setLevel((cur) => cur + 1);
      maxExp = level * 10;
    }
  }, [exp]);

  const click = () => {
    setExp((cur) => cur + 1);
    setCotton((cur) => cur - 1);
  };
  return (
    <div style={{ marginTop: "10vh" }}>
      <img src="/main2.png" alt="bear" style={{ height: "40vh" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ width: "50%" }}>
          <p style={textColor}>LEVEL {level}</p>
          <p style={textColor}>
            {exp} / {maxExp}
          </p>
          <ExpBar value={progress} />
        </div>
        <div>
          <p style={textColor}>남은 솜 : {cotton}</p>
          <ExpButton onClick={click}>솜 주기</ExpButton>
        </div>
      </div>
    </div>
  );
}

function ExpBar(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", marginRight: "3px" }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ExpButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  width: "8vw",
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: brown[100],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: brown[500],
  },
}));
