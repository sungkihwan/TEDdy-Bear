import { useEffect, useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import { theme } from "../../../style/Style";
import * as Api from "../../../api";

const textColor = { color: theme.brown.dark };

/** Bear component
 *
 * @returns {component} My bear information
 */
export default function Bear({ isEditable, user }) {
  const [bear, setBear] = useState({
    cotton: user.cotton,
    height: user.height,
    level: user.level,
  });
  const [exp, setExp] = useState(0);
  let maxExp = bear.level * 10;
  const [progress, setProgress] = useState(exp / maxExp);

  //server bear data update
  const fetchBear = async () => {
    await Api.put(`users/${user.id}`, {
      cotton: bear.cotton,
      level: bear.level,
      height: bear.height,
    });
  };
  //if exp full, execute a function
  useEffect(() => {
    if (exp === maxExp) {
      setExp(0);
      setProgress(0);
      setBear((cur) => ({ ...cur, level: cur.level + 1 }));
      maxExp = bear.level * 10;
    }
    setProgress((exp / maxExp) * 100);
    fetchBear();
  }, [exp]);

  //click button, execute a function
  const click = async () => {
    if (bear.cotton === 0) {
      alert("솜이 부족합니다!");
      bear.cotton = 0;
    } else {
      setExp((cur) => cur + 1);
      setBear((cur) => ({ ...cur, cotton: cur.cotton - 1 }));
    }
    return;
  };

  return (
    <div>
      <img src="/mybear.png" alt="bear" style={{ height: "40vh" }} />
      {isEditable && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div style={{ width: "50%" }}>
            <p style={textColor}>LEVEL {bear.level}</p>
            <p style={textColor}>
              {exp} / {maxExp}
            </p>
            <ExpBar value={progress} />
          </div>
          <div>
            <p style={textColor}>남은 솜 : {bear.cotton}</p>
            <ExpButton onClick={click}>솜 주기</ExpButton>
          </div>
        </div>
      )}
      {!isEditable && (
        <>
          <p style={(textColor, { textAlign: "center" })}>LEVEL {bear.level}</p>
          <p style={(textColor, { textAlign: "center" })}>
            키 : {bear.height} cm
          </p>
        </>
      )}
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
