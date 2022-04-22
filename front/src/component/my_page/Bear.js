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

/** Bear component
 *
 * @returns {component} My bear information
 */
export default function Bear() {
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [cotton, setCotton] = useState(11);
  let maxExp = level * 10;
  const [progress, setProgress] = useState(exp / maxExp);

  //if exp full, execute a function
  useEffect(() => {
    if (exp === maxExp) {
      setExp(0);
      setProgress(0);
      setLevel((cur) => cur + 1);
      maxExp = level * 10;
    }
  }, [exp]);

  //click button, execute a function
  const click = () => {
    if (cotton === 0) {
      alert("솜이 부족합니다!");
      return;
    }
    setExp((cur) => cur + 1);
    setCotton((cur) => cur - 1);
    setProgress((exp / maxExp) * 100);
  };
  return (
    <div style={{ marginTop: "10vh" }}>
      <div style={{ textAlign: "center" }}>곰 이름</div>
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

//exp bar component
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

//button style
const ExpButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  width: "8vw",
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

//bar style
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
