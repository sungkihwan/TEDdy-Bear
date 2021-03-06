import Description1 from "./Description1";
import Description2 from "./Description2";
import Description3 from "./Description3";
import Description4 from "./Description4";

/** Main pages component
 *
 * @returns {component} Main page
 */
export default function Main() {
  return (
    <>
      <div style={{ position: "relative", marginTop: "10vh" }}>
        <Description1 />
        <Description2 />
        <Description3 />
        <Description4 />
      </div>
    </>
  );
}
