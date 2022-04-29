import MyBear from "./MyBear";
import UserBear from "./UserBear";

/** Bear component
 *
 * @param {boolean} isEditable enable edit
 * @param {object} user user data
 * @returns {component} My bear information
 */
function Bear({ isEditable, user }) {
  return <>{isEditable ? <MyBear user={user} /> : <UserBear user={user} />}</>;
}
export default Bear;
