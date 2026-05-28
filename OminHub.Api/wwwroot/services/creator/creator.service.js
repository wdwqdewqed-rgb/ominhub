import { Api } from '../api.js'
import { MockCreatorAnalytics } from "../../demo/profile/analytyis.mock.js";

async function fetchCreatorAnalytics(userId) {

    try {

        const data = await Api.apiFetch(
            `/api/creator/users/${userId}/analytics`
        );

        return data || MockCreatorAnalytics;

    } catch {
        return MockCreatorAnalytics;
    }
}
export const CreatorService = {
    fetchCreatorAnalytics
}