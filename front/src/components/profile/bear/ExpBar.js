import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BorderLinearProgress } from "../styles/Style";

/** exp bar component
 *
 * @param {object} props
 * @returns {component} exp bar
 */
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

export default ExpBar;
