import actionTypes from './actionTypes';
import { getAllCodeService, editUserService, deleteUserService, createNewUserService, getAllUsers } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});

//////
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

//////
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROlE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

////////////////////////////////
export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
                toast.success('Create is user successfully!');
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            toast.error('Create user failed: ');
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
});

/////////
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
                toast.error('Failed to get all user!');
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            toast.error('Failed to get all user!');
            console.error(error);
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
});

/////////   
export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.success('Deleted user successfully!');
                dispatch(deleteUsersSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            toast.error('Failed to delete user!');
            console.error(error);
        }
    }
}
export const deleteUsersSuccess = () => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
});
export const deleteUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
});

/////////   
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUsersSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(editUsersFailed());
            }
        } catch (error) {
            dispatch(editUsersFailed());
            toast.error('Failed to edit user!');
            console.error(error);
        }
    }
}
export const editUsersSuccess = () => ({
    type: actionTypes.FETCH_EDIT_USER_SUCCESS,
});
export const editUsersFailed = () => ({
    type: actionTypes.FETCH_EDIT_USER_FAILED
});

