import firebase from "react-native-firebase";
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const messagesRef = db.collection("messages");
const projectsRef = db.collection("projects");
const usersRef = db.collection("users");
let objMessages = {};

const prepareInvitationToProject = async (
  projectUid = false,
  email = false,
  type = true // true - пригласить; false = удалить
) => {
  if (!email || !projectUid) return false;

  try {
    const userRef = await usersRef.doc(email).get();
    const { pushToken: token = false, firstName, lastName } = userRef.data();
    let name =
      !!firstName || !!lastName ? `Dear ${firstName} ${lastName}, ` : "";

    const projectRef = await projectsRef.doc(projectUid).get();
    const title = projectRef.get("Title");

    let body = `${name}${
      !!name ? " y" : "Y"
    }ou were invited in the project "${title}"`;

    if (!type)
      body = `${name}${
        !!name ? " y" : "Y"
      }ou have been removed from the project "${title}"`;

    objMessages[`${projectUid}-${email.toLowerCase()}`] = {
      title,
      body,
      token,
      email: email.toLowerCase()
    };
    return true;
  } catch (e) {
    return false;
  }
};

const sendMessages = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (!enabled) return false;

  const keys = Object.keys(objMessages);
  if (keys.length > 0)
    keys.forEach(key => {
      // console.log("sendMessages SENDobj:", key, objMessages[key]);
      messagesRef.doc(key).set(objMessages[key], { merge: true });
    });
};

const cleanInvitations = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (!enabled) return false;
  objMessages = {};
  messagesRef.get().then(docs =>
    docs.forEach(doc => {
      doc._ref.delete();
    })
  );
};

const noDoublePressRef = {};

const noDoublePress = (nameFunc, delay = 1000) => {
  if (!!noDoublePressRef.nameFunc) return;
  noDoublePressRef.nameFunc = true;
  setTimeout(() => {
    delete noDoublePressRef.nameFunc;
  }, delay);
  nameFunc();
};

export default {
  cleanInvitations,
  prepareInvitationToProject,
  sendMessages,
  noDoublePress
};
