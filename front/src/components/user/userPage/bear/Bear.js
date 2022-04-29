import MyBear from "./MyBear";
import UserBear from "./UserBear";

/** Bear component
 *
 * @returns {component} My bear information
 */
function Bear({ isEditable, user }) {
  return <>{isEditable ? <MyBear user={user} /> : <UserBear user={user} />}</>;
}
export default Bear;
