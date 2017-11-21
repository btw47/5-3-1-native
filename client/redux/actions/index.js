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

//-----FETCH OLD STATS-----
export function fetchOldStats(thisUser, time) {
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

      const uploadList = [];
      for (let i = 0; i < pushList.length; i++) {
        if (firebaseOutput[pushList[i]].weight) {
          const date = firebaseOutput[pushList[i]].date;
          uploadList[date] = firebaseOutput[pushList[i]].oneRepMax;
          uploadList.push(firebaseOutput[pushList[i]]);
        }
      }

      let firstUpload = uploadList[0];

      dispatch({
        type: actionTypes.FETCH_OLD_STATS,
        userID: uid,
        fullName: firstUpload.fullName,
        weight: firstUpload.weight,
        date: firstUpload.date,
        ormBench: firstUpload.oneRepMax['benchORM'],
        ormDeadlift: firstUpload.oneRepMax['deadliftORM'],
        ormOverheadPress: firstUpload.oneRepMax['overheadPressORM'],
        ormSquat: firstUpload.oneRepMax['squatORM']
      });
    });
  };
}

//-----FETCH PROGRESS-----
export const fetchProgress = thisUser => {
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

      const uploadList = [];
      for (let i = 0; i < pushList.length; i++) {
        if (firebaseOutput[pushList[i]].weight) {
          // const date = firebaseOutput[pushList[i]].date;
          // uploadList[date] = firebaseOutput[pushList[i]].oneRepMax;
          uploadList.push(firebaseOutput[pushList[i]]);
        }
      }

      const progressData = uploadList.map(a => {
        const smallDate = a.date.split(' ').slice(1, 3);
        const joinDate = smallDate.join(' ');
        const fullDate = `${joinDate}, ${a.date.split(' ').slice(3, 4)}`;
        const rawDat = {};
        rawDat['name'] = fullDate;
        rawDat['Bench (ORM)'] = a.oneRepMax['benchORM'];
        rawDat['Squat (ORM)'] = a.oneRepMax['squatORM'];
        rawDat['Overhead Press (ORM)'] = a.oneRepMax['overheadPressORM'];
        rawDat['Deadlift (ORM)'] = a.oneRepMax['deadliftORM'];
        rawDat['Weight'] = a.weight;
        return rawDat;
      });

      dispatch({
        type: actionTypes.FETCH_PROGRESS,
        payload: progressData
      });
    });
  };
};

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
        if (firebaseOutput[pushList[i]].benchTemplate) {
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

//-----ORM CALCULATOR-----
export const setORM = (
  BenchWeight,
  BenchReps,
  OverheadWeight,
  OverheadReps,
  SquatWeight,
  SquatReps,
  DeadliftWeight,
  DeadliftReps
) => {
  return dispatch => {
    oneRepMax = (weight, reps) => {
      let max = (weight * reps * 0.0333 + weight) * 0.9;
      return Math.ceil(max);
    };

    const bench = this.oneRepMax(parseInt(BenchWeight), parseInt(BenchReps));

    const overhead = this.oneRepMax(
      parseInt(OverheadWeight),
      parseInt(OverheadReps)
    );

    const deadlift = this.oneRepMax(
      parseInt(DeadliftWeight),
      parseInt(DeadliftReps)
    );
    const squat = this.oneRepMax(parseInt(SquatWeight), parseInt(SquatReps));

    dispatch({
      type: actionTypes.SET_MAX,
      bench: bench,
      overhead: overhead,
      deadlift: deadlift,
      squat: squat
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
