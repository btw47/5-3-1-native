import actionTypes from '../actionTypes';
import { firebaseApp, firebaseDb } from '../../../server/firebase';

//-----USER AUTH-----
export const loggedIn = () => {
  console.log('LOGGED IN');
  return {
    type: actionTypes.LOGGED_IN
  };
};

//-----FETCH USER INFO-----
export function fetchUser(thisUser) {
  return dispatch => {
    if (thisUser != null) {
      var uid = thisUser.uid;
    }

    firebaseDb.ref('users/' + uid + '/user/').on('value', snapshot => {
      const firebaseOutput = snapshot.val();

      let pushList = [];
      for (let prop in firebaseOutput) {
        pushList.push(prop);
      }

      //-----USER DESCRIPTION FETCH-----
      const descList = [];
      for (let i = 0; i < pushList.length; i++) {
        if (firebaseOutput[pushList[i]].desc) {
          descList.push(firebaseOutput[pushList[i]]);
        }
      }

      let lastDesc = descList[descList.length - 1];

      //-----GENERAL USER INFO-----
      const uploadList = [];
      for (let i = 0; i < pushList.length; i++) {
        if (firebaseOutput[pushList[i]].weight) {
          uploadList.push(firebaseOutput[pushList[i]]);
        }
      }

      let lastUpload = uploadList[uploadList.length - 1];

      if (lastDesc) {
        dispatch({
          type: actionTypes.FETCH_USER,
          userID: uid,
          fullName: lastUpload.fullName,
          weight: lastUpload.weight,
          ormBench: lastUpload.oneRepMax['benchORM'],
          ormDeadlift: lastUpload.oneRepMax['deadliftORM'],
          ormOverheadPress: lastUpload.oneRepMax['overheadPressORM'],
          ormSquat: lastUpload.oneRepMax['squatORM'],
          desc: lastDesc.desc
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_USER,
          userID: uid,
          fullName: lastUpload.fullName,
          weight: lastUpload.weight,
          ormBench: lastUpload.oneRepMax['benchORM'],
          ormDeadlift: lastUpload.oneRepMax['deadliftORM'],
          ormOverheadPress: lastUpload.oneRepMax['overheadPressORM'],
          ormSquat: lastUpload.oneRepMax['squatORM']
        });
      }
    });
  };
}

//-----Filestack-----
export const fetchProfileImage = uid => {
  return dispatch => {
    firebaseDb.ref('users/' + uid + '/images/').on('value', snapshot => {
      const firebaseOutput = snapshot.val();

      let pushList = [];
      for (let prop in firebaseOutput) {
        pushList.push(prop);
      }

      const uploadList = [];
      for (let i = 0; i < pushList.length; i++) {
        if (firebaseOutput[pushList[i]].profileImage) {
          uploadList.push(firebaseOutput[pushList[i]]);
        }
      }

      let lastUpload = uploadList[uploadList.length - 1];

      if (lastUpload === undefined) {
        dispatch({
          type: actionTypes.NO_PROFILE_IMAGE
        });
      } else {
        dispatch({
          type: actionTypes.PROFILE_IMAGE,
          payload: lastUpload.profileImage
        });
      }
    });
  };
};
