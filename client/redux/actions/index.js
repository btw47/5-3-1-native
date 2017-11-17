import actionTypes from '../actionTypes';
import { firebaseApp, firebaseDb } from '../../../server/firebase';

//-----USER AUTH-----
export const loggedIn = () => {
  console.log('LOGGED IN ACTION');
  return {
    type: actionTypes.LOGGED_IN
  };
};

//-----FETCH USER INFO-----
export function fetchUser(thisUser) {
  console.log('FETCH USER ACTION');

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

//-----FETCH TODAYS WORKOUT-----
export const fetchTodaysWorkout = uid => {
  return dispatch => {
    firebaseDb.ref('users/' + uid + '/calendar/').on('value', snapshot => {
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

      const benchTemplate = lastUpload.benchTemplate;
      const deadliftTemplate = lastUpload.deadliftTemplate;
      const ohpTemplate = lastUpload.ohpTemplate;
      const squatTemplate = lastUpload.squatTemplate;

      const workoutTemplates = {
        benchTemplate,
        deadliftTemplate,
        ohpTemplate,
        squatTemplate
      };

      if (lastUpload === undefined) {
        dispatch({
          type: actionTypes.NO_TEMPLATE
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_WORKOUT,
          payload: workoutTemplates
        });
      }
    });
  };
};

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
