// creator-state.service.js

import { Auth } from '../../core/auth.js';
import { Sidebar } from '../../components/sidebar.js';
import { CreatorRenderer } from '../../features/creators/creatorRenderer.js';

async function resolveCreatorAccess(main, user) {

    if (!user) {
        CreatorRenderer.renderPublicCreatorJoin(main);
        return {
            allowed: false,
            reason: 'anonymous'
        };
    }

    let verification = Auth.getStoredVerification();

    if (!verification) {
        verification = await Auth.checkAndStoreVerificationStatus();
        Sidebar.updateCreatorSection();
    }

    if (!verification || verification.state === 'none') {
        CreatorRenderer.renderInviteToBecomeCreator(main, user);

        return {
            allowed: false,
            reason: 'not_creator',
            verification
        };
    }

    if (
        verification.state === 'pending' ||
        verification.state === 'rejected'
    ) {
        CreatorRenderer.renderVerificationRequired(
            main,
            user,
            verification.raw
        );

        return {
            allowed: false,
            reason: verification.state,
            verification
        };
    }

    return {
        allowed: true,
        reason: 'approved',
        verification
    };
}

export const CreatorStateService = {
  resolveCreatorAccess
};