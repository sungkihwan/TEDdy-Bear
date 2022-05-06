import MainContent1 from "./MainContent1";
import MainContent2 from "./MainContent2";
import MainContent3 from "./MainContent3";
import MainContent4 from "./MainContent4";
import { MainPage } from "./styles/Style";

/** Main pages component
 *
 * @returns {component} Main page
 */
export default function Main() {
  return (
    <MainPage>
      <MainContent1 />
      <MainContent2 />
      <MainContent3 />
      <MainContent4 />
    </MainPage>
  );
}
