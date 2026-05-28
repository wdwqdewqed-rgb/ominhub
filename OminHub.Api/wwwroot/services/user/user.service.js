import { Api } from "../api.js";
import { MockProfile } from "../../demo/profile/profile.mock.js";

async function fetchUserProfile(userId) {

  try {

    const data = await Api.apiFetch(
      `/api/system/users/${userId}`
    );

    if (!data) {
      return MockProfile;
    }

    return data;

  } catch (err) {

    console.warn(
      "Using mock profile data",
      err
    );

    return MockProfile;
  }
}

export const UserService = {
  fetchUserProfile
};