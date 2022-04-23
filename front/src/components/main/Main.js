import Header from "../Header";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

/** Main pages component
 *
 * @returns {component} Main page
 */
export default function Main() {
  return (
    <>
      <div style={{ position: "relative", marginTop: "10vh" }}>
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
      </div>
    </>
  );
}
